import { useNavigate } from "react-router-dom";
import Wave from "../components/ui/Wave";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full max-w-[2000px] h-screen max-h-[1000px] mx-auto z-50">
      <div className="h-full w-full bg-primaryBg text-primaryText flex flex-col justify-center items-center z-50">
        <h1 className="text-4xl z-50">Page Not Found</h1>
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="border-0 outline-none bg-[#00000010] text-black px-5 py-2 rounded-md mt-5  z-50 hover:bg-[#00000020] duration-300"
        >
          Go Back
        </button>
        <Wave className="absolute left-0 bottom-0" />
      </div>
    </section>
  );
};

export default NotFoundPage;
