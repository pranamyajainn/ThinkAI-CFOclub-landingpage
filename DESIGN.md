---
name: Executive Alpha
colors:
  surface: '#fcf8ff'
  surface-dim: '#dad7f3'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f2ff'
  surface-container: '#efecff'
  surface-container-high: '#e8e5ff'
  surface-container-highest: '#e2e0fc'
  on-surface: '#1a1a2e'
  on-surface-variant: '#454650'
  inverse-surface: '#2f2e43'
  inverse-on-surface: '#f2efff'
  outline: '#767681'
  outline-variant: '#c6c5d2'
  surface-tint: '#4b5a9c'
  primary: '#001356'
  on-primary: '#ffffff'
  primary-container: '#1b2b6b'
  on-primary-container: '#8695db'
  inverse-primary: '#b8c3ff'
  secondary: '#9c4500'
  on-secondary: '#ffffff'
  secondary-container: '#fc853a'
  on-secondary-container: '#652a00'
  tertiary: '#000d61'
  on-tertiary: '#ffffff'
  tertiary-container: '#001a99'
  on-tertiary-container: '#8090ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c3ff'
  on-primary-fixed: '#001355'
  on-primary-fixed-variant: '#334283'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb68e'
  on-secondary-fixed: '#331200'
  on-secondary-fixed-variant: '#773300'
  tertiary-fixed: '#dfe0ff'
  tertiary-fixed-dim: '#bcc3ff'
  on-tertiary-fixed: '#000d60'
  on-tertiary-fixed-variant: '#2537ae'
  background: '#fcf8ff'
  on-background: '#1a1a2e'
  surface-variant: '#e2e0fc'
  surface-subtle: '#F0F2FA'
  surface-pure: '#FFFFFF'
  text-muted: '#5C5C70'
typography:
  display-lg:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Outfit
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  section-padding: 80px
---

## Brand & Style

This design system is engineered for a high-level finance membership, targeting CFOs and senior finance leaders. The brand personality is **authoritative, exclusive, and intellectually rigorous**, yet it avoids the "stiff" cliches of legacy banking. 

The aesthetic follows a **Modern Corporate** movement: a blend of high-end B2B SaaS efficiency with the gravitas of a private members' club. It prioritizes clarity and information density without sacrificing visual breathing room. The interface feels established and reliable, utilizing structured layouts, deliberate white space, and a premium editorial touch to signal that the content within is of the highest value.

## Colors

The palette is anchored by a deep Navy Blue, representing stability and depth. The Burnt Orange serves as a high-intent accent, reserved strictly for primary actions and key data highlights to maintain its impact.

- **Primary (Deep Navy):** Used for navigation, headers, and core brand elements.
- **Secondary (Burnt Orange):** The "Call to Action" color. It provides a warm, sophisticated contrast to the cool blues.
- **Tertiary (Medium Blue):** Derived from the reference guide to provide a bridge between the deep navy and lighter backgrounds, useful for interactive states or secondary information.
- **Neutral/Background:** We utilize a "Light Navy" tint for sectioning, which feels more integrated and premium than standard neutral grays. 
- **Typography:** Dark Charcoal is used instead of pure black to soften the reading experience for long-form whitepapers and reports.

## Typography

The typography strategy uses **Outfit** for headlines to provide a modern, geometric character that feels architectural and confident. **Inter** is utilized for all body copy and UI labels to ensure maximum legibility and a systematic, functional feel.

- **Headlines:** Use tight letter-spacing on larger sizes to create a "locked-in" editorial look.
- **Body Text:** Generous line-height (1.5x) is applied to maintain readability during long-form financial analysis reading.
- **Labels:** Small labels use slight letter-spacing and a medium-to-semibold weight to stand out against UI backgrounds without requiring large font sizes.

## Layout & Spacing

The design system employs a **Fixed Grid** philosophy for desktop to maintain a controlled, high-end editorial feel. 

- **Grid System:** A 12-column grid with 24px gutters. Content is centered with a max-width of 1280px.
- **Rhythm:** An 8px base unit drives all padding and margin decisions.
- **Vertical Rhythm:** Sections are separated by significant whitespace (80px to 120px) to prevent the "cluttered" look often found in financial dashboards.
- **Mobile:** Transition to a 4-column fluid grid with 16px side margins. Horizontal scrolling "ghost" cards are used for data sets or member lists to preserve vertical space.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** supplemented by **Ambient Shadows**.

1. **Surface 0 (Background):** Pure white or Very Light Navy (#F0F2FA).
2. **Surface 1 (Cards/Navigation):** Pure white with a very soft, diffused shadow (Offset: 0, 4px; Blur: 20px; Opacity: 4% of Neutral Charcoal).
3. **Interactive State:** When a user hovers over a card, the shadow depth increases slightly (Blur: 30px, Opacity: 8%) and the element lifts 2px.

Avoid using heavy borders or intense shadows; the goal is for the UI to feel "light" and airy, like high-quality stationery.

## Shapes

The shape language is defined by "Rounded" corners (8px-12px), striking a balance between the precision of a sharp-edged professional tool and the approachability of a modern community.

- **Primary UI Elements:** Buttons and Input fields use an 8px radius.
- **Containers:** Large cards and section containers use a 12px or 16px radius.
- **Constraint:** Pill-shaped (fully rounded) buttons are strictly forbidden to maintain a more "structured" executive appearance.

## Components

- **Buttons:** Rectangular with 8px corner radius. Primary buttons use the Burnt Orange with white text. Secondary buttons use a Ghost style (Navy border, Navy text).
- **Cards:** White background, 12px corner radius, and the "Ambient Shadow" defined in Elevation. Used for member profiles, event listings, and financial insights.
- **Input Fields:** 8px radius, 1px border in a lightened navy. Focus states use a 2px Primary Navy border with a subtle outer glow.
- **Chips:** Small, low-contrast navy or orange backgrounds (10% opacity) with high-contrast text. Used for "Premium," "Webinar," or "Report" tags.
- **Lists:** Clean, border-bottom separation only. No "box" containers for list items unless they are individual interactive cards.
- **Data Visualizations:** Charts should utilize the Primary Navy, Secondary Orange, and Tertiary Blue palette for consistency. Avoid the standard green/red "stock market" colors unless indicating direct profit/loss.