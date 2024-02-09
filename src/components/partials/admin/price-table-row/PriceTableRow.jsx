import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "../../../../utils/fetch";
import { deleteProduct } from "../../../../store/slices/admin";

// Components
import { ToastConfirm } from "../../toast/Dialog";
import { UpdateModal } from "../../toast/Modal";
import UpdateProduct from "../UpdateProduct";

export default function PriceTableRow({ values }) {
  const { token } = useSelector((s) => s.admin);
  const dispatch = useDispatch();

  // Confirm Dialog
  const [showDialog, setShowDialog] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  // Delete Product
  const handleDeleteProduct = async (id) => {
    const data = await useFetch("admin/delete-product", {
      method: "POST",
      authtoken: token,
      body: { id },
    });
    if(data.data) {
      dispatch(deleteProduct(id));
    }
  };

  useEffect(() => {
    if (confirm) {
      handleDeleteProduct(values.ID);
    }
  }, [confirm]);

  return (
    <div className="relative tracking-wide border border-slate-600 text-slate-300 py-2 rounded">
      {showDialog ? (
        <ToastConfirm
          title={`Deleting:`}
          msg={"Are you sure?"}
          result={setConfirm}
          dialog={setShowDialog}
        />
      ) : (
        <React.Fragment>
          <div className="text-left font-medium text-teal-500 px-4 mb-1">
            {values.product}
          </div>
          <div className="grid grid-cols-5 max-h-10">
            <div>{values.ID}</div>
            <div>{values.productId || "-----"}</div>
            <div>
              {values.rlp}
              <span className="text-red-500">*</span>
            </div>
            <div>{values.mrp}</div>
            <div className="flex items-center justify-center gap-4 text-xl">
              <i
                onClick={(e) => setUpdateModal(true)}
                title="Update Product"
                className="fa-regular fa-pen-to-square text-yellow-500 hover:text-yellow-400 transition-all cursor-pointer"
              ></i>
              <i
                onClick={(e) => {
                  setShowDialog(true);
                }}
                title="Delete Product"
                className="fa-regular fa-trash-can text-red-600 hover:text-red-500 transition-all cursor-pointer"
              ></i>
            </div>
          </div>
        </React.Fragment>
      )}
      
      {/* Update Modal */}
      {updateModal && (
        <UpdateModal
          title={"Update Product: " + values.ID}
          closeModal={setUpdateModal}
        >
          <UpdateProduct id={values.ID} closeModal={setUpdateModal} />
        </UpdateModal>
      )}
    </div>
  );
}
