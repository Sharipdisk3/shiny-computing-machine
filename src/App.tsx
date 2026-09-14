import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";
import ArticlePage from "./pages/ArticlePage";
import CategoryPage from "./pages/CategoryPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return <><ScrollToTop /><Header /><main><Routes><Route path="/" element={<HomePage />} /><Route path="/article/:id" element={<ArticlePage />} /><Route path="/category/:slug" element={<CategoryPage />} /><Route path="/search" element={<SearchPage />} /><Route path="/about" element={<AboutPage />} /><Route path="*" element={<HomePage />} /></Routes></main><Footer /></>;
}
