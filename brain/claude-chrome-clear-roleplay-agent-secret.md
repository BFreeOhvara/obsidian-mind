Clear a stale Supabase Edge Function secret so the AI Roleplay trainer rebuilds its Retell agent from the current prompt.

Navigate to: https://supabase.com/dashboard/project/jjextitmbptoaolacocs/settings/functions

(If that URL doesn't land directly on the right page: Project → Settings → Edge Functions → Secrets.)

Find the secret named `RETELL_ROLEPLAY_AGENT_ID` and delete it.

**Why:** `create-roleplay-call` (the edge function behind Ohvara Portal's Training Center → AI Roleplay) caches a Retell agent ID in this secret so it doesn't rebuild the agent on every call. The prompt that agent was built from is now stale — Prompts 309/315/316/317/318/319 all shipped changes to the roleplay persona and the underlying discovery script it's supposed to mirror, but the live cached agent still reflects an old version. Deleting this secret makes the function's `if (!agentId)` branch fire on the next practice call, which rebuilds the agent fresh from the current prompt.

Expected result: the secret is gone from the list, no errors.

**One more step after this, not doable in Chrome:** someone needs to actually run one real Training Center → AI Roleplay practice call (Ohvara Portal, logged in as a setter) — that live call is what triggers the rebuild, and it's a real voice conversation with the Retell AI agent, so it needs a live microphone. Once that call happens, CC can pull the new `agent_id` from `create-roleplay-call`'s function logs and report it back so it can be saved to this same secret going forward (prevents every future practice call from rebuilding a fresh billed agent).
