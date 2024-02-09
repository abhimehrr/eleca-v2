import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "../../../../utils/fetch";
import { deleteService } from "../../../../store/slices/admin";
import { ToastConfirm } from "../../toast/Dialog";

import "./table.css";

export default function TableRow({ values }) {
  const { ID, itemName, cName, currentStatus } = values;
  const { token } = useSelector((s) => s.admin);
  const dispatch = useDispatch();

  // Dialog
  const [confirm, setConfirm] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  // Delete Service
  const handleDeleteService = async (id) => {
    const data = await useFetch('admin/delete-service', {
      method: 'POST',
      authtoken: token,
      body: {sid: id}
    })
    
    if(data.data) {
      dispatch(deleteService(id));
    }
  };

  useEffect(() => {
    if (confirm) {
      handleDeleteService(ID);
    }
  }, [confirm]);

  return (
    <tr className="gap-4 items-center min-h-14 relative overflow-hidden">
      {showDialog ? (
        <td
          className={`absolute ${
            showDialog ? "left-0" : " -left-full"
          } w-full h-full bg-slate-900`}
        >
          <ToastConfirm
            title={`Deleting:`}
            msg={"Are you sure?"}
            result={setConfirm}
            dialog={setShowDialog}
          />
        </td>
      ) : (
        <React.Fragment>
          <td>{ID}</td>
          <td className="capitalize">{cName}</td>
          <td className="capitalize">{itemName}</td>
          <td className="flex items-center gap-3 justify-center">
            <div
              title={
                currentStatus === "Processing"
                  ? "Processing"
                  : currentStatus === "Completed"
                  ? "Completed"
                  : currentStatus === "Delivered"
                  ? "Delivered"
                  : currentStatus === "Pending"
                  ? "Pending"
                  : currentStatus === "Cencelled"
                  ? "Cencelled"
                  : currentStatus === "Rejected"
                  ? "Rejected"
                  : currentStatus === "Accepted"
                  ? "Accepted"
                  : "Title"
              }
              className={`w-4 aspect-square ${
                currentStatus === "Processing" ||
                currentStatus === "Completed" ||
                currentStatus === "Delivered"
                  ? "bg-green-400"
                  : currentStatus === "Pending"
                  ? "bg-yellow-400"
                  : currentStatus === "Cencelled" ||
                    currentStatus === "Rejected"
                  ? "bg-red-400"
                  : "bg-gray-200"
              } rounded-full`}
            />
            <p className="hidden sm:block">{currentStatus}</p>
          </td>
          <td className="flex items-center justify-center gap-4 text-xl">
            <Link
              to={`/admin/view-service-details/${ID}`}
              title="View service"
              className="fa-regular fa-eye text-slate-400 hover:text-slate-300 transition-all cursor-pointer"
            ></Link>
            <i
              onClick={(e) => {
                setShowDialog(true);
              }}
              title="Delete service"
              className="fa-regular fa-trash-can text-red-600 hover:text-red-500 transition-all cursor-pointer"
            ></i>
          </td>
        </React.Fragment>
      )}
    </tr>
  );
}
