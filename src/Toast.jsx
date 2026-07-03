import { toast } from "react-toastify";

function Toast(type, text, options = {}) {
  return toast[type](text, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "dark",
    ...options,
  });
}

export default Toast;
