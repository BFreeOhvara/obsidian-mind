Connect `app.ohvara.com` to the Ohvara setter portal (Vercel project `ohvara-dashboard`), so it stops showing the `.vercel.app` URL.

**Step 1 — Vercel: add the domain to the project.**

Navigate to: https://vercel.com/ohvara/ohvara-dashboard/settings/domains

Add domain: `app.ohvara.com`

Vercel will respond with the exact DNS record it needs (usually a CNAME record pointing `app` to something like `cname.vercel-dns.com`, but use whatever Vercel actually displays on this screen — it can vary). Copy that record's type, host, and value exactly as shown.

**Step 2 — GoDaddy: add that DNS record.**

Navigate to GoDaddy's DNS management for the `ohvara.com` domain (My Products → ohvara.com → DNS, or similar — GoDaddy's nav changes periodically).

Add a new DNS record using exactly what Vercel showed in Step 1:
- Type: (as shown, likely CNAME)
- Name/Host: `app`
- Value/Points to: (as shown, likely `cname.vercel-dns.com`)
- TTL: default is fine

Save it.

**Step 3 — verify.**

Go back to the Vercel domains page from Step 1 and check that `app.ohvara.com` shows as verified/active (may take a few minutes to propagate — if it's still pending, that's normal, just note it rather than treating it as an error).

**Context, not required reading to do the task:** the root domain `ohvara.com` is being kept free for a future marketing site — this subdomain is specifically for the setter/rep portal (currently only reachable at `ohvara-dashboard.vercel.app`). No code changes needed on the dashboard side — Vercel serves the existing deployment under the new domain automatically once DNS resolves.

Report back: whether the domain shows verified in Vercel, and if not, what status/error it's showing.
