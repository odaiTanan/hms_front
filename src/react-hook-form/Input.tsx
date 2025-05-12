import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  type?: React.HTMLInputTypeAttribute;
  id: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  label?: string;
  error?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = <T extends FieldValues>({
  type = "text",
  id,
  name,
  register,
  label,
  className,
  error,
  ...rest
}: InputProps<T>) => {
  return (
    <div className="mb-4">
      {
        <label
          htmlFor={id}
          className="block text-sm font-medium  md:text-gray-400"
        >
          <p className="text-primary">{label}</p>
        </label>
      }
      <input
        type={type}
        id={id}
        {...register(name)}
        className={` shadow-[inset_0_0_2px_1px_#555555] focus:shadow-none focus:ring-2 focus:ring-blue-400
          mt-1 block  rounded-md  outline-none
        p-1
          ${error ? "focus:ring-red-500" : ""}
          ${className || "w-full"}
        `}
        {...rest}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
