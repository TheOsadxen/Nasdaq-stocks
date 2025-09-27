import { Footer } from "./components/Footer";
import { useEffect, useState } from "react";
import { Splash } from "./components/Splash";
import { AnimatePresence, motion } from "framer-motion";
import { ExploreStocks } from "./pages/ExploreStocks";

function App() {
  const [shouldShowSplash, setShouldShowSplash] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setShouldShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-container dark:bg-neutral-800">
      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Main interactive content */}
        <AnimatePresence mode="wait">
          {shouldShowSplash ? (
            <motion.div
              key="splash"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex justify-center items-center"
            >
              <Splash />
            </motion.div>
          ) : (
            <motion.div
              key="explore"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ExploreStocks />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default App;
