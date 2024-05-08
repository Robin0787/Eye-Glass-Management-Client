import { ImSpinner9 } from "react-icons/im";

interface TSpinnerProps {
  size: number;
  className?: string;
}

const Spinner = ({ size = 20, className }: TSpinnerProps) => {
  return (
    <ImSpinner9
      size={size}
      className={`animate-spin duration-200 ${className}`}
    />
  );
};

export default Spinner;
