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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {dispatch(fetchProducts());}, [dispatch]);
  useEffect(() => {setCurrentPage(1);}, [search, lowStockOnly]);

  const filteredProducts = list.filter((p) => {

    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());

    const matchesStock = !lowStockOnly || p.current_stock <= p.reorder_level;

    return matchesSearch && matchesStock;
  });
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (

  <div className="m-4 mt-2">
      <h2 className="mb-3">Product Inventory</h2>
      <hr className="mb-2" style={{padding: "0 35px"}} />
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

      <table className="table table-bordered ">

        <thead className="table-primary">
          <tr>
            <th className="text-center">Slno.</th>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Current Stock</th>
            <th>Reorder Level</th>
            <th className="">Actions</th>
          </tr>
        </thead>

        <tbody>

          {paginatedProducts.map((p, index) => (

            <tr key={p.id}>
              <td className="text-center">{startIndex + index + 1}</td>
              <td>{p.name}</td>
              <td>{p.sku}</td>
              <td>
                {p.current_stock}
              </td>
              <td>{p.reorder_level}</td>
              <td className="text-center">
              <button type="button" className="btn btn-outline-primary btn-sm me-2" onClick={() => navigate(`/movements/${p.id}`)}>Track Movement</button>
              <button type="button" className="btn btn-outline-secondary btn-sm " onClick={() => navigate(`/products/${p.id}`)}>Update Movement</button>
              </td>
            </tr>

          ))}

        </tbody>

      </table>
      <nav className="mt-2">
        <ul className="pagination pagination-sm justify-content-center shadow-sm">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link"onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}>«</button>
          </li>
          {[...Array(totalPages)].map((_, i) => (
            <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
              <button className="page-link"onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link"onClick={() =>currentPage < totalPages && setCurrentPage(currentPage + 1)}>»</button>
          </li>
        </ul>
      </nav>

      {openModal && ( <CreateProductModal close={() => setOpenModal(false)} />)}

    </div>
  );
}

export default ProductList;