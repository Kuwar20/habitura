import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = {
  success: (message, options = {}) => {
    toast.success(message, {
      className: '!bg-coolsecondary !bg-opacity-20 p-4 rounded-md shadow-lg',
      bodyClassName: 'text-sm font-bold',
      ...options,
    });
  },
  error: (message, options = {}) => {
    toast.error(message, {
      className: '!bg-red-200 !text-secondary p-4 rounded-md shadow-lg',
      bodyClassName: 'text-sm font-bold',
      ...options,
    });
  },
  info: (message, options = {}) => {
    toast.info(message, {
      className: '!bg-coolsecondary !bg-opacity-20  p-4 rounded-md shadow-lg',
      bodyClassName: 'text-sm font-bold',
      ...options,
    });
  },
  warning: (message, options = {}) => {
    toast.warning(message, {
      className: 'bg-yellow-500 !bg-opacity-20  p-4 rounded-md shadow-lg',
      bodyClassName: 'text-sm font-bold',
      ...options,
    });
  },
  default: (message, options = {}) => {
    toast(message, {
      className: '!bg-coolsecondary !bg-opacity-20  p-4 rounded-md shadow-lg',
      bodyClassName: 'text-sm font-bold',
      ...options,
    });
  },
};

const ToastProvider = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light" 
      transition={Slide} 
    />
  );
};

export { Toast, ToastProvider };


