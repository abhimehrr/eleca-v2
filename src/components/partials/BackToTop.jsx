import { useEffect, useState } from "react";

export default function BackToTop() {
  const [showBtn, setShowBtn] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (document.documentElement.scrollTop > 200) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    });
  }, []);

  return (
    <>
      {showBtn && (
        <div
          onClick={scrollToTop}
          title="Back to Top"
          className="fixed bottom-5 right-5 mt-5 h-8 w-8 hover:bg-teal-600 cursor-pointer transition-all bg-teal-500 rounded flex items-center justify-center"
        >
          <i className="fa-solid fa-arrow-up"></i>
        </div>
      )}
    </>
  );
}
