import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AuthProvider from "./context/AuthProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Checker from "./pages/Checker";
import Builder from "./pages/Builder";
import SubmitPage from "./pages/SubmitPage";
import Protected from "./components/Protected";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/pore-clogging-checker" element={<Checker />} />
            <Route path="/routine-builder" element={<Builder />} />
            <Route
              path="/submit-product"
              element={
                <Protected>
                  <SubmitPage />
                </Protected>
              }
            />
            <Route
              path="/dashboard"
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
