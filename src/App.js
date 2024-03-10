import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import "./App.css";
import { ListadoLibros } from "./libros/ListadoLibros";
import { LibroForm } from "./libros/LibroForm";
import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";

export function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<ListadoLibros />} />
          <Route path="/books" element={<LibroForm />} />
          <Route path="/books/:id" element={<LibroForm />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
