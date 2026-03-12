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

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(createProduct({
      name: form.name,
      sku: form.sku,
      reorder_level: Number(form.reorder_level)
    }));

    close();
  };

  return (

    <div className="modal show d-block">

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
                <input
                  className="form-control"
                  onChange={(e)=>setForm({...form,name:e.target.value})}
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label">SKU</label>
                <input
                  className="form-control"
                  onChange={(e)=>setForm({...form,sku:e.target.value})}
                  required
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Reorder Level</label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e)=>setForm({...form,reorder_level:e.target.value})}
                  required
                />
              </div>

              <button className="btn btn-success">
                Create
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CreateProductModal;