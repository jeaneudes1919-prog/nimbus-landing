import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ScrollToTopButton } from "./components/layout/ScrollToTopButton";
import { ScrollToTopOnRouteChange } from "./hooks/ScrollToTopOnRouteChange";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  const location = useLocation();

  return (
    <div className="relative flex min-h-screen flex-col">
      <ScrollToTopOnRouteChange />
      <Navbar />

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex-1"
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </motion.main>
      </AnimatePresence>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
