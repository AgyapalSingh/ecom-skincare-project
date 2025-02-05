import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import CollectionPage from "./components/pages/CollectionPage";
import PageNotFound from "./components/pages/PageNotFound";
import ProductPage from "./products/ProductPage";
import ProductPageFromCollection from "./products/ProductPageFromCollection";
import BestSellerPage from "./components/pages/BestSellerPage";
import CollectionPageFromAllCollections from "./components/collections/CollectionPageFromAllCollections";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/products/:handle" element={<ProductPage />} />


        <Route path="/allcollections" element={<CollectionPage />} />
        <Route path="/allcollections/:handle" element={<CollectionPageFromAllCollections />} />
        <Route path="/allcollections/:handle/:handle" element={<ProductPage />} />

        

        <Route path="/allcollections/bestsellers" element={<BestSellerPage />} />
        {/* <Route path="/allcollections/bestsellers/products/:handle" element={<ProductPageFromCollection />} /> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
