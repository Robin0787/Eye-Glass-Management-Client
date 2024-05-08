/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { LuAsterisk } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import lens from "../../assets/banner/lens.png";
import Wave from "../../components/ui/Wave";
// import { addUser } from "../../redux/features/auth/authSlice";
// import { useAppDispatch } from "../../redux/hooks";
import { useState } from "react";
import toast from "react-hot-toast";
import ListDropdown from "../../components/ui/ListDropdown/ListDropdown";
import Spinner from "../../components/ui/Spinner";
import InputField from "../../components/ui/inputField/InputField";
import { userRoles } from "../../constant";
import { useRegisterUserMutation } from "../../redux/features/auth/authApi";
import { TUserRole } from "../../types";
import getErrorMessage from "../../utils/getErrorMessage";
import handleAPIRequest from "../../utils/handleAPIRequest";

export interface TRegisterUserData {
  firstName: string;
  lastName: string;
  email: string;
  role: TUserRole;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string>("");
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterUserData>();

  const handleRegister = async (data: TRegisterUserData) => {
    if (!role) {
      toast.error("Role is required");
      return;
    }
    data.role = role as TUserRole;
    const toastId = toast.loading("Creating user...");
    handleAPIRequest(registerUser, data, toastId, navigate, "/login");
  };

  const handleList = (value: string) => {
    setRole(value);
  };

  return (
    <div className="h-[calc(100vh-76px)] max-h-[1000px] w-full mx-auto bg-primaryBg text-primaryText flex justify-center items-center relative">
      <div className="w-full md:w-4/5 lg:w-3/5 mx-auto lg:-mt-14 z-10">
        <div className="w-full bg-inherit shadow-[1px_1px_10px_2px] shadow-black/20 rounded-xl px-10 py-12 ">
          <h1 className="text-center text-3xl font-bold pb-12 capitalize tracking-wider">
            Create Your Account
          </h1>
          <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-5">
            <div className="w-full lg:w-1/2 text-center space-y-5">
              <img src={lens} alt="lens" className="mx-auto w-1/2 lg:w-[80%]" />
              <p className="tracking-widest">
                Already have an account?{" "}
                <Link to={"/login"} className="tracking-wider font-bold">
                  Login
                </Link>
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <form className="w-full" onSubmit={handleSubmit(handleRegister)}>
                <div className="flex flex-col gap-5 justify-center items-center">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-5 w-full">
                    <div className="w-full md:w-1/2">
                      <InputField
                        type="text"
                        id="FirstNme"
                        label="FirstNme"
                        register={register("firstName", { required: true })}
                      />
                    </div>
                    <div className="w-full md:w-1/2">
                      <InputField
                        type="text"
                        id="LastName"
                        label="LastName"
                        register={register("lastName", { required: false })}
                      />
                    </div>
                  </div>
                  <InputField
                    type="text"
                    id="email"
                    label="Email"
                    register={register("email", { required: true })}
                  />
                  <div className="w-full">
                    <ListDropdown
                      items={userRoles}
                      handleList={handleList}
                      selected={role}
                      title="Role"
                      border="border border-gray-600 rounded-md"
                    />
                  </div>
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
                        "Register"
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

export default Register;
