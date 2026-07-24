Remove the old `ohvara-dashboard.vercel.app` domain alias from the Vercel project now that `app.ohvara.com` is the real address.

Navigate to: https://vercel.com/ohvara/ohvara-portal/settings/domains

(Project is named `ohvara-portal` now, not `ohvara-dashboard` — same underlying project, just renamed.)

Find `ohvara-dashboard.vercel.app` in the domains list and remove it.

**Do not remove any of these — they need to stay:**
- `app.ohvara.com` (the real domain)
- `ohvara-portal-ohvara.vercel.app` (new auto-generated alias)
- `ohvara-portal-git-master-ohvara.vercel.app` (branch alias, used by Vercel's own deploy tooling)

**Why:** Brayden confirmed nobody has the old `ohvara-dashboard.vercel.app` URL bookmarked or installed as a home-screen app in any way that matters — `app.ohvara.com` is the one true address going forward, no reason to keep the old alias around.

Report back: confirmation it's removed, and that the other 3 domains are still listed.
