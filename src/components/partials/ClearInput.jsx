export default function ClearInput({ clear, customClass, focus }) {

  const handleClick = () => {
    clear("");
    if (focus) {
      focus();
    }
  };
  return (
    <i
      onClick={handleClick}
      className={`fa-solid fa-xmark text-xl font-bold cursor-pointer hover:text-red-500 absolute ${customClass} transition-all rounded`}
    ></i>
  );
}
