Measure the sidebar (nav rail) width on Eterna's dashboard so it can be matched on the Ohvara dashboard (Prompt 339, item 1 — currently blocked on this one number).

**No login needed** — Brayden's browser already has an active, logged-in Eterna session open (`portal.goeterna.com/dashboard`, showing "brayden Freeman" logged in). Just switch to that tab (or open `https://portal.goeterna.com/dashboard` fresh if it's not still open — the session cookie should carry over).

**Step 1 — open dev tools and select the sidebar element.**

Right-click anywhere on the dark green left-hand nav rail (the one with "Submission Dashboard", "Effectuation Report", "Policies", etc.) and choose **Inspect**. This should highlight the sidebar `<nav>`/`<aside>`/`<div>` element in the Elements panel.

If the highlighted element looks like just an inner wrapper (text hugging one edge), click up through its parent elements in the Elements panel until the highlight box in the page covers the *entire* dark green rail from the very left edge of the browser window to where the white content area begins — that's the real sidebar container, not an inner child.

**Step 2 — read the computed width.**

With that element still selected, open the **Computed** tab (next to Styles) in dev tools and find the `width` value. Also fine: hover over the element in the Elements panel and read the width shown in the tooltip/box model diagram, or check the **Layout**/box-model diagram's width number directly.

Report back the exact pixel number (e.g. "224px" or "260px") — that's all that's needed. If Chrome's dev tools show it in a unit other than px (rare, but note if so).

**Step 3 — nothing else to do.** No settings to change, nothing to click through, no forms. Just the one number.
