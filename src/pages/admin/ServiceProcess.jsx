import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doRefresh } from "../../store/slices/user";
import { urlToImage } from "../../utils/hooks";

// Components
import ServiceDetails from "../home/ServiceDetails";
import ClearInput from "../../components/partials/ClearInput";
import { UpdateModal } from "../../components/partials/toast/Modal";
import { LoaderFull } from "../../components/partials/loader/Loader";
import { uploadImage, useFetch } from "../../utils/fetch";
import { Toast } from "../../components/partials/toast/Dialog";
import Input from "../../components/essentials/Input";

export default function ServiceProcess() {
  const { currentService } = useSelector((s) => s.user);
  const { token } = useSelector((s) => s.admin);
  const dispatch = useDispatch();

  const [errMsg, setErrMsg] = useState("");
  const [loader, setLoader] = useState(false);
  const [toast, setToast] = useState(false);

  const [comments, setComments] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [imgSrc, setImgSrc] = useState("");
  const [status, setStatus] = useState("");
  const [showProcess, setShowProcess] = useState(false);

  // Handling File Changes
  const changeFile = (e) => {
    var file = e.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e) => {
      var img = document.createElement("img");
      img.src = e.target.result;

      img.onload = (e) => {
        var canvas = document.createElement("canvas");

        var Width = 500;
        canvas.width = Width;
        canvas.height = e.target.height * (Width / e.target.width);

        var context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        var imgUrl = context.canvas.toDataURL();
        setImgSrc(imgUrl);

        var newFile = urlToImage(imgUrl);
        setImgFile(newFile);
      };
    };
  };

  // Submit Status Changes
  const submitStatus = async () => {
    if (!selectValue) {
      setErrMsg("Select a option.");
      return;
    }
    setErrMsg("");
    setLoader(true);

    var imageName = "";
    if (imgFile) {
      imageName = imgFile.name;
    }

    const data = await useFetch("admin/service-process", {
      method: "POST",
      authtoken: token,
      body: {
        sid: currentService[0]?.ID,
        status: selectValue,
        comments: comments,
        image: imageName,
      },
    });

    if (data.data) {
      if (imgFile) {
        var formData = new FormData();
        formData.append("image", imgFile);
        await uploadImage("admin/upload", {
          method: "POST",
          authtoken: token,
          body: formData,
        });
      }

      setToast({
        title: "Done",
        msg: "Successfully updated...",
      });
      dispatch(doRefresh(Math.floor(Math.random() * 99999)));
    }

    setLoader(false);
    setComments("");
    setSelectValue("");
    setImgFile(null);
    setImgSrc("");
    setShowProcess(false);

    setTimeout(() => {
      setToast(false);
    }, 3000);
  };

  useEffect(() => {
    if (currentService.length > 0) {
      setStatus(currentService[1][currentService[1]?.length - 1]?.status);
    }
  }, [currentService]);

  return (
    <React.Fragment>
      <ServiceDetails
        showProcess={setShowProcess}
        showProcessBtn={status !== "Delivered"}
      />

      {/* Show Toast */}
      {toast && <Toast title={toast.title} children={toast.msg} />}

      {/* Prcoess Here */}
      {showProcess && (
        <UpdateModal
          title={"Update service status"}
          closeModal={setShowProcess}
        >
          <div className="mt-5 w-full relative">
            <div className="my-4 flex gap-2 items-center">
              <label className="text-lg font-medium">Status</label>
              <select
                defaultValue={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                className=" bg-transparent border outline-none px-2 py-0.5 rounded border-gray-200 cursor-pointer"
              >
                <option value="" className="bg-gray-800">
                  Select
                </option>
                {status === "Accepted" && (
                  <>
                    <option value="Pending" className="bg-gray-800">
                      Pending
                    </option>
                    <option value="Processing" className="bg-gray-800">
                      Processing
                    </option>
                    <option value="Completed" className="bg-gray-800">
                      Completed
                    </option>
                    <option value="Cancelled" className="bg-gray-800">
                      Cancelled
                    </option>
                    <option value="Rejected" className="bg-gray-800">
                      Rejected
                    </option>
                    <option value="Delivered" className="bg-gray-800">
                      Delivered
                    </option>
                  </>
                )}

                {status === "Pending" && (
                  <>
                    <option value="Processing" className="bg-gray-800">
                      Processing
                    </option>
                    <option value="Completed" className="bg-gray-800">
                      Completed
                    </option>
                    <option value="Cancelled" className="bg-gray-800">
                      Cancelled
                    </option>
                    <option value="Rejected" className="bg-gray-800">
                      Rejected
                    </option>
                    <option value="Delivered" className="bg-gray-800">
                      Delivered
                    </option>
                  </>
                )}

                {status === "Processing" && (
                  <>
                    <option value="Pending" className="bg-gray-800">
                      Pending
                    </option>
                    <option value="Completed" className="bg-gray-800">
                      Completed
                    </option>
                    <option value="Cancelled" className="bg-gray-800">
                      Cancelled
                    </option>
                    <option value="Rejected" className="bg-gray-800">
                      Rejected
                    </option>
                    <option value="Delivered" className="bg-gray-800">
                      Delivered
                    </option>
                  </>
                )}
                {(status === "Rejected" || status === "Cancelled") && (
                  <>
                    <option value="Delivered" className="bg-gray-800">
                      Delivered
                    </option>
                  </>
                )}
                {status === "Completed" && (
                  <>
                    <option value="Delivered" className="bg-gray-800">
                      Delivered
                    </option>
                  </>
                )}
              </select>
            </div>

            <div className="my-4 w-full relative">
              <Input
                value={comments}
                onChange={setComments}
                type="text"
                id="comments"
                placeholder="Comments"
                customClass="!border-slate-500 focus:!ring-0 focus:!border-teal-500"
                clearInput={{
                  show: true,
                  customClass: "-top-0.5 right-3",
                }}
              />
            </div>
            <div className="-mt-2 text-sm text-gray-400">
              Seperate with commas {"( , )"} for multiple entries.
            </div>

            <div className="flex gap-4 items-center my-4">
              <div>
                <label
                  htmlFor="files"
                  className="group flex items-center justify-center gap-2 text-slate-300 hover:text-teal-400 font-medium cursor-pointer transition-all"
                >
                  {imgSrc?.length < 1 ? (
                    <React.Fragment>
                      <i className="fa-solid fa-image w-4 hidden group-hover:block text-teal-500 transition-all duration-500"></i>
                      <i className="fa-solid fa-plus w-4 group-hover:hidden text-teal-500 transition-all duration-500"></i>
                      Add Image
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <i className="fa-solid fa-rotate group-hover:rotate-180 w-4 text-red-500 transition-all duration-500"></i>
                      <span className="group-hover:text-red-400">
                        Replace Image
                      </span>
                    </React.Fragment>
                  )}
                </label>
                <input
                  type="file"
                  onChange={changeFile}
                  id="files"
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                />
              </div>
              {imgSrc?.length > 1 && (
                <div className="flex items-center gap-4">
                  <span className="w-0.5 h-4 bg-teal-400"></span>
                  <button
                    onClick={() => {
                      setImgFile(null);
                      setImgSrc("");
                    }}
                    className="text-slate-300 hover:text-red-400 font-medium transition-all"
                  >
                    Delete
                  </button>

                  <img
                    className="w-12 aspect-square object-cover rounded"
                    title={"product image"}
                    alt={"product image"}
                    src={imgSrc}
                  />
                </div>
              )}
            </div>
            <div className="mb-2 text-red-400">{errMsg}</div>
            {loader && (
              <div className="mb-2">
                <LoaderFull />
              </div>
            )}

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  submitStatus();
                }}
                className="group py-1 px-4 flex items-center justify-center gap-2 font-semibold text-slate-100 bg-teal-600 hover:bg-teal-500 rounded-full transition-all"
              >
                <i className="fa-solid fa-check group-hover:scale-125 transition-all"></i>
                Save
              </button>
              <button
                onClick={() => {
                  setLoader(false);
                  setComments("");
                  setSelectValue("");
                  setImgFile(null);
                  setImgSrc("");
                  setErrMsg("");
                  setShowProcess(false);
                }}
                className="group py-1 px-4 flex items-center justify-center gap-2 font-semibold text-slate-100 bg-red-600 hover:bg-red-500 rounded-full transition-all"
              >
                <i className="fa-solid fa-xmark group-hover:scale-125 transition-all"></i>
                Cancel
              </button>
            </div>
          </div>
        </UpdateModal>
      )}
    </React.Fragment>
  );
}
