Animated brand splash for the Ohvara Portal mobile app (installed home-screen web app) — plays once on cold launch, standalone moment, not tied to any specific screen after it.

**Attach `new ohvara pfp.png` (in this same folder) as a reference image and match its shape exactly.** Feedback on the first attempt: the wing geometry was a rough hand-traced approximation and it showed — this needs to trace the real logo precisely, not reinterpret it. Two overlapping angular wing shapes forming a bird/dart-in-flight mark, swept along a bottom-left-to-top-right diagonal.

**Background:** solid navy, darker than the logo's own background color — go a shade or two darker than `#0B1E42`, closer to near-black navy.

**Animation concept (this is the important part — replaces any prior direction):**

1. **Diagonal fill-in, like a loading bar shaped as the bird.** Instead of fading/scaling in, the bird's color should fill in progressively from bottom to top — but along the diagonal axis the logo itself sweeps on (bottom-left to top-right), not a straight vertical wipe. Picture a liquid or progress-bar fill following that same angle, revealing the two wing colors (white, teal) as it climbs.
2. **A drip at the top when the fill completes.** Once the color fill reaches the top of the mark, add a small drip/droplet detail right at that point — like a bit of color overflowed and is dripping, a small liquid touch that sells the "just finished filling" moment.
3. **One flap — corrected mechanic (this replaces any earlier "wings rotate apart" description).** This is a fold/compression, not a symmetric two-wing flap:
   - **Teal folds onto itself.** Teal's own top spike is a rigid segment that hinges at the joint where it narrows into teal's lower body, and rotates down, laying over teal's own body. This is what creates a new jagged, multi-point silhouette at the top — it's one shape folding onto itself, not a separate piece appearing.
   - **White swings back and tucks away.** White hinges at its touch point with teal and rotates down/back, disappearing almost entirely behind teal. Only a small wedge of white should remain visible, peeking out from behind teal's right edge — reference the `ohvara-logo-flap-comparison.svg` file in this folder for the exact before/after silhouettes.
   - **Net read:** the whole mark's envelope gets shorter and more gathered — like a wing snapping shut against the body — not two panels rotating apart. Single flap down, not a loop.
4. **Exit — open to whatever looks best.** After the flap, the mark can fly off, fade out, or settle — not strongly specified, use judgment for what reads as the most polished finish. This part is the one place there's real creative freedom.

**Overall bar: this needs to look genuinely polished** — premium/high-production-value, not a rough functional prototype. That's the main gap from the first attempt.

**Colors (from the real logo, PNG attached):**
- Background: darker navy, roughly `#081530`–`#0A1838` range (final call is a judgment call, should read as clearly darker than the logo's own navy)
- Wing 1 (back): white `#FFFFFF`
- Wing 2 (front): teal `#14C9A3`

**Format needed:** whatever's easiest to hand to a developer — Lottie JSON, an exported video/GIF, or clean SVG+CSS are all fine, as long as the motion values (timing, easing, the fill/drip mechanism specifically) are re-implementable in code, since this becomes a React component (`SplashScreen.jsx`) afterward.

**The old prototype file in this folder (`login-splash-bird-animation-prototype.html`) no longer reflects the current direction — ignore it, this brief supersedes it.**
