import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import CollectionPage from "./components/pages/CollectionPage";
import PageNotFound from "./components/pages/PageNotFound";
import ProductPage from "./products/ProductPage";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/All-Collections" element={<CollectionPage />} />
        <Route path="/products/:handle" element={<ProductPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
