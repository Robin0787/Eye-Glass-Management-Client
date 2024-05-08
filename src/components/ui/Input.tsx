/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState } from "react";
import { FieldPath, FieldValues } from "react-hook-form";

import { IoEye, IoEyeOff } from "react-icons/io5";

type RegisterOptions<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>;
  // Other optional properties
};

interface TInputProps {
  type: string;
  id: string;
  name?: string;
  placeholder?: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
  register?: RegisterOptions;
  defaultValue?: any;
}

const Input = ({
  type,
  id,
  name,
  placeholder,
  className = "input",
  defaultValue,
  onChange,
  onFocus,
  register,
  ...props
}: TInputProps) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showEye, setShowEye] = useState<boolean>(false);

  if (type === "password") {
    return (
      <div className="w-full relative">
        <input
          type={showPass ? "text" : type}
          id={id}
          name={name}
          placeholder={placeholder}
          className={className}
          autoComplete="off"
          defaultValue={defaultValue}
          onChange={onChange}
          onFocus={() => {
            setShowEye(true);
          }}
          onBlur={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.value.length == 0) {
              setShowEye(false);
            }
          }}
          {...register}
          {...props}
        />
        <div className="absolute right-0 top-0 h-full flex justify-center items-center p-1 overflow-hidden text-gray-800">
          {showEye && (
            <div
              className="bg-transparent hover:bg-white/20 p-2 rounded-full duration-300 cursor-pointer"
              onClick={() => {
                setShowPass((prev: boolean) => !prev);
              }}
            >
              {showPass ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <input
      type={showPass ? "text" : type}
      id={id}
      name={name}
      placeholder={placeholder}
      className={className}
      autoComplete="off"
      defaultValue={defaultValue}
      onChange={onChange}
      onFocus={onFocus}
      {...register}
      {...props}
    />
  );
};

export default Input;
