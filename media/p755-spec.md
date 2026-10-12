## Prompt 755 — A simple public website for Ohvara at ohvara.com (home, privacy, terms and text messaging), so Twilio can verify the business

> **✅ ASKED FOR by Brayden 2026-10-12 (Falcon session):** "if we need that website page, then absolutely make one. Or queue CC to just make a simple one." **Run on Sonnet 5.5** (a small static site; no migration, no function, nothing touches the portal). **Run before anything else, it blocks Twilio.**

**Why.** Twilio rejected Ohvara's compliance profile (error 18601: the business name can't be matched to the website). `ohvara.com` today shows a Wix "This domain isn't connected to a site" page (the root A record at GoDaddy, `185.230.63.107`, is a leftover Wix address) and `portal.ohvara.com` is a login wall. Twilio needs a **live, public https page that shows the business name "Ohvara"** and ties it to its owner. The same site's **Privacy and Terms pages with a text-messaging section** are what Twilio asks for later when Ohvara registers for texting (P696). Nothing else depends on this site.

### 1. Where it lives (separate from the portal)

- A **new tiny site and its own Vercel project**, `ohvara-site` (team `ohvara`), the same way `restorix-marketing` is wired (look at how that one is built and hosted and copy the pattern: its repo, framework, Vercel settings). Plain static HTML + CSS is fine; no login, no Supabase, no analytics, no cookies. **Do not put it in `ohvara-dashboard` and don't touch `ohvara-portal`** (its domain `portal.ohvara.com` stays as it is).
- If you can't create the repo or the Vercel project from here (permissions), stop and say exactly what Brayden has to click.

### 2. Pages (every page: title "Ohvara", header with the Ohvara logo + name, footer with the owner line and the three links)

- **`/` Home.** Navy hero (the look of the branded invite email: navy, logo, teal button), "Ohvara", one plain sentence on what it is, a **Contact** button (mailto the contact address). Then three short blocks: **What we do** (supports independent insurance agents when a client switches policies: scheduling the call, and helping cancel the old policy with the previous carrier), **Who it is for** (independent insurance agents and the clients they serve), **Contact** (email only). Keep it short and honest; **no claims about being an insurer, a licensed agency, savings, rates or results.**
- **`/privacy`.** Plain-language privacy policy: what Ohvara collects (name, phone number, email, the policy details a client or agent gives it, call and message records), why (to schedule and carry out the cancellation call and keep clients informed), who sees it (the client's agent, Ohvara's staff and service providers that deliver calls, texts and email, not sold), how to ask for a copy or deletion (the contact email), and **an SMS paragraph: "No mobile information will be shared with third parties or affiliates for marketing or promotional purposes."**
- **`/terms`.** Short terms of use, including the **Text messaging section below**.
- **Text messaging section** (on `/terms` and linked from the footer as **"Text messaging"** → `/terms#text-messaging`): who sends the texts (Ohvara); what they are (messages about a policy-cancellation call the client asked for: confirmations, reminders and "we couldn't reach you, tap to reschedule" follow-ups; and invitations to agents who use Ohvara); **how a person agrees** (a client agrees when they ask their agent to switch their policy and give their number for that call; an agent agrees when they ask for an invite); frequency varies with the call; **"Message and data rates may apply."**; **reply STOP to opt out, HELP for help**; consent to texting is not a condition of any purchase; contact email.
- **Footer on every page:** "© 2026 Ohvara · operated by Brayden A. Freeman" + the contact email + links Privacy · Terms · Text messaging. **No street address and no personal phone number anywhere** (the IRS address on file looks like Brayden's home; Brayden can add one later). City and state only is fine ("Texas").
- Plain, calm, mobile-friendly, light mode only, accessible contrast, real `<title>` / meta description / favicon (use the Ohvara logo asset already in the vault: `media/new ohvara pfp.png`, or the portal's own logo file). No tracking scripts, no cookie banner needed.
- **Contact email: `design@ohvara.com`** (a real Zoho Mail mailbox Brayden already has on this domain; use this exact address everywhere, one place in the code so it is easy to change later). **Don't touch the domain's MX/SPF/DKIM records**: they point at Zoho.

### 3. Copy rules

- **All text is a DRAFT for Brayden to read before DNS is switched.** It is plain-language, **not legal advice**; say so in the ship note and list every factual claim the pages make (what Ohvara collects, who sees it, "not sold", how consent is given) so Brayden confirms each is true for his business.
- Keep the owner line, business name and spelling exactly: **Ohvara** / **Brayden A. Freeman**.

### 4. Deploy in two steps (don't switch the domain yourself)

1. Deploy to the Vercel preview/production URL of `ohvara-site` (e.g. `ohvara-site.vercel.app`), check every page loads over https and the footer links work, and put that URL in the ship note. **Stop there.** Brayden reads it first.
2. After Brayden says it's good: add `ohvara.com` and `www.ohvara.com` to the `ohvara-site` Vercel project and give Brayden the exact GoDaddy DNS changes (he makes them): **root `A` record `@` → `76.76.21.21`** (replacing `185.230.63.107`) and **`www` CNAME → `cname.vercel-dns.com`**. **Don't touch any other DNS record** (portal / app subdomains, MX email records, TXT, DKIM; Resend and email depend on them). Afterwards confirm `https://ohvara.com` shows the new home page with a valid certificate and `https://portal.ohvara.com` still opens the portal.

### 5. Verify and log

- Each page loads at 1440 and 390 with no horizontal scroll, no console errors, no broken links, contact link opens a mail draft, `/terms#text-messaging` scrolls to its section; `curl -I` shows https 200 for each page. No `ohvara-dashboard` file changed.
- Ship note in [[Memories]] (15 lines): the URL, what's on each page, the list of factual claims for Brayden, and the DNS steps. Brayden checks: (1) read the three pages and say what's wrong; (2) after the DNS change `ohvara.com` shows the site and the portal still works; (3) then fix the Twilio form (website `https://ohvara.com`) and resubmit.

**P755: Sonnet 5.5**
