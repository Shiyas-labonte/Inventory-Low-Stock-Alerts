import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getMovements, fetchProductDetail } from "../features/products/productThunks";

function ProductMovements() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const product = useSelector((state) => state.products.detail);
  const movements = useSelector((state) => state.products.movements);
  const currentStock = movements.reduce((total, m) => total + m.delta, 0);

  useEffect(() => {
    dispatch(getMovements(id));
    dispatch(fetchProductDetail(id));
  }, [dispatch, id]);

  return (

    <div className="container mt-4">
    <button className="btn btn-secondary mb-3"onClick={() => navigate("/")}>← Back</button>
      <h3>Stock Movement History - {product?.name || "Loading..."}</h3>
      <hr className="mb-2" style={{padding: "0 35px"}} />
      <table className="table table-bordered  mt-3">
        <thead className="table-primary">
          <tr>
            <th>Date</th>
            <th>Reason</th>
            <th>Movement</th>
          </tr>
        </thead>
        <tbody>
          {movements.map((m) => (
            <tr key={m.id}>
            <td>{new Date(m.created_at).toLocaleString()}</td>
            <td>{m.reason || "-"}</td>
            <td>{m.delta > 0 ? (<span className="text-success fw-bold">+{m.delta}</span>) : (<span className="text-danger fw-bold">{m.delta}</span>)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="table-light">
            <tr>
                <td colSpan="2" className="text-end fw-bold">
                Current Stock
                </td>
                <td className="fw-bold">
                {currentStock}
                </td>
            </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default ProductMovements;