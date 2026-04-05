import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdsPage from "./pages/AdsPage";
import AdPage from "./pages/AdPage";
import EditAdPage from "./pages/EditAdPage";
import "./shared/styles";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/ads" replace />} />

        <Route path="/ads" element={<AdsPage />} />
        <Route path="/ads/:id" element={<AdPage />} />
        <Route path="/ads/:id/edit" element={<EditAdPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
