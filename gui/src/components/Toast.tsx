import React from "react";

interface ToastProps {
    message: string;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
    React.useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-fade-in">
            {message}
        </div>
    );
};

export default Toast;