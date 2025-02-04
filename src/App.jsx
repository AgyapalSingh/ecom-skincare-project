import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import CollectionPage from "./components/pages/CollectionPage";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/All-Collections" element={<CollectionPage />} />
      </Routes>
    </>
  );
}

export default App;
