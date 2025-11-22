import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AuthProvider from "./context/AuthProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Checker from "./pages/Checker";
import Builder from "./pages/Builder";

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
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
