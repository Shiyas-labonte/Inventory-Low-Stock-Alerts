import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStockMovement } from "../features/products/productThunks";
import { useNavigate } from "react-router-dom";

function StockMovementForm({ productId }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");

  const handleMovement = async (type) => {

    if (!quantity) return;

    const delta =
      type === "add"
        ? Number(quantity)
        : -Number(quantity);

    const result = await dispatch(
      addStockMovement({
        product_id: productId,
        delta: delta,
        reason: reason
      })
    );

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");   // redirect to product list
    }

  };

  return (

    <form>

      <div className="mb-3">
        <label className="form-label">Quantity</label>

        <input
          type="number"
          className="form-control"
          placeholder="Enter quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Reason</label>

        <input
          type="text"
          className="form-control"
          placeholder="Optional reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>

      <div className="d-flex gap-3">

        <button
          type="button"
          className="btn btn-success flex-fill"
          onClick={() => handleMovement("add")}
        >
          + Stock In
        </button>

        <button
          type="button"
          className="btn btn-danger flex-fill"
          onClick={() => handleMovement("remove")}
        >
          − Stock Out
        </button>

      </div>

    </form>
  );
}

export default StockMovementForm;