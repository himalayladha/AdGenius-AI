# AdGenius AI

> Generate award-winning ad concepts using the six fundamental creativity templates from Goldenberg, Mazursky & Solomon's seminal 1999 Marketing Science research.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Google Gemini](https://img.shields.io/badge/Gemini-2.0_Flash-orange?logo=google)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwindcss)

## What It Does

AdGenius AI takes your product details and generates **6 unique ad concepts** — one per creativity template — in parallel using Google Gemini AI. The templates are proven to appear in **89% of award-winning ads**.

### The 6 Creativity Templates

| Template | Core Mechanic |
|----------|---------------|
| 🔮 **Pictorial Analogy** | Product + symbol unified by shape, color, or sound |
| ⚡ **Extreme Situation** | Benefit pushed to an absurd, unrealistic extreme |
| 🌿 **Consequences** | Dramatic results of using — or not using — the product |
| 🏆 **Competition** | Product competes with an unexpected opponent from a different class |
| 🧪 **Interactive Experiment** | Viewer performs an action that reveals the product's benefit |
| 📐 **Dimensionality Alteration** | Time leap, scale shift, or multiplication to reframe value |

## Features

- ⚡ **Parallel generation** — all 6 concepts generated simultaneously
- 🔄 **Per-card Regenerate** — re-generate any single template without starting over
- 📋 **Copy to clipboard** — copy any field or the full card
- 🎨 **Premium dark UI** — glassmorphism, animated mesh background, micro-animations
- 📱 **Responsive** — works on mobile, tablet, and desktop

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/adgenius-ai.git
cd adgenius-ai
npm install
```

### 2. Add your Google Gemini API key

Create a `.env.local` file in the project root:

```env
GOOGLE_GENAI_API_KEY=your_api_key_here
```

Get a free key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey).

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **AI**: Google Gemini 2.0 Flash via `@google/generative-ai`
- **Styling**: Tailwind CSS v4 + custom CSS
- **Language**: TypeScript
- **Fonts**: Inter + Space Grotesk (Google Fonts)

## Research Reference

> Goldenberg, J., Mazursky, D., & Solomon, S. (1999). **The fundamental templates of quality ads.** *Marketing Science*, 18(3), 333–351.

The AI prompts for each template are precisely engineered from the paper's formulations — including product space, symbols set, and linking operator mechanics — not just the template name.

## License

MIT
