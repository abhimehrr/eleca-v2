import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../../store/slices/admin";

// Components
import Input from "../../essentials/Input";
import { Toast } from "../toast/Dialog";
import { LoaderFull } from "../loader/Loader";
import { useFetch } from "../../../utils/fetch";

export default function UpdateProduct({ id, closeModal }) {
  const { token, priceList } = useSelector((s) => s.admin);
  const dispatch = useDispatch();

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

  // Update Product
  const handleUpdateProduct = async () => {
    if (!validateForm()) return;
    setLoader(true);

    const data = await useFetch("admin/update-product", {
      method: "POST",
      authtoken: token,
      body: {
        id,
        product,
        productId,
        mrp,
        rlp,
      },
    });

    if (data.data) {
      setToast({
        title: "Success",
        msg: "Product updated successfully...",
      });
      setLoader(false);
      setTimeout(() => {
        setToast(false);
        closeModal(false);
      }, 2000);

      dispatch(
        updateProduct({
          ID: id,
          product,
          productId,
          mrp,
          rlp,
        })
      );

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

  useEffect(() => {
    var product = priceList.filter((p) => p.ID === id)[0];
    if (product) {
      setProduct(product.product);
      setRlp(product.rlp);
      setMrp(product.mrp);
      setProductId(product.productId);
    }
  }, []);

  return (
    <div className="relative text-gray-200">
      {/* Set Toast */}
      {toast && <Toast title={toast.title} children={toast.msg} />}

      <section className="text-gray-300">
        <div className="mx-auto flex flex-col justify-center items-center">
          <div className="w-full relative">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateProduct();
              }}
              className="w-full px-4 mx-auto max-w-3xl"
            >
              <div className="flex flex-wrap mt-6 -mx-3">
                <div className="w-full relative">
                  <div className="absolute -top-6 tracking-wide text-red-400 text-sm font-medium mb-2">
                    {errMsg}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full">
                  <label
                    className="block text-left tracking-wide text-md font-medium mb-2"
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
                    customClass="placeholder:text-slate-400"
                    clearInput={{
                      show: true,
                      customClass: "-top-0.5 right-3",
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 -mx-3 mb-4">
                <div className="w-full">
                  <label
                    className="block text-left tracking-wide text-md font-medium mb-2"
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
                    customClass="placeholder:text-slate-400"
                    clearInput={{
                      show: true,
                      customClass: "-top-0.5 right-3",
                    }}
                  />
                </div>
                <div className="w-full">
                  <label
                    className="block text-left tracking-wide text-md font-medium mb-2"
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
                    customClass="placeholder:text-slate-400"
                    clearInput={{
                      show: true,
                      customClass: "-top-0.5 right-3",
                    }}
                  />
                </div>
                <div className="w-full">
                  <label
                    className="block text-left tracking-wide text-md font-medium mb-2"
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
                    placeholder="Optional"
                    customClass="placeholder:text-slate-400"
                    clearInput={{
                      show: true,
                      customClass: "-top-0.5 right-3",
                    }}
                  />
                </div>
              </div>

              {/* Loader */}
              {loader && (
                <div className="w-full -mx-3">
                  <LoaderFull />
                </div>
              )}
              <div className="flex gap-6 justify-end items-center -mx-3 mt-4 mb-2">
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
