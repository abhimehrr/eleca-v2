import React, { useState, useRef } from "react";

// Components
import { LoaderFull } from "../../components/partials/loader/Loader";
import { useSelector } from "react-redux";
import { uploadImage, useFetch } from "../../utils/fetch";
import Input from "../../components/essentials/Input";
import { urlToImage } from "../../utils/hooks";
import { Toast } from "../../components/partials/toast/Dialog";
import { Link } from "react-router-dom";

export default function AddWarranty() {
  const { token } = useSelector((s) => s.admin);

  // Loaders
  const [toast, setToast] = useState(false);
  const [loader, setLoader] = useState(false);

  // Option
  const [errMsg, setErrMsg] = useState("");

  // Image States
  const [imgSrc, setImgSrc] = useState("");
  const [imgFile, setImgFile] = useState(null);

  const [mobile, setMobile] = useState("");
  const [cName, setCName] = useState("");
  const [itemName, setItemName] = useState("");
  const [cAddress, setCAddress] = useState("");
  const [dop, setDop] = useState(new Date().toLocaleString());
  const [period, setPeriod] = useState("");
  const [comments, setComments] = useState("");

  // Ref
  const mobileRef = useRef(null);
  const itemNameRef = useRef(null);
  const cNameRef = useRef(null);
  const cAddressRef = useRef(null);
  const periodRef = useRef(null);
  const imgRef = useRef(null);
  const imgInputRef = useRef(null);
  const commentsRef = useRef(null);
  const resetBtnRef = useRef(null);

  // Handling File Changes
  const changeFile = (e) => {
    if (e.target.files.length < 1) return;

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

  // Submit Status
  const submitStatus = async () => {
    var isFormValid = validateForm();
    if (!isFormValid) return;

    setLoader(true);

    // Register Service
    const data = await useFetch("admin/register-warranty-card", {
      method: "POST",
      authtoken: token,
      body: {
        itemName,
        name: cName,
        mobile,
        address: cAddress,
        period,
        comments,
        image: imgFile.name,
      },
    });

    // Upload Image
    var formData = new FormData();
    formData.append("image", imgFile);

    const res = await uploadImage("admin/upload", {
      method: "POST",
      authtoken: token,
      body: formData,
    });

    setLoader(false);
    setToast({
      title: "Success",
      msg: (
        <p>
          {data.msg} <br />
          Serial no. : {data.data.insertId}
        </p>
      ),
    });
    setTimeout(() => {
      setToast(false);
    }, 10000);

    // Set NULL all values
    resetBtnRef.current.click();
  };

  // Set NULL all values
  const resetFields = () => {
    setCName("");
    setMobile("");
    setCAddress("");
    setItemName("");
    setPeriod("");
    setDop(new Date().toLocaleString());
    setComments("");
    setImgSrc("");
    setImgFile(null);
    imgInputRef.current.value = null;
  };

  // Check Customer Exists
  const checkCustomer = async () => {
    if (mobile.length === 10) {
      const data = await useFetch("search-customer", {
        method: "POST",
        body: { mobile },
      });
      const d = data.data;
      if (d) {
        setCName(d.name);
        setCAddress(d.address);
      }
    }
  };

  // Handle Form Validation
  const validateForm = () => {
    if (mobile.length < 1) {
      setErrMsg("Enter mobile number");
      mobileRef.current.classList.add("border-red-500");
      return false;
    } else if (mobile.length < 10 || mobile.length > 10) {
      setErrMsg("Mobile number must be 10 character");
      mobileRef.current.classList.add("border-red-500");
      return false;
    } else {
      setErrMsg("");
      mobileRef.current.classList.remove("border-red-500");
    }
    if (cName.length < 1) {
      cNameRef.current.classList.add("border-red-500");
      setErrMsg("Enter customer name");
      return false;
    } else {
      cNameRef.current.classList.remove("border-red-500");
      setErrMsg("");
    }
    if (cAddress.length < 1) {
      cAddressRef.current.classList.add("border-red-500");
      setErrMsg("Enter customer address");
      return false;
    } else {
      cAddressRef.current.classList.remove("border-red-500");
      setErrMsg("");
    }
    if (itemNameRef.length < 1) {
      itemNameRef.current.classList.add("border-red-500");
      setErrMsg("Enter item name");
      return false;
    } else {
      itemNameRef.current.classList.remove("border-red-500");
      setErrMsg("");
    }
    if (period < 1) {
      periodRef.current.classList.add("border-red-500");
      setErrMsg("Enter warranty period");
      return false;
    } else {
      periodRef.current.classList.remove("border-red-500");
      setErrMsg("");
    }
    if (!imgSrc || !imgFile) {
      imgRef.current.classList.add("!text-red-500");
      setErrMsg("Please add a image");
      return false;
    } else {
      setErrMsg("");
    }

    return true;
  };

  return (
    <div className="relative py-8 sm:px-4 max-sm:mx-2 bg-gray-900 rounded-lg text-gray-200">
      {/* Set Toast */}
      {toast && (
        <Toast
          title={toast.title}
          close={setToast}
          children={toast.msg}
        />
      )}

      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="mx-auto flex flex-col justify-center items-center">
          <div className="flex flex-col items-center">
            <h1 className="title-font sm:text-3xl text-3xl tracking-wider mb-4 font-bold text-teal-500">
              Add a warranty card
            </h1>
          </div>
          <div className="w-full mt-4 relative">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitStatus();
              }}
              className="w-full px-4 mx-auto max-w-3xl"
            >
              <div className="flex flex-wrap -mx-3">
                <div className="w-full relative px-3">
                  <div className="absolute -top-6 tracking-wide text-red-500 text-sm font-medium mb-2">
                    {errMsg}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                  <label
                    className="block tracking-wide text-gray-400 text-md font-medium mb-2"
                    htmlFor="mobile-number"
                  >
                    Mobile Number
                  </label>
                  <Input
                    value={mobile}
                    onChange={setMobile}
                    onBlur={(e) => {
                      checkCustomer();
                    }}
                    setRef={mobileRef}
                    id="mobile-number"
                    type="number"
                    placeholder="Mobile number daale"
                    customClass="placeholder:text-slate-500"
                    clearInput={{
                      show: true,
                      customClass: "-top-0.5 right-3",
                    }}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block tracking-wide text-gray-400 text-md font-medium mb-2"
                    htmlFor="customer-name"
                  >
                    Customer Name
                  </label>
                  <Input
                    value={cName}
                    onChange={setCName}
                    setRef={cNameRef}
                    id="customer-name"
                    type="text"
                    placeholder="Customer ka pura naam"
                    customClass="placeholder:text-slate-500"
                    clearInput={{
                      show: true,
                      customClass: "-top-0.5 right-3",
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block tracking-wide text-gray-400 text-md font-medium mb-2"
                    htmlFor="item-name"
                  >
                    Item Name
                  </label>
                  <Input
                    value={itemName}
                    onChange={setItemName}
                    setRef={itemNameRef}
                    id="item-name"
                    type="text"
                    placeholder="Product ka naam"
                    customClass="placeholder:text-slate-500"
                    clearInput={{
                      show: true,
                      customClass: "-top-0.5 right-3",
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block tracking-wide text-gray-400 text-md font-medium mb-2"
                    htmlFor="customer-address"
                  >
                    Customer Address
                  </label>
                  <Input
                    value={cAddress}
                    onChange={setCAddress}
                    setRef={cAddressRef}
                    id="customer-address"
                    type="text"
                    placeholder="Customer ke ghar ka pata daale"
                    customClass="placeholder:text-slate-500"
                    clearInput={{
                      show: true,
                      customClass: "-top-0.5 right-3",
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                  <label
                    className="block tracking-wide text-gray-400 text-md font-medium mb-2"
                    htmlFor="dop"
                  >
                    Date of Purchase
                  </label>
                  <Input
                    value={dop}
                    readOnly={true}
                    id="dop"
                    type="text"
                    customClass="text-slate-400"
                    clearInput={{
                      show: false,
                    }}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block tracking-wide text-gray-400 text-md font-medium mb-2"
                    htmlFor="peroid"
                  >
                    Warranty Peroid {"("} in month {")"}
                  </label>
                  <Input
                    value={period}
                    onChange={setPeriod}
                    setRef={periodRef}
                    id="peroid"
                    type="number"
                    placeholder="Kitne mahine ka warranty "
                    customClass="placeholder:text-slate-500"
                    clearInput={{
                      show: true,
                      customClass: "-top-0.5 right-3",
                    }}
                  />
                </div>
              </div>

              {/* Image */}
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <div className="flex gap-4 items-center">
                    <div className="relative">
                      <label
                        ref={imgRef}
                        htmlFor="files"
                        className="group flex items-center justify-center gap-4 text-lg text-slate-300 hover:text-teal-400 font-medium cursor-pointer transition-all"
                      >
                        {imgSrc?.length < 1 ? (
                          <React.Fragment>
                            <i className="fa-solid fa-image w-4 hidden group-hover:block text-teal-500 transition-all duration-500"></i>
                            <i className="fa-solid fa-plus w-4 group-hover:hidden text-teal-500 transition-all duration-500"></i>
                            Add a image
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
                        ref={imgInputRef}
                        onChange={changeFile}
                        id="files"
                        accept="image/png, image/jpeg, image/jpg"
                        className="hidden"
                      />
                    </div>
                    {imgSrc?.length > 1 && (
                      <div className="flex items-center gap-4">
                        <span className="w-0.5 h-4 bg-teal-400"></span>
                        <div
                          onClick={() => {
                            setImgFile(null);
                            setImgSrc("");
                            imgInputRef.current.value = null;
                          }}
                          className="text-slate-300 hover:text-red-400 text-lg font-medium cursor-pointer transition-all"
                        >
                          Delete
                        </div>

                        <img
                          title={"product image"}
                          alt={"product image"}
                          src={imgSrc}
                          className="w-16 aspect-square object-cover ml-4 rounded"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block tracking-wide text-gray-400 text-md font-medium mb-2"
                    htmlFor="comments"
                  >
                    Instructions {"("} Validity {")"}
                  </label>
                  <Input
                    value={comments}
                    onChange={setComments}
                    setRef={commentsRef}
                    id="comments"
                    type="text"
                    placeholder="Kis chiz ka gurranty hoga?"
                    customClass="placeholder:text-slate-500"
                    clearInput={{
                      show: true,
                      customClass: "-top-0.5 right-3",
                    }}
                  />
                  <p className="mt-2 text-slate-500">
                    Seperate with commas {"("} , {")"} for multiple entries.
                  </p>
                </div>
              </div>
              {/* Loader */}
              {loader && (
                <div className="w-full px-3 -mx-3 mb-4">
                  <LoaderFull />
                </div>
              )}
              <div className="flex gap-6 justify-end items-center px-3 -mx-3 mb-4">
                <button
                  type="reset"
                  ref={resetBtnRef}
                  onClick={() => {
                    resetFields();
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="flex gap-3 items-center justify-center text-white font-semibold tracking-wide bg-slate-700 hover:bg-slate-800 border-0 py-2 px-6 focus:outline-none transition-all rounded text-lg"
                >
                  <i className="fa-solid fa-xmark"></i>
                  Reset
                </button>
                <button
                  type="submit"
                  className="flex gap-3 items-center justify-center text-white font-semibold tracking-wide bg-teal-600 hover:bg-teal-700 border-0 py-2 px-6 focus:outline-none transition-all rounded text-lg"
                >
                  <i className="fa-solid fa-check"></i>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
