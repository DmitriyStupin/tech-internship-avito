import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AdPage from "./pages/AdPage";
import AdsPage from "./pages/AdsPage";
import EditAdPage from "./pages/EditAdPage";
import App from "./App.tsx";

const root = document.getElementById('root')!

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />

      <Route path="/ads" element={<AdsPage />} />
      <Route path="/ads/:id" element={<AdPage />} />
      <Route path="/ads/:id/edit" element={<EditAdPage />} />
    </Routes>
  </BrowserRouter>
);
