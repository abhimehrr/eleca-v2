import { useState, useRef, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import QrCode from "qrcode";
import ClearInput from "../../components/partials/ClearInput";
import Input from "../../components/essentials/Input";

export default function Payment() {
  const [qrValue, setQrValue] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const amountRef = useRef();
  const messageRef = useRef();

  const amt = searchParams.get("amt") || "";
  const [amount, setAmount] = useState(amt);
  const [message, setMessage] = useState(searchParams.get("msg") || "");

  const generateQrCode = () => {
    if (amount.length < 1) {
      setErrMsg("Please enter amount");
      amountRef.current.classList.add("border-red-500");
      return;
    } else if (amount < 1) {
      setErrMsg("Enter amount more than RS 1");
      amountRef.current.classList.add("border-red-500");
      return;
    } else {
      setErrMsg("");
      amountRef.current.classList.remove("border-red-500");
    }

    if (message.length > 50) {
      setErrMsg("Message must be less than 50 characters.");
      messageRef.current.classList.add("border-red-500");
      return;
    } else {
      setErrMsg("");
      messageRef.current.classList.remove("border-red-500");
    }

    setSearchParams(`amt=${amount}&msg=${message}`);

    const baseURL = `upi://pay?pa=7361092810@okbizaxis&pn=Ashok%20Electronics&am=${amount}&tn=eleca:${message}`;

    QrCode.toDataURL(baseURL, (err, url) => {
      if (err) return;
      setQrValue(url);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateQrCode();
  };

  useEffect(() => {
    if (amt > 0) {
      generateQrCode();
    }
  }, []);

  return (
    <>
      <div className="my-10 py-14 max-sm:mx-4 bg-gray-900 rounded-lg text-gray-200">
        <div className="max-w-[500px] mx-auto p-10 sm:bg-gray-800 rounded-lg">
          <h1 className="title-font sm:text-3xl text-3xl text-center font-medium text-white">
            <span className="text-teal-500 font-bold">Make a Payment</span>
          </h1>

          <div className="mt-10 mb-2 w-full">
            <div className="mb-1 text-sms text-red-400">{errMsg}</div>
            <div className="flex items-center justify-centers flex-wrap gap-3">
              <form onSubmit={handleSubmit}>
                <div className="payment-field">
                  <div className="relative">
                    <Input
                      setRef={amountRef}
                      value={amount}
                      onChange={setAmount}
                      type="number"
                      placeholder="Amout"
                      clearInput={{
                        show: false,
                      }}
                    />
                  </div>
                  <div className="relatives">
                    <Input
                      setRef={messageRef}
                      value={message}
                      onChange={setMessage}
                      type="text"
                      placeholder="Message (Optional)"
                      clearInput={{
                        show: true,
                        customClass: "-top-0.5 right-3 text-gray-400",
                      }}
                    />
                  </div>
                </div>

                {qrValue.length > 1 && (
                  <div className="w-full">
                    <div className="w-48 flex relative justify-center my-6 mx-auto">
                      <img
                        className="w-full object-cover object-center rounded"
                        alt="payment qrcode"
                        src={qrValue}
                      />
                      <Link
                        to={qrValue}
                        download={`eleca-qr-code-RS-${amount}.png`}
                        className="absolute -bottom-4 -right-4 px-2 py-0.5 bg-teal-600 hover:bg-teal-500 transition-all rounded"
                      >
                        <i className="fa-solid fa-arrow-down"></i>
                      </Link>
                    </div>

                    <div className="mt-10 text-s text-center text-teal-500">
                      Scan QR to payment
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full mt-4 flex gap-2 items-center justify-center text-lg font-medium bg-teal-600 py-2 text-gray-900 hover:bg-teal-500 rounded transition-all"
                >
                  <i className="fa-solid fa-qrcode text-md"></i>
                  Generate QR Code
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
