import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../features/products/productThunks";

function CreateProductModal({ close }) {

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    sku: "",
    reorder_level: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const result = await dispatch(createProduct({
      name: form.name,
      sku: form.sku,
      reorder_level: Number(form.reorder_level)
    }));

    if (result.meta.requestStatus === "fulfilled") {

      setSuccess("Product created successfully");
      // close modal after 1.5 seconds
      setTimeout(() => {close();}, 1500);
    } else {
      if (result.payload?.detail) {

        if (Array.isArray(result.payload.detail)) {
          const messages = result.payload.detail.map(err => err.msg).join(", ");
          setError(messages);
        } else {
          setError(result.payload.detail);
        }
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (

    <div className="modal show d-block" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Create Product</h5>
            <button className="btn-close" onClick={close}></button>
          </div>

          <div className="modal-body">

            <form onSubmit={handleSubmit}>

              <div className="mb-2">
                <label className="form-label">Product Name</label>
                <input className="form-control" value={form.name}onChange={(e) =>setForm({ ...form, name: e.target.value })}/>
              </div>

              <div className="mb-2">
                  <label className="form-label">SKU</label>
                  <input className="form-control" value={form.sku}
                    onChange={(e) =>setForm({ ...form, sku: e.target.value })}
                  />
              </div>

              <div className="mb-2">
                <label className="form-label">Reorder Level</label>
                <input type="number" className="form-control" value={form.reorder_level}onChange={(e) =>setForm({ ...form, reorder_level: e.target.value })}/>
              </div>

              <button className="btn btn-success w-100">Create</button>

              {/* Error Message */}
              {error && (
                <div className="alert alert-danger mt-3">
                  {error}
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="alert alert-success mt-3">
                  {success}
                </div>
              )}

            </form>

          </div>

        </div>
      </div>
    </div>
  );
}

export default CreateProductModal;