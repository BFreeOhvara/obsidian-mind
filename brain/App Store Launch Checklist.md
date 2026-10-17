---
date: 2026-10-17
description: "Brayden's steps, in order, to get the Ohvara app (P775) into TestFlight, Play testing and the stores: keys, Codemagic, records, logins, privacy, review, Unlisted, 12 testers."
tags:
  - ohvara
  - app-store
  - checklist
---

# App Store Launch Checklist

Everything CC could build is built (P775): Capacitor app `com.ohvara.portal` "Ohvara" in `ohvara-dashboard` (`android/`, `ios/`, `capacitor.config.json`), over-the-air web updates, push, Delete my account, App Review sample logins, no in-app payments, `/app` link + QR, `codemagic.yaml`. These are the steps only you can do. Times are rough. **Never paste a key, password or .p8 into chat or git.** Related: [[Account Deletion]], [[Ohvara Notifications Plan]], [[LIVE_STATE]].

Where secrets go:
- **Supabase secrets**: supabase.com → project → Edge Functions → Secrets → Add.
- **Codemagic**: codemagic.io → Teams → your team → Integrations / Code signing identities / Global variables.

---

### 1. Google Play account: finish verification (in progress, days)
Account "Ohvara" is made and paid; ID is being verified. When Google asks: verify an Android device (sign in to the Play Console app on any Android phone), then the contact phone number.

### 2. Apple: register the App ID (5 min)
developer.apple.com → Certificates, IDs & Profiles → Identifiers → **+** → App IDs → App → Description `Ohvara`, Bundle ID **Explicit** `com.ohvara.portal` (if it says taken, stop and tell CC) → tick **Push Notifications** → Continue → Register.

### 3. Apple: push key (APNs) (5 min)
Same site → **Keys** → **+** → name `Ohvara push` → tick **Apple Push Notifications service (APNs)** → Continue → Register → **Download** the `.p8` (only once; keep it in your password manager). Note the **Key ID** and your **Team ID** (top right of the page).
Supabase secrets: `APNS_KEY_P8` = the whole text of the .p8 file (open it in Notepad), `APNS_KEY_ID`, `APNS_TEAM_ID`. (Bundle id defaults to `com.ohvara.portal`; production on.)

### 4. Firebase project (Android push) (10 min)
console.firebase.google.com → **Add project** `Ohvara` (Analytics off) → **Add app → Android** → package `com.ohvara.portal` → Register → **download `google-services.json`**, skip the rest.
- Codemagic → Global variables, group **`google_play`**: `GOOGLE_SERVICES_JSON` = the file's whole text, **Secret** on.
- Firebase → ⚙ Project settings → **Service accounts** → **Generate new private key** → Supabase secret `FCM_SERVICE_ACCOUNT` = that JSON's whole text.

### 5. App Store Connect: the app record (5 min)
appstoreconnect.apple.com → My Apps → **+ New App** → iOS, Name `Ohvara`, English (U.S.), Bundle ID `com.ohvara.portal`, SKU `ohvara-portal`, Full access → Create. App Information → copy the **Apple ID** number → tell CC (it goes in `codemagic.yaml` `APP_STORE_APPLE_ID`).

### 6. App Store Connect API key (for Codemagic) (5 min)
Users and Access → **Integrations** → App Store Connect API → **Team Keys** → **+** → name `Codemagic`, access **App Manager** → Generate → **Download** the .p8 (once). Note **Issuer ID** and **Key ID**.

### 7. Codemagic setup (20 min)
1. codemagic.io → sign up with GitHub → **Add application** → `BFreeOhvara/ohvara-dashboard` → it finds `codemagic.yaml`.
2. Team → Integrations → **Developer Portal** → Add key → name it exactly **`Ohvara ASC key`** → Issuer ID, Key ID, upload the step-6 .p8.
3. Code signing identities → **iOS certificates** → Generate certificate → Apple Distribution → save. **iOS provisioning profiles** → Fetch profiles → pick the **App Store** profile for `com.ohvara.portal` (after step 2).
4. Code signing identities → **Android keystores** → upload `C:\Users\freem\ohvara-keys\ohvara-upload.jks`, reference name **`ohvara_upload`**, passwords/alias from `README-upload-key.txt` in the same folder. **Back that folder up** (password manager); never commit it.
5. Global variables → group **`ohvara_web`**: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (same values as Vercel → ohvara-dashboard → Settings → Environment Variables; the anon/publishable key is public), `VITE_PUBLIC_APP_URL` = `https://portal.ohvara.com`.

### 8. First iPhone build → TestFlight (25 min, mostly waiting)
Codemagic → ohvara-dashboard → **Start new build** → workflow **iPhone → TestFlight**. When it's green, App Store Connect → TestFlight shows the build (10–30 min processing). Add yourself under Internal Testing, install TestFlight on your iPhone, open Ohvara. **This is the first time iOS is ever compiled**: if it fails, send CC the log.

### 9. Google Play: app + service account + first upload (30 min)
1. Play Console → **Create app** → `Ohvara`, App, Free → declarations → Create.
2. Google Cloud console (same Google account) → IAM → Service accounts → **Create** `codemagic-play` → Keys → Add key → JSON → download. Play Console → **Users and permissions** → Invite user → that service account's email → app `Ohvara` → **Release** permissions → Invite.
3. Codemagic → group `google_play`: `GCLOUD_SERVICE_ACCOUNT_CREDENTIALS` = the JSON's text, Secret on.
4. Run workflow **Android → Play internal testing**. Google doesn't let a tool make the very first upload: if publishing fails, download the `.aab` from the build's Artifacts → Play Console → Testing → **Internal testing** → Create release → upload → accept **Play App Signing** → Save → Roll out. Every later build uploads itself.

### 10. Turn push on (tell CC, 1 min)
Push is off in the app until it's set up (registering without Firebase would crash Android). Once steps 3–4 are done and builds 8–9 exist, tell CC: "push is ready: iOS build N, Android build M". CC sets `public/app/config.json` → `push: { ios: N, android: M }`. Phones with those builds then ask to allow alerts.

### 11. App Review logins (5 min)
Portal (desktop) → Settings → **Team tools** → **App Review logins** → **Make / reset the logins** → copy the two emails + passwords (shown once).
- **Apple**: App Store Connect → the app → App Review Information → Sign-in required → the **agent** login; put the Fulfillment login in Notes.
- **Google**: Play Console → App content → **App access** → "All or some functionality is restricted" → add both logins.
Review note (paste for both): *"Two sample accounts with made-up data: the agent login shows how an insurance agent books a cancellation call for a client; the Fulfillment login shows the rep who makes those calls. For these accounts no real calls, texts, emails or payments happen. Billing is managed on the Ohvara website; the app has no purchases. Delete my account is in More."*
These accounts only ever see sample data, enforced in the database. If a reviewer deletes one, press Make / reset again.

### 12. Screenshots (10 min)
In the vault: `media/app-store/`.
- Apple, **6.9" iPhone** slot: `iphone-6.9-1…7-*.png` (1320 × 2868). Apple scales them down for smaller phones. No iPad: the app is iPhone-only.
- Google: phone screenshots `android-phone-1…7-*.png` (1080 × 1920), app icon `play-icon-512.png`, feature graphic `play-feature-1024x500.png`.
- App Store icon (1024): built into the app (`ohvara-dashboard/assets/icon-only.png`).

### 13. Privacy (20 min)
**Privacy policy URL**: `https://ohvara.com/privacy` exists, but it doesn't mention the app yet. Add a short "The Ohvara app" section (ohvara-site repo, ask CC), e.g.: *"Our iPhone and Android app uses the same account as the website. If you allow alerts, we store your phone's notification token to send them, and remove it when you sign out or delete your account. Fulfillment staff can make calls in the app; the microphone is used only during a call you start. You can delete your account in the app (More → Delete my account) or on the website. We keep pay records and call recordings we're required to keep, without your name."*

**Apple App Privacy** (App Store Connect → App Privacy). Tracking: **No**. Data collected, all **linked to the user**, purpose **App Functionality** only:
- Contact Info: Name, Email Address, Phone Number
- User Content: Audio Data (Fulfillment call recordings), Other User Content (client details agents enter, messages)
- Identifiers: User ID
- Not collected: location, contacts, browsing, health, financial info (cards and banks are entered on Stripe's pages on the website, not in the app), diagnostics/analytics.

**Google Data safety**: Collects: Personal info (Name, Email, Phone), Messages (Other in-app messages), Audio (Voice or sound recordings), Device or other IDs (push token). Purpose: App functionality / Account management. **Not shared** (Twilio, Stripe, Resend are service providers). Encrypted in transit: Yes. Users can request deletion: Yes (in-app). No ads, no tracking.

### 14. Submit (10 min)
- Apple: pick the TestFlight build on the version page → category **Business** → age rating questionnaire (all None) → Export compliance is answered in the app (no non-exempt encryption) → **Add for Review** → Submit.
- Google: production comes after step 16. Internal/closed testing works now.

### 15. Apple "Unlisted" (after the first approval)
Unlisted = installable from the link, not searchable. After Apple approves the first version, fill **Unlisted App Distribution** request: developer.apple.com/support/unlisted-app-distribution → the app's App Store link + reason ("internal app for our agents and staff"). Until then people install through TestFlight (Internal Testing invites).

### 16. Google: 12 testers for 14 days (personal accounts must do this)
Play Console → Testing → **Closed testing** → Create track `Ohvara team` → Testers → email list of **at least 12 Gmail addresses** → each one must open the opt-in link, join and **install**, and stay in for **14 days straight**. Then Dashboard → **Apply for production**.
Plan: every agent + Fulfillment rep with a Gmail, plus you, Nate, Jordan and family Android phones to reach 12+ (iPhone users don't count). Start this the same day step 9 lands: the 14-day clock is the slowest part of the launch.

### 17. When the store links exist (tell CC, 1 min)
Send CC the App Store and Play links. CC puts them in `public/app/config.json` (`ios`, `android`). Then `https://portal.ohvara.com/app` sends iPhones and Androids to their store, More → **Get the phone app** shows the buttons, and admins can copy the link or download the QR.

---

## Good to know
- **Updates without the stores**: every website deploy also publishes the app's web update (`/ota/manifest.json`). Phones pick it up and switch on the next app restart, never mid-call. Native changes (new plugin, icon, permissions) need a new build (steps 8–9) and CC bumps `ohvara.otaMinNativeBuild` in package.json.
- **Calls in the app**: Fulfillment calls run in the app like on the website, and the screen stays on during a call. **iPhone stops the app's microphone when the phone locks or the app goes to the background, so a call can drop**; the app tells the rep when they come back. If reps need to lock their phones mid-call, the fix is native calling (CallKit), a later prompt.
- **Not checked yet**: iOS has never been compiled (step 8 is the first time); Android was not built on this PC (no Android SDK here), so the first Codemagic Android run is that check; push hasn't sent a real alert (needs steps 3, 4 and 10).
