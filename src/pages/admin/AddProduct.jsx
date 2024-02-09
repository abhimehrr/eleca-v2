import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

// Components
import Input from "../../components/essentials/Input";
import { Toast } from "../../components/partials/toast/Dialog";
import { LoaderFull } from "../../components/partials/loader/Loader";
import { useFetch } from "../../utils/fetch";

export default function AddProduct() {
  const { token } = useSelector((s) => s.admin);

  // Loaders
  const [toast, setToast] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [product, setProduct] = useState("");
  const [rlp, setRlp] = useState("");
  const [mrp, setMrp] = useState("");
  const [productId, setProductId] = useState("");

  // Ref
  const productRef = useRef(null);
  const rlpRef = useRef(null);
  const mrpRef = useRef(null);
  const prodcutIdRef = useRef(null);
  const resetBtnRef = useRef(null);

  // Add New Product
  const handleAddProduct = async () => {
    if (!validateForm()) return;
    setLoader(true);

    const data = await useFetch("admin/add-product", {
      method: "POST",
      authtoken: token,
      body: {
        product,
        productId,
        mrp,
        rlp,
      },
    });

    if (data.data) {
      setToast({
        title: "Success",
        msg: "Product added successfully...",
      });
      setLoader(false);
      setTimeout(() => {
        setToast(false);
      }, 4000);

      resetBtnRef.current.click();
    }
  };

  // Reset Values
  const resetValues = () => {
    setProduct("");
    setRlp("");
    setMrp("");
    setProductId("");
  };

  // Validate Form
  const validateForm = () => {
    if (product.length < 1) {
      productRef.current.classList.add("border-red-500");
      setErrMsg("Enter product name");
      return false;
    } else {
      productRef.current.classList.remove("border-red-500");
      setErrMsg("");
    }
    if (rlp < 1) {
      rlpRef.current.classList.add("border-red-500");
      setErrMsg("Please enter RLP");
      return false;
    } else {
      rlpRef.current.classList.remove("border-red-500");
      setErrMsg("");
    }
    if (mrp < 1) {
      mrpRef.current.classList.add("border-red-500");
      setErrMsg("Please enter MRP");
      return false;
    } else {
      mrpRef.current.classList.remove("border-red-500");
      setErrMsg("");
    }
    return true;
  };

  return (
    <div className="relative py-8 px-2 max-sm:mx-2 bg-gray-900 rounded-lg text-gray-200">
      {/* Set Toast */}
      {toast && <Toast title={toast.title} children={toast.msg} />}

      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="mx-auto flex flex-col justify-center items-center">
          <div className="flex flex-col items-center">
            <h1 className="title-font sm:text-3xl text-3xl tracking-wider mb-4 font-bold text-teal-500">
              Add a new product
            </h1>
          </div>
          <div className="w-full mt-4 relative">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddProduct();
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
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-1 sm:px-3">
                  <label
                    className="block tracking-wide text-gray-400 text-md font-medium mb-2"
                    htmlFor="item-name"
                  >
                    Item Name
                  </label>
                  <Input
                    value={product}
                    onChange={setProduct}
                    setRef={productRef}
                    id="item-name"
                    type="text"
                    isFocus={true}
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
                <div className="w-1/3 px-1 sm:px-3">
                  <label
                    className="block tracking-wide text-gray-400 text-md font-medium mb-2"
                    htmlFor="rlp"
                  >
                    RLP
                  </label>
                  <Input
                    value={rlp}
                    onChange={setRlp}
                    setRef={rlpRef}
                    id="rlp"
                    type="number"
                    placeholder="RLP"
                    customClass="placeholder:text-slate-500"
                    clearInput={{
                      show: true,
                      customClass: "-top-0.5 right-3",
                    }}
                  />
                </div>
                <div className="w-1/3 px-1 sm:px-3">
                  <label
                    className="block tracking-wide text-gray-400 text-md font-medium mb-2"
                    htmlFor="mrp"
                  >
                    MRP
                  </label>
                  <Input
                    value={mrp}
                    onChange={setMrp}
                    setRef={mrpRef}
                    id="mrp"
                    type="number"
                    placeholder="MRP"
                    customClass="placeholder:text-slate-500"
                    clearInput={{
                      show: true,
                      customClass: "-top-0.5 right-3",
                    }}
                  />
                </div>
                <div className="w-1/3 px-1 sm:px-3">
                  <label
                    className="block tracking-wide text-gray-400 text-md font-medium mb-2"
                    htmlFor="product-id"
                  >
                    Product Id
                  </label>
                  <Input
                    value={productId}
                    onChange={setProductId}
                    setRef={prodcutIdRef}
                    id="product-id"
                    type="text"
                    placeholder="Product Id (Optional)"
                    customClass="placeholder:text-slate-500"
                    clearInput={{
                      show: true,
                      customClass: "-top-0.5 right-3",
                    }}
                  />
                </div>
              </div>

              {/* Loader */}
              {loader && (
                <div className="w-full absolute px-1 sm:px-3 -mx-3">
                  <LoaderFull />
                </div>
              )}
              <div className="flex gap-6 justify-end items-center px-1 sm:px-3 -mx-3 mt-10 mb-2">
                <button
                  type="reset"
                  ref={resetBtnRef}
                  onClick={() => {
                    resetValues();
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
