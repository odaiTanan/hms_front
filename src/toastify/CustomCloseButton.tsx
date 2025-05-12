type Props = {
  closeToast: () => void;
};
export const CustomCloseButton = ({ closeToast }: Props) => (
  <button
    onClick={closeToast}
    className="absolute top-2 right-3 text-gray-500 dark:text-gray-300  text-md bg-transparent border-none cursor-pointer"
  >
    ✕
  </button>
);
