import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "./pages/Test.jsx";
import About from "./pages/About.jsx";
import NoPage from "./pages/NoPage.jsx";
import Pembelian from "./pages/Pembelian.jsx";
import Laporan from "./pages/Laporan.jsx";
import Ecer from "./pages/Ecer.jsx";
import Barang from "./pages/Barang.jsx";

function App() {
  /* const [count, setCount] = useState(0); */

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Test />} />
          <Route path="/about" element={<About />} />
          <Route path="/pembelian" element={<Pembelian />} />
          <Route path="/pembelian/ecer" element={<Ecer />} />
          <Route path="/laporan" element={<Laporan />} />
          <Route path="/barang" element={<Barang />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
