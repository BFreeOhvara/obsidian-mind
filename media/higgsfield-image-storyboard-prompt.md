Image generation prompt for Higgsfield's Image tool — builds a storyboard of the Ohvara bird animation's key poses, the same way the earlier ChatGPT reference image did. Use this to lock down each stage as a still first, then use the resulting frames as references/keyframes for the video generation instead of relying on text alone.

**Attach the existing reference image (the ChatGPT-generated bird, 00:15/00:18 crops or the original) alongside this prompt.** It establishes the exact look/style already approved — this prompt just breaks that same look into the specific poses that image never showed on its own (glow stage, flap-down, the settling transition).

**Note on this version:** the previous version used a thin traced line following the wing's outline as a separate stage — that rendered as an unwanted hollow wireframe and also caused the two wing colors to swap positions. This version drops the outline-trace idea entirely. The reveal is now just two simple stages: a soft glow appears around the bird's exterior, then the bird fills in with solid color. No traced lines, no wireframe stage, anywhere.

---

**Prompt:**

A seven-panel vertical storyboard, stacked top to bottom, each panel the same size and same solid deep near-black indigo background, exact color `#01011C`, with a small stage label in the top-left corner of each panel.

Same bird logo mark in the same fixed position and scale in every panel where it appears — a two-shape angular bird/dart mark made of exactly two solid shapes. **Identify the two shapes by position, not just by color, in every panel: the upper-right wing shape is teal, the lower-left wing shape is white. The teal (upper-right) shape is always layered in front of/on top of the white (lower-left) shape — this exact relationship must hold in every single panel without exception, including the earliest, faintest ones. It must never default to white being in front just because the glow is dim, and the two colors must never trade positions.** No lines, beams, streaks, rays, or traced outlines anywhere in any panel — the only lighting effect at any point is a soft, diffuse, even glow, never a moving or traced line.

**Panel 1, labeled "Empty":** the solid `#01011C` background only, nothing else visible.

**Panel 2, labeled "Glow":** nothing filled in yet — but a soft, diffuse halo of light glows evenly around the entire outer edge of the bird's silhouette all at once, like the whole shape is gently backlit from behind. This is not a line tracing progressively along the edge — the whole exterior glows at once, uniformly, faint and soft. The interior of the bird is still dark/empty, no color fill yet. Teal upper-right, white lower-left, teal in front, per the global rule.

**Panel 3, labeled "Filling":** the halo from panel 2 continues glowing around the exterior, and now solid color has begun filling in from the bottom of the bird upward — the lower portion of the bird is filled with solid color (teal upper-right shape in front, white lower-left shape behind), while the upper portion is still unfilled/dark. No traced line anywhere — just a soft edge glow plus a rising color fill.

**Panel 4, labeled "Full color":** the entire bird is now fully filled with solid color from bottom to top, both shapes completely colored in, teal upper-right shape layered in front of the white lower-left shape, with a soft, gentle glow at the edges — restrained, not dramatic.

**Panel 5, labeled "Flap down":** the same bird, same position and scale, but now clearly and visibly in a downward flap pose — both wing shapes swept down and back, distinctly different from the resting pose in panel 4, not a subtle variation. Still fully glowing and colored, teal upper-right shape layered in front of the white lower-left shape throughout.

**Panel 6, labeled "Settling":** the bird mid-transformation, wings back in their resting position (matching panel 4's pose) — glow and color softening, simplifying from the softly-lit rendered form toward a flat, simple vector shape. Teal shape still in front.

**Panel 7, labeled "Final mark":** the bird fully resolved into a small, clean, flat two-dimensional vector mark — solid white and teal shapes only, teal upper-right shape still layered in front, no glow, no texture — with the wordmark "OHVARA" in clean, wide-letter-spaced white sans-serif caps beneath it.

Consistent art style across all seven panels — same rendering approach, same lighting logic, same exact bird geometry and scale — this is one continuous sequence, not seven unrelated images.
