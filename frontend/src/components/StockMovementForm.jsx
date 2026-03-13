import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStockMovement } from "../features/products/productThunks";
import { useNavigate } from "react-router-dom";

function StockMovementForm({ productId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [type, setType] = useState("in");
  const increase = () => {setQuantity((prev) => Number(prev || 0) + 1);};
  const decrease = () => { if (quantity > 0) {setQuantity(quantity - 1);}};
  const [error, setError] = useState("");
  const handleQuantityChange = (e) => {
    const value = e.target.value;
    // Allow empty input
    if (value === "") { setQuantity("");return;}
    const num = Number(value);
    // Prevent negative numbers
    if (num < 0) return;
    setQuantity(num);
  };
  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  if (!quantity || quantity <= 0) {
    setError("Quantity must be greater than 0");
    return;
  }
  const delta = type === "in" ? quantity : -quantity;
  const result = await dispatch(
    addStockMovement({
      product_id: productId,
      delta: delta,
      reason: reason
    })
  );

  if (result.meta.requestStatus === "fulfilled") {
    alert("Stock movement added successfully");
    navigate("/");
  } else {
    if (result.payload?.detail) {
      if (Array.isArray(result.payload.detail)) {
        const messages = result.payload.detail.map(err => err.msg).join(", ");setError(messages);
      } else {
        setError(result.payload.detail);
      }
    } else {
      setError("Something went wrong");
    }
  }
};

  return (

    <form onSubmit={handleSubmit}>

      {/* Movement Type */}
      <div className="mb-3">
        <label className="form-label">Movement Type</label>

        <select
          className="form-select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="in">Stock In</option>
          <option value="out">Stock Out</option>
        </select>
      </div>

      {/* Quantity */}
      <div className="mb-3">

        <label className="form-label">Quantity</label>

        <div className="input-group">

          <button type="button" className="btn btn-outline-danger"onClick={decrease}>
            −
          </button>

          <input
            type="number"
            className="form-control text-center"
            value={quantity}
            onChange={handleQuantityChange}
            min="0"
            placeholder="Enter quantity"
          />
          <button type="button"className="btn btn-outline-success" onClick={increase}>
            +
          </button>
        </div>
      </div>
      {/* Reason */}
      <div className="mb-3">
        <label className="form-label">Reason</label>
        <input type="text" className="form-control" placeholder="Enter reason" value={reason} onChange={(e) => setReason(e.target.value)}/>
      </div>
      {/* Submit */}
      <button type="submit" className="btn btn-primary w-100">
        Submit Movement
      </button>
      {error && (
        <div className="alert alert-danger mt-3">
          {error}
        </div>
      )}

    </form>
  );
}

export default StockMovementForm;