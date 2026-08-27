# WizeWorks LLC — Landing Page Animation Specification

**Status:** Production motion direction  
**Applies to:** WizeWorks landing page  
**Primary motion principle:** **Built, not animated.**

The WizeWorks experience should feel assembled, engineered, and intentional.

Motion should reinforce:

- construction
- assembly
- progression
- material depth
- product individuality
- confidence

Motion should never exist only to make the page feel “dynamic.”

---

# 1. Motion Philosophy

The WizeWorks brand is built around a maker's mark and the statement:

> **We make things that work.**

Animation should support that idea.

The page should feel like parts are:

- placed
- aligned
- revealed
- connected
- built
- refined

The motion language should be:

- calm
- deliberate
- precise
- physical
- premium
- restrained

Avoid:

- bounce easing
- exaggerated spring effects
- floating UI
- constant looping
- decorative particles
- generic SaaS blob animation
- aggressive scroll hijacking
- excessive parallax
- auto-playing carousels
- motion without functional or narrative purpose

---

# 2. Global Motion Tokens

## Standard Duration

### Micro
`120–180ms`

Use for:

- button hover
- icon movement
- focus transitions
- small color shifts

### Standard
`240–360ms`

Use for:

- card hover
- navigation states
- image movement
- product UI response

### Reveal
`500–750ms`

Use for:

- section entrance
- large typography
- image reveals
- maker's-mark assembly

### Hero
`800–1200ms`

Only for the initial hero composition.

Do not use multi-second animations that delay interaction.

---

# 3. Easing

Preferred CSS-style easing:

```css
--ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
--ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
--ease-exit: cubic-bezier(0.4, 0, 1, 1);
```

Use spring physics only when the effect is nearly critically damped.

The interface should not visibly bounce.

---

# 4. General Scroll Reveal

Do not fade every element independently.

Each section should have **one primary reveal concept**.

Recommended base behavior:

- trigger when approximately 15–25% of section enters viewport
- opacity: `0 → 1`
- translateY: `20px → 0`
- duration: `550–700ms`
- easing: `--ease-enter`
- run once by default

Nested elements may stagger by:

`50–90ms`

Do not exceed 4–5 staggered children in a single reveal.

---

# 5. Navigation

## Initial Load

Navigation fades in independently from the hero.

Animation:

- opacity `0 → 1`
- translateY `-8px → 0`
- duration `400ms`
- delay `100ms`

Keep subtle.

## Sticky Navigation

If navigation becomes sticky:

- background transitions from transparent/warm paper to slightly opaque warm paper
- subtle `backdrop-filter` permitted
- 1px bottom divider appears
- no dramatic shrinking header

Transition duration:

`200–250ms`

## Navigation Links

Hover:

- text color shift
- optional 1px underline growing left-to-right
- duration `160ms`

Avoid animated pills around normal navigation items.

## Primary Header CTA

Hover:

- translateY `-1px`
- subtle contrast shift
- arrow translates `2–3px` right

Active:

- translateY `0`

---

# 6. Hero

The hero is the most important animation moment.

It should happen **once**.

## 6.1 Hero Headline

Text:

> We make  
> things that  
> work.

Do not animate individual letters.

Recommended sequence:

### Line 1
opacity `0 → 1`  
translateY `22px → 0`

### Line 2
same, delayed `80ms`

### Line 3
same, delayed `160ms`

Duration:

`650–750ms`

The warm taupe **work.** may receive a very subtle color fade after the text settles.

Do not use typing effects.

---

# 7. Hero Maker's Mark

This should be the signature motion of the site.

## Concept

The three visible pieces begin slightly separated and settle into the approved maker's-mark geometry.

The approved logo geometry must **never change**.

Only the position of the complete canonical pieces may animate.

## Sequence

Top component:

- begin `20–28px` above final position
- opacity `0`
- move into exact canonical location

Lower-left component:

- begin `18–24px` left/down
- move into exact canonical location

Lower-right warm-taupe component:

- begin `18–24px` right/down
- move into exact canonical location

Timing:

- all begin within approximately `120ms`
- settle together
- duration `850–1050ms`
- use `--ease-enter`

Optional:

A very small physical shadow can resolve as pieces arrive.

Do **not**:

- rotate the components
- morph them
- change their shape
- animate the internal notch
- distort the center
- make them bounce

The result should feel like three precision-cut objects being placed onto a surface.

---

# 8. Hero Background Lines

If topographic/drafting lines are used:

- remain almost static
- optional `opacity 0 → 1`
- optional extremely subtle `scale 1.01 → 1`

Duration:

`1200–1600ms`

Do not continuously move the pattern.

The lines are atmosphere, not an animation feature.

---

# 9. Hero CTAs

Enter after headline and mark begin settling.

Delay:

approximately `350–450ms`

Primary CTA hover:

- translateY `-2px`
- shadow expands subtly
- arrow translates `3px`

Secondary CTA:

- underline or arrow movement only
- avoid turning it into a second primary button

---

# 10. "Made by WizeWorks" Immediate Proof

If the portfolio brand strip is directly under the hero, it should feel like the hero's proof.

## Reveal

Label appears first.

Product marks then enter in a short sequence:

- opacity `0 → 1`
- translateY `8px → 0`
- stagger `55ms`

Do not grayscale logos and recolor them on hover unless the original brand system calls for it.

The product identities should feel alive immediately.

---

# 11. Product Portfolio Section

This section should be more expressive than a static five-card grid.

## Section Header

Simple reveal:

- opacity
- 16px upward movement

## Product Stories / Cards

When each card first enters:

- opacity `0 → 1`
- translateY `24px → 0`
- scale `0.985 → 1`
- duration `550ms`

Stagger by row or visual grouping, not every tiny component.

---

# 12. Product Color Introduction

WizeWorks stays neutral.

Each product may introduce its own color as the product enters focus.

Recommended behavior:

At approximately 30–40% visibility:

- subtle colored background wash fades in
- product logo reaches full color
- accent border/label fades in

Duration:

`350–500ms`

This should communicate:

> WizeWorks is the canvas. The product brings the color.

Avoid large animated gradients.

---

# 13. Product Screenshot Motion

Use real screenshots where possible.

On hover:

- screenshot translateY `-4px`
- optional scale `1.01`
- internal crop can shift `2–4px`
- duration `280–360ms`

For large feature cards:

- image can have a very small scroll-linked vertical offset
- maximum travel `12–18px`

Do not exceed this.

The page should never feel like the screenshots are floating.

---

# 14. "Different Products. Same Obsession." Band

This dark band should create a controlled pause in the page.

## Reveal

Background itself should not animate dramatically.

Instead:

1. maker's mark appears
2. first phrase fades/slides in
3. emphasized phrase appears approximately `100ms` later

Suggested motion:

- opacity
- translateY `14px → 0`

The taupe emphasis can fade from muted neutral to final taupe.

No text wipe is necessary.

---

# 15. Process Section

This section should contain one of the page's strongest scroll narratives.

Sequence:

1. **Strategy**
2. **Design**
3. **Systems**
4. **Launch**

## Desktop

Use a connecting construction line.

As the section enters:

- line begins at step 1
- progresses toward step 4 as the user scrolls through the section

The line can use SVG `stroke-dashoffset`.

Each step activates as the progress line reaches it.

Active step:

- icon gains full opacity
- circle or marker moves from warm gray to charcoal/taupe
- title rises `6px`
- copy fades to full contrast

Inactive future steps:

- remain visible but muted

This is preferred over having all four items simply fade in.

## Mobile

Do not force horizontal scrolling.

Use a vertical line.

The line progresses downward as each step enters the center portion of the viewport.

---

# 16. Process Icons

Do not continuously animate.

When activated:

- scale `0.94 → 1`
- opacity `0.65 → 1`
- duration `240ms`

Avoid rotations or bouncing.

---

# 17. Selected Work / Results

Section headline:

> Real problems.  
> Real results.

This section should feel grounded.

## Case Study Cards

Reveal individually as they enter.

Image:

- clip reveal or opacity
- avoid dramatic zoom

Content:

- 80ms after image

Metric:

- appear last

If metrics are used, they should be real.

---

# 18. Metric Animation

If a true numeric result is presented, a count-up animation may be used.

Rules:

- duration `700–1100ms`
- trigger once
- preserve final value immediately for screen readers
- animate visual text only
- do not use rolling odometer effects

Example:

`0 → 38%`

Count-up should be subtle and secondary to the story.

Do not animate fabricated or vanity metrics.

---

# 19. Case Study Hover

Desktop hover:

- card translateY `-3px`
- image scale `1.015`
- CTA arrow translateX `3px`

No giant shadows.

Duration:

`260–320ms`

---

# 20. Social Proof / Testimonials

Do **not** create an autoplay carousel.

If there are 3 testimonials:

show all three on desktop.

On mobile:

horizontal snap scrolling is acceptable.

## Reveal

Cards enter together or with a short `70ms` stagger.

## Manual Carousel Controls

If more testimonials exist:

- user-controlled only
- transitions `300–400ms`
- opacity + translateX
- pause/focus behavior is not necessary because no autoplay exists

---

# 21. Testimonial Card Hover

Very minimal:

- border contrast increases
- translateY `-2px`

No glow.

No scale greater than `1.005`.

---

# 22. WizeWorks Story Section

This is a slower, more human section.

Avoid complex animation.

Recommended:

Image:

- clip-path or opacity reveal

Text:

- opacity
- translateY `18px`

Mission card:

- enter approximately `120ms` after main content

The pacing should feel calmer than the product/process sections.

---

# 23. Maker's Mark Story

If this page explains:

> One shape. Repeated. Three visible. One implied.

Use a simple construction animation.

Possible sequence:

1. Show one canonical component
2. Duplicate into three positions
3. Final maker's mark appears
4. Center remains negative space

Important:

The shapes are not morphed.

The animation reuses the exact canonical geometry.

Duration:

`1000–1400ms`

Run once when the section enters view.

This should be used only if the logo story is explicitly shown on the homepage.

---

# 24. "Who We Build For" Section

If this section uses human or real-world imagery:

Avoid animating every audience category.

Use:

- one large image
- plain text labels
- slow section reveal

Optional hover over audience label:

- corresponding image changes
- crossfade `300ms`

Example:

Founders / Farmers / Creators / Operators / Builders

Do not turn this into a rotating carousel.

---

# 25. Insights Section

Article cards:

- no dramatic entrance
- simple staggered reveal

Hover:

- image scale `1.015`
- title underline extends
- arrow moves `2–3px`

The content should remain the focus.

---

# 26. Final CTA Band

Suggested statement:

> Let's build something worth using.

This should feel like the page arriving at a conclusion.

## Reveal

Background already exists.

Maker's mark:

- subtle fade/translate

Headline:

- fade upward

CTA:

- delayed `120ms`

No dramatic animation.

## CTA Hover

Primary button:

- translateY `-2px`
- arrow `+3px`
- subtle surface lightening

The final CTA should feel confident, not aggressive.

---

# 27. Footer

Footer should not have a theatrical entrance.

Optional:

- opacity `0 → 1`
- duration `350ms`

Interactive links use the global navigation hover behavior.

---

# 28. Cursor Behavior

Use the standard platform cursor.

Do not add a custom circle cursor.

Custom cursors often reduce usability and make premium sites feel trend-driven.

Optional:

For large case-study images only, cursor may become:

> View

But only if implemented accessibly and without replacing standard pointer semantics.

---

# 29. Button Motion

All primary buttons should share one system.

Default:

- no heavy shadow

Hover:

- `transform: translateY(-2px)`
- subtle surface change
- arrow `translateX(3px)`

Active:

- `transform: translateY(0)`

Focus:

- visible focus ring
- do not rely on animation

---

# 30. Link Motion

Inline text links:

- arrow movement `2–3px`
- optional underline extension

Duration:

`140–180ms`

Avoid sweeping background animations.

---

# 31. Image Loading

Below-fold images may fade in after loaded:

- opacity `0 → 1`
- duration `250–350ms`

Do not blur-up excessively.

Do not delay image visibility for animation if the image is already loaded and in viewport.

---

# 32. Scroll Behavior

Use native scrolling.

Do not:

- hijack scroll velocity
- snap the entire page
- slow the page artificially
- create horizontal-scroll sections for core content on desktop
- lock the user into animation sequences

Scroll-linked motion should enhance the page while maintaining normal browsing behavior.

---

# 33. Reduced Motion

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

When enabled:

- disable mark assembly movement
- disable scroll-linked progress interpolation
- disable parallax
- remove count-up animation
- remove large translations
- keep necessary opacity transitions under approximately `150ms`
- show final states immediately where possible

The page must retain complete meaning without animation.

---

# 34. Mobile Motion

Mobile animations should be lighter than desktop.

Reduce:

- travel distance by roughly 30–50%
- stagger duration
- parallax
- large transforms

Recommended mobile reveal:

`translateY(12px → 0)`

rather than:

`24px → 0`

Avoid animations that consume significant battery or GPU resources.

---

# 35. Performance Constraints

Animation must not damage page performance.

Preferred properties:

- `transform`
- `opacity`

Avoid animating:

- width
- height
- top
- left
- box-shadow continuously
- filter continuously
- large blur values

Use `will-change` sparingly.

Remove it after animation when practical.

---

# 36. JavaScript Guidance

Use CSS for:

- hover
- focus
- buttons
- navigation
- simple entrances

Use Intersection Observer for:

- section reveals
- one-time triggers
- metrics

Use a lightweight motion library only if the implementation benefits materially.

Do not ship a large animation framework solely to fade sections into view.

For scroll-linked process animation, native browser APIs or a lightweight implementation are preferred.

---

# 37. Animation Priority

Not every proposed animation needs to ship in V1.

## Tier 1 — Essential

1. Hero maker's-mark assembly
2. Hero typography entrance
3. Basic section reveals
4. Product-card interactions
5. Process progress animation
6. Button/link micro-interactions
7. Reduced-motion implementation

## Tier 2 — Strong Enhancements

8. Product-color introduction
9. Subtle screenshot depth
10. Real metric count-up
11. Maker's-mark story animation

## Tier 3 — Optional

12. Very subtle drafting-line reveal
13. Audience image crossfade
14. Enhanced case-study transitions

Ship Tier 1 first.

---

# 38. Section Motion Map

| Section | Primary Motion | Intensity |
|---|---|---|
| Navigation | Fade / slight drop | Low |
| Hero headline | Staggered line reveal | Medium |
| Hero maker's mark | Precision assembly | High / Signature |
| Hero background | Static / gentle reveal | Very low |
| Made by WizeWorks | Product-brand stagger | Low |
| Product portfolio | Card reveal + product color | Medium |
| Philosophy band | Text reveal | Low |
| Process | Scroll progress construction line | High / Signature |
| Selected work | Image/card reveal | Medium |
| Metrics | Count-up if truthful | Low |
| Testimonials | Simple card reveal | Low |
| WizeWorks story | Slow reveal | Low |
| Audience | Optional crossfade | Low |
| Insights | Card/link interaction | Low |
| Final CTA | Calm reveal | Low |
| Footer | None / soft fade | Very low |

---

# 39. Animation Budget

A visitor should remember approximately **two motion moments**:

1. The WizeWorks maker's mark assembling in the hero.
2. The process visibly progressing as the page is scrolled.

Everything else should support those moments.

If every section tries to be memorable, none of them will be.

---

# 40. Final Motion Direction

WizeWorks motion should communicate:

> **This was made carefully.**

Not:

> Look how much animation we added.

The maker's mark should feel physically assembled.

The products should introduce their own personality.

The process should visibly progress.

The rest of the page should move only enough to create polish, hierarchy, and feedback.

The final result should feel precise, tactile, and purposeful.

> **Built, not animated.**
