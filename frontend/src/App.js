import {BrowserRouter,Route,Routes} from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import ProductMovements from "./pages/ProductMovements";

function App() {
  return (
    <BrowserRouter>

      <h1 style={{textAlign:"center"}}>Inventory Tracker</h1>

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/movements/:id" element={<ProductMovements />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;