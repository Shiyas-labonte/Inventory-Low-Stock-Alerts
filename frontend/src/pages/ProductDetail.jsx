import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail } from "../features/products/productThunks";
import { useParams, useNavigate } from "react-router-dom";
import StockMovementForm from "../components/StockMovementForm";

function ProductDetail() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { detail, loading, error } = useSelector((state) => state.products);

  useEffect(() => {dispatch(fetchProductDetail(id));}, [dispatch, id]);
  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;
  if (!detail) return <p className="text-center mt-5">Not found</p>;
  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3"onClick={() => navigate("/")}>← Back</button>
      <h2 className="mb-3">Update product movement</h2>
      <hr className="mb-2" style={{padding: "0 35px"}} />

      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">Product Details</div>

            <div className="card-body">
              <p><strong>Name:</strong> {detail.name}</p>
              <p><strong>SKU:</strong> {detail.sku}</p>
              <p>
                <strong>Current Stock:</strong>{" "}
                {detail.current_stock}

                {detail.current_stock <= detail.reorder_level && (
                  <span className="badge bg-danger ms-2">
                    Low Stock
                  </span>
                )}
              </p>
              <p><strong>Reorder Level:</strong> {detail.reorder_level}</p>

            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">Add Stock Movement</div>
            <div className="card-body">
              <StockMovementForm productId={detail.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductDetail;