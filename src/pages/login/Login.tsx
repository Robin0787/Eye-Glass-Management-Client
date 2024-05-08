/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LuAsterisk } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import lens from "../../assets/banner/lens.png";
import Wave from "../../components/ui/Wave";

import Spinner from "../../components/ui/Spinner";
import InputField from "../../components/ui/inputField/InputField";
import {
  TLoginInfo,
  useLoginUserMutation,
} from "../../redux/features/auth/authApi";
import { TUser, setToken, setUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import getErrorMessage from "../../utils/getErrorMessage";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginInfo>();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleLogin = async (data: TLoginInfo) => {
    try {
      const res = await loginUser(data).unwrap();
      const token: string = res?.data?.access_token;
      if (token) {
        toast.success(res.message || "User logged in successfully");
        // Getting user info using token
        const decoded: TUser = jwtDecode(token) as TUser;
        // Setting user info in redux store
        dispatch(setUser(decoded));
        dispatch(setToken(token));
        navigate("/");
      } else {
        toast("Something went wrong!");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="h-[calc(100vh-76px)] max-h-[1000px] w-full mx-auto bg-primaryBg text-primaryText flex justify-center items-center relative">
      <div className="w-full md:w-4/5 lg:w-3/5 mx-auto lg:-mt-14 z-10">
        <div className="w-full bg-inherit shadow-[1px_1px_10px_2px] shadow-black/20 rounded-xl px-10 py-12">
          <h1 className="text-center text-3xl font-bold pb-12 capitalize tracking-wider">
            Login To Your Account
          </h1>
          <div className="w-full flex flex-col md:flex-row justify-center items-center gap-5">
            <div className="w-full lg:w-1/2 text-center space-y-5">
              <img src={lens} alt="lens" className="mx-auto w-[80%]" />
              <p className="tracking-widest">
                Don't have any account?{" "}
                <Link to={"/register"} className="tracking-wider font-bold">
                  Register
                </Link>
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="flex flex-col gap-5 justify-center items-center">
                  <InputField
                    type="text"
                    id="email"
                    label="Email"
                    register={register("email", { required: true })}
                  />
                  <InputField
                    type="password"
                    id="password"
                    label="Password"
                    register={register("password", { required: true })}
                  />
                  <div className=" w-full relative mt-4">
                    {Object.values(errors).length > 0 && (
                      <div className="absolute -top-7 left-0 flex justify-start items-center gap-1">
                        <LuAsterisk size={13} />
                        <span className="text-sm text-start tracking-wider">
                          {getErrorMessage(errors)}
                        </span>
                      </div>
                    )}
                    <button
                      className="btn flex justify-center items-center"
                      type="submit"
                    >
                      {isLoading ? (
                        <Spinner size={24} className="text-gray-700" />
                      ) : (
                        "Login"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Wave className="absolute left-0 bottom-0 z-0" />
    </div>
  );
};

export default Login;
