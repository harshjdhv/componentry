# Library Architecture Improvements

Based on an analysis of production-grade libraries (specifically ReactBits) and comparison with the current state of Componentry, here are high-impact improvements to help the library scale.

### 1. Centralized Metadata Registry
**What ReactBits does:**
Instead of hardcoding titles, descriptions, and tags inside every page file (e.g., `app/docs/components/hyper-text/page.tsx`), ReactBits maintains a single source of truth (e.g., `src/constants/Information.js`).

*   **Benefits:** You can programmatically generate navigation, search indexes, and SEO tags without opening 50 different files.
*   **Adoption for Componentry:**
    Create a `registry.ts` file that exports an object mapping component slugs to their metadata.
    ```typescript
    // registry.ts
    export const registry = {
      "hyper-text": {
        name: "Hyper Text",
        description: "A text scramble effect...",
        component: React.lazy(() => import("@/components/ui/hyper-text")),
        demo: React.lazy(() => import("@/demos/hyper-text-demo")),
      }
    }
    ```

### 2. Separation of "Source" and "Demo"
**What ReactBits does:**
It strictly separates the *consumable component* from the *demonstration UI*.
*   **Source:** `src/content/TextAnimations/BlurText/BlurText.jsx` (The clean code users copy).
*   **Demo:** `src/demo/TextAnimations/BlurTextDemo.jsx` (The showcase with buttons, controls, and layout).

*   **Why it matters:** Your current `page.tsx` mixes the component's preview, the installation instructions, and the code block string. This makes the file huge and hard to maintain.
*   **Adoption for Componentry:**
    Move the interactive example into a separate file (e.g., `demos/hyper-text-demo.tsx`). Your documentation page should just import and render this demo wrapper.

### 3. Multi-Flavor Support (The "Production Grade" Move)
**What ReactBits does:**
It organizes source code by "flavor" in directories like `ts-default` (TypeScript + CSS) and `ts-tailwind` (TypeScript + Tailwind).

*   **Why it matters:** Early-stage libraries often force one stack (e.g., "we only support Tailwind"). Stable libraries meet users where they are.
*   **Adoption for Componentry:**
    You don't need to duplicate files manually yet. Start by deciding on your primary support (e.g., TS + Tailwind) but structure your folders to allow adding a `css-modules` or `javascript` version later without breaking usage.

### 4. Interactive "Playground" Pattern
**What ReactBits does:**
In `BlurTextDemo.jsx`, they use a `useComponentProps` hook and a `Customize` component.
*   The demo isn't static; it has controls for `delay`, `direction`, etc.
*   The code block dynamically updates when you change these controls.

*   **Adoption for Componentry:**
    Instead of just showing the component, wrap it in a `ComponentPlayground` that accepts a schema of props (knobs) and lets users tweak them in real-time.

### 5. Dynamic Documentation Routing
**What ReactBits does:**
It uses a single dynamic route `CategoryPage.jsx` that catches `/:category/:subcategory`. It uses the registry to look up which component to load.

*   **Why it matters:** You currently have `app/docs/components/hyper-text/page.tsx`. If you add 50 components, you'll create 50 folders and 50 page files.
*   **Adoption for Componentry:**
    Switch to a dynamic route `app/docs/components/[slug]/page.tsx`. Use your new `registry.ts` to look up the component metadata and render the standard layout. This eliminates 90% of your boilerplate code.
