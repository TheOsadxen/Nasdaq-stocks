# 📈 Nasdaq Stocks Search

A React + TypeScript project that allows users to search and browse Nasdaq stock tickers.  
It uses [Polygon.io](https://polygon.io) API for financial data, with infinite scrolling and pagination powered by React Query.

---

## 🚀 Features

- 🔍 Search tickers with debounced input.  
- 📜 Infinite scrolling using React Query’s `useInfiniteQuery`.  
- 🎨 Tailwind CSS for styling with support for dark mode.  
- ✅ Unit & integration tests using Vitest, React Testing Library, and MSW.  
- ⚡ Vite for fast development and builds.  

---

## 🛠️ Tech Stack

- React 19 + TypeScript  
- TanStack Query (React Query)  
- Tailwind CSS  
- Vitest + React Testing Library + MSW  
- Polygon.io API  

---

## 📂 Project Structure

src/  
 ├─ components/         # UI components  
 ├─ hooks/              # Custom React hooks  
 ├─ services/           # API layer (fetchTickers, etc.)  
 ├─ context/            # Theme provider  
 ├─ types/              # TypeScript custom types  
 ├─ test/               # Test utilities (renderHookWithClient, MSW setup)  
 └─ main.tsx            # App entry point  

---

## ⚙️ Setup & Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/TheOsadxen/Nasdaq-stocks.git
   cd <repo-name>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**

   You need a [Polygon.io](https://polygon.io) API key to fetch stock data.  

   Create a `.env` file in the root of the project:

   ```
   VITE_POLYGON_API_KEY=api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at:  
   👉 http://localhost:5173

---

## 🧪 Running Tests

This project includes unit tests and integration tests.

- Run all tests
  ```bash
  npm run test
  ```

- Run tests in watch mode
  ```bash
  npm run test:watch
  ```

- Run with coverage
  ```bash
  npm run coverage
  ```

**Tests use:**
- Vitest (test runner)  
- React Testing Library (component testing)  
- MSW (mock API requests)  

---

## 🌗 Theme (Dark/Light Mode)

The app supports **dark mode**.  
It uses a `ThemeContext` to toggle between dark and light, with Tailwind’s `dark:` classes.

---

## 📦 Build for Production

```bash
npm run build
```

Serve the build:

```bash
npm run preview
```


---

## 📜 License

This project is for demo purposes only.
