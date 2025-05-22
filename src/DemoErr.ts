import { toast } from "react-toastify";
export const demo = () => {
  const id = "demo-error";
  if (!toast.isActive(id)) {
    toast.error(`can't do that in live demo`, {
      toastId: id,
      className: "text-primary dark:bg-gray-800",
    });
  }
};
