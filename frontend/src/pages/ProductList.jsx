import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productThunks";
import { setSearch, toggleLowStock } from "../features/products/productSlice";
import { useNavigate } from "react-router-dom";
import CreateProductModal from "../components/CreateProductModal";

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, search, lowStockOnly } = useSelector((state) => state.products);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {dispatch(fetchProducts());}, [dispatch]);

  const filteredProducts = list.filter((p) => {

    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());

    const matchesStock = !lowStockOnly || p.current_stock <= p.reorder_level;

    return matchesSearch && matchesStock;
  });

  return (

  <div className="container mt-4">
      <h2 className="mb-4">Product Inventory</h2>
       <div className="row mb-3 align-items-center" style={{background: "aliceblue",padding: "3mm",borderRadius: "5px"}}>
          <div className="col-md-4">
            <input className="form-control" placeholder="Search by name or SKU" value={search} onChange={(e) => dispatch(setSearch(e.target.value))}/>
          </div>

          <div className="col-md-8 d-flex justify-content-end align-items-center gap-3">

            <div className="form-check form-switch m-0">
              <input className="form-check-input" type="checkbox" role="switch" checked={lowStockOnly} onChange={() => dispatch(toggleLowStock())}/>
              <label className="form-check-label ms-2">Low Stock Only</label>
            </div>
            <button className="btn btn-primary"onClick={() => setOpenModal(true)}>+ Create Product</button>
          </div>
        </div>

      <table className="table table-bordered table-hover">

        <thead className="table-primary">
          <tr>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Current Stock</th>
            <th>Reorder Level</th>
            <th className="">Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredProducts.map((p) => (

            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.sku}</td>
              <td>
                {p.current_stock}
              </td>
              <td>{p.reorder_level}</td>
              <td className="text-center">
              <button className="btn btn-sm btn-secondary me-2" onClick={() => navigate(`/movements/${p.id}`)}>Track Movement</button>
              <button className="btn btn-sm btn-secondary" onClick={() => navigate(`/products/${p.id}`)}>Update Movement</button>
              </td>
            </tr>

          ))}

        </tbody>

      </table>

      {openModal && ( <CreateProductModal close={() => setOpenModal(false)} />)}

    </div>
  );
}

export default ProductList;