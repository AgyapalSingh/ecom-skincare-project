import AutoScrollToTop from "./lib/Utils/AutoScrollToTop";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import CollectionPage from "./components/pages/CollectionPage";
import PageNotFound from "./components/pages/PageNotFound";
import ProductPage from "./products/ProductPage";
import BestSellerPage from "./components/pages/BestSellerPage";
import CollectionPageFromAllCollections from "./components/collections/CollectionPageFromAllCollections";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import AllBlogsPage from "./components/pages/AllBlogsPage";
import AboutUs from "./components/pages/FooterPages/AboutUs";
import ContactUs from "./components/pages/FooterPages/ContactUs";
import FAQs from "./components/pages/FooterPages/FAQs";
import TrackOrder from "./components/pages/FooterPages/TrackOrder";
import AllProductsPage from "./components/pages/AllProductsPage";
import SmoothScrolling from "./lib/Utils/SmoothScrolling";

function App() {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <Header />
      {showTopButton && (
        <button
          className="go-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <IoIosArrowUp />
        </button>
      )}
      <SmoothScrolling>
        <AutoScrollToTop>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<AllProductsPage />} />
            <Route path="/products/:handle" element={<ProductPage />} />
            <Route path="/allcollections" element={<CollectionPage />} />
            <Route
              path="/allcollections/:handle"
              element={<CollectionPageFromAllCollections />}
            />
            <Route
              path="/allcollections/:handle/:handle"
              element={<ProductPage />}
            />
            <Route
              path="/allcollections/bestsellers"
              element={<BestSellerPage />}
            />

            {/* BLogs */}
            <Route path="/blogs" element={<AllBlogsPage />} />

            {/* Footer Routes */}
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AutoScrollToTop>
      </SmoothScrolling>
      <Footer />
    </>
  );
}

export default App;
