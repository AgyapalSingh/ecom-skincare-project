import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import CollectionPage from "./components/pages/CollectionPage";
import PageNotFound from "./components/pages/PageNotFound";
import ProductPage from "./products/ProductPage";
// import ProductPageFromCollection from "./products/ProductPageFromCollection";
import BestSellerPage from "./components/pages/BestSellerPage";
import CollectionPageFromAllCollections from "./components/collections/CollectionPageFromAllCollections";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import AllBlogsPage from "./components/pages/AllBlogsPage";
import AboutUs from "./components/pages/FooterPages/AboutUs";
import ContactUs from "./components/pages/FooterPages/ContactUs";
import FAQs from "./components/pages/FooterPages/FAQs";
import TrackOrder from "./components/pages/FooterPages/TrackOrder";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
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
        {/* <Route path="/allcollections/bestsellers/products/:handle" element={<ProductPageFromCollection />} /> */}


        {/* BLogs */}
        <Route path="/blogs" element={<AllBlogsPage />} />


        {/* Footer Routes */}
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
