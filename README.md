# Vue Shop Demo

This is a test project for a TypeScript/Vue.js developer position.  
A simple e-commerce demo built with **Vue 3**, **TypeScript**, **Pinia**, and **Tailwind CSS**.

## Stack

- ⚙️ Vite
- 🧠 Vue 3 (Composition API + script setup)
- 💅 Tailwind CSS (v4)
- 📦 Pinia (state management)
- 💬 Ecwid REST API (demo store)
- 📏 ESLint + Prettier
- 🧪 Vitest (unit tests)
- 🧪 Cypress (e2e tests)
- 🌐 Microdata (schema.org) for SEO and accessibility
- ♿ Accessibility improvements

## Setup & Run

### 1. Install dependencies

```bash
npm install
```

### 2. Run in development

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Run tests

#### Unit tests (Vitest)
```bash
npm run test:unit
```

#### E2E tests (Cypress)
```bash
npm run test:e2e
```

### 5. Deploy to GitHub Pages

```bash
npm run deploy
```

---

## Additional notes

- 🛒 **Flying animation** when adding a product to the cart, for enhanced user feedback
- 🔖 **Meta tags** added to the document head for better SEO, including:
  - Page title and description
  - Open Graph tags for social previews
  - Language and character encoding
- 🦽 Basic **accessibility** improvements:
  - `aria-label`s on all interactive elements without text
  - `role` attributes used where appropriate
- 🛠️ Semantic markup and **microdata** (`schema.org`) for products and cart
- 💾 Cart is fully **persisted in localStorage** and restored on page load
- 🌍 **Fully responsive** design, works well on all screen sizes
- 🔄 Uses **Composition API** and **composables** for separation of concerns and reusability

### Environment & Authentication

In a real-world project:

- `BASE_URL` and similar configuration values should be stored in `.env` files, not hardcoded.
- Authentication tokens should be securely fetched and stored upon user login or initialization, not included directly in the codebase.

This setup is simplified for demonstration purposes.


## A note on AI assistance

As you might've guessed from the emoji overload, and unusually verbose README — yes, this project was built with the loving support of AI 😉
