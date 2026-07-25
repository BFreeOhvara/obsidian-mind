Move the Ohvara dashboard's domain from `app.ohvara.com` to `portal.ohvara.com` — same pattern as the original `app.ohvara.com` cutover (see `claude-chrome-connect-app-subdomain.md` for reference), plus one extra step this time: updating Supabase's auth redirect allowlist, since real login/invite flows depend on it now in a way they didn't at initial setup.

**Step 1 — Vercel: add the new domain to the project.**

Navigate to: https://vercel.com/ohvara/ohvara-portal/settings/domains

(Note: the Vercel project is named `ohvara-portal`, not `ohvara-dashboard` — confirmed via the Vercel API on 2026-07-25; `app.ohvara.com` and all recent deployments live under that project slug. If this link 404s, go to the Vercel dashboard and find the project actually holding `app.ohvara.com` in its Domains tab.)

Add domain: `portal.ohvara.com`

Vercel will respond with the exact DNS record it needs (a CNAME, likely pointing `portal` at something like `cname.vercel-dns.com` — but use whatever Vercel actually displays on this screen, it's domain-specific and won't match `app.ohvara.com`'s existing record). Copy the record's type, host, and value exactly as shown.

**Step 2 — GoDaddy: add that DNS record.**

Navigate to GoDaddy's DNS management for the `ohvara.com` domain (My Products → ohvara.com → DNS).

Add a new DNS record using exactly what Vercel showed in Step 1:
- Type: (as shown, likely CNAME)
- Name/Host: `portal`
- Value/Points to: (as shown)
- TTL: default is fine

Save it. Do **not** remove or edit the existing `app` record yet — leave `app.ohvara.com` resolving normally through the rest of this process.

**Step 3 — Supabase: add the new domain to the Auth redirect allowlist BEFORE cutting over.**

Navigate to: https://supabase.com/dashboard/project/jjextitmbptoaolacocs/auth/url-configuration

Under **Redirect URLs**, add `https://portal.ohvara.com/**` (or whatever wildcard pattern matches the existing `app.ohvara.com` entry's format — match its exact pattern style, just swap the subdomain). **Do not remove the existing `app.ohvara.com` entry** — leave both in the list during the transition.

If there's a separate **Site URL** field currently set to `https://app.ohvara.com`, leave it as-is for now (change it only after Step 5 confirms everything works on the new domain — changing it too early can affect email template links before the new domain is verified live).

This step is the one most likely to get skipped and quietly break something — magic links, password resets, and the invite-link flow (`claim-invite`) all depend on the redirect URL being allowlisted. Do this before Step 4.

**Step 4 — Vercel: set the new domain as primary, keep the old one as a redirect.**

Back on the Vercel domains page from Step 1, once `portal.ohvara.com` shows verified: set it as the **primary/production** domain for the project. Vercel typically offers to automatically redirect the other attached domains (`app.ohvara.com`) to the new primary — leave that redirect **on** rather than removing `app.ohvara.com` from the project entirely, so existing bookmarks/links still work.

**Step 5 — verify for real before calling this done.**

- Open `https://portal.ohvara.com` in a fresh/incognito tab and confirm the dashboard loads and login works (use a real account, e.g. `nate44` or `brayden11`).
- Open `https://app.ohvara.com` and confirm it redirects to `portal.ohvara.com` rather than 404ing or showing a stale page.
- If possible, generate one real invite link from the Hierarchy page while logged in on the new domain and confirm the link itself points at `portal.ohvara.com`, not the old domain.

Report back: whether `portal.ohvara.com` shows verified in Vercel, whether `app.ohvara.com` correctly redirects, whether login worked, and whether the Supabase redirect URL entry was added successfully (screenshot or plain confirmation of what the Redirect URLs list shows afterward is ideal).
