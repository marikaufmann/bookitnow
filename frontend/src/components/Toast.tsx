import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};
const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);
  const styles =
    type === "SUCCESS"
      ? "fixed bottom-4 right-4 py-4 px-6 bg-[#F0F9EB] text-[#67C23A] w-[300px] rounded-md shadow-lg "
      : "fixed bottom-4 right-4 py-4 px-6 bg-[#FEF0F0] text-[#F56C6C] w-[350px] rounded-md shadow-lg ";
  return (
    <div className={styles}>
      {type === "ERROR" ? (
        <div className="flex gap-4">
          <AlertCircle className="w-6 h-6 text-[#F56C6C]" />
          <span className="font-semibold">{message}</span>
        </div>
      ) : (
        <div className="flex gap-4">
          <CheckCircle2 className="w-6 h-6 text-[#67C23A]" />
          <span className="font-semibold">{message}</span>
        </div>
      )}
    </div>
  );
};

export default Toast;
