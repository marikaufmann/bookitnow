import { Mail } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";
import { useQueryClient, useMutation } from "react-query";
import { RegisterFormData } from "../types";
import { useAppContext } from "../hooks/use-app-context";
import Loader from "../components/Loader";

const Register = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { mutate: registerUser, isLoading } = useMutation(apiClient.register, {
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
    onSuccess: async () => {
      showToast({ message: "Registered successfully!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate(state?.from?.pathname || "/");
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = handleSubmit((data) => {
    registerUser(data);
  });
  return (
    <div className="max-w-7xl w-full mx-auto flex-1 px-8">
      <div className="max-w-[400px] mx-auto flex flex-col gap-6 pt-40 h-screen">
        <div className="flex flex-col gap-2 ">
          <h1 className="text-title text-3xl md:text-4xl font-semibold ">
            Create an account
          </h1>
          <p className="text-secondary text-sm">Please provide your details.</p>
        </div>
        <form className="flex flex-col gap-4 " onSubmit={onSubmit}>
          <label htmlFor="firstName" className="relative flex flex-col gap-1">
            <h3 className="text-secondary text-sm font-semibold">First Name</h3>
            <input
              {...register("firstName", {
                required: "First name is required.",
              })}
              type="firstName"
              className="border w-[400px] border-gray-300 px-3 py-2 rounded-md text-sm"
              placeholder="First name"
            />
            {errors.firstName && (
              <span className="text-[#F56C6C] text-xs">
                {errors.firstName?.message}
              </span>
            )}
          </label>
          <label htmlFor="lastName" className="relative flex flex-col gap-1">
            <h3 className="text-secondary text-sm font-semibold">Last Name</h3>
            <input
              {...register("lastName", { required: "Last name is required." })}
              type="lastName"
              className="border w-[400px] border-gray-300 px-3 py-2 rounded-md text-sm"
              placeholder="Last name"
            />
            {errors.lastName && (
              <span className="text-[#F56C6C] text-xs">
                {errors.lastName?.message}
              </span>
            )}
          </label>
          <label htmlFor="email" className=" flex flex-col gap-1 relative ">
            <h3 className="text-secondary text-sm font-semibold">Email</h3>
            <div className="absolute w-8 flex items-center justify-center inset-y-0 z-20 text-gray-400 mt-6 ml-1">
              <Mail className="h-5 w-5 " />
            </div>
            <input
              {...register("email", { required: "Email is required." })}
              type="email"
              className="pl-9 relative  text-sm border w-[400px] border-gray-300 px-3 py-2 rounded-md"
              placeholder="Email address"
            />
          </label>
          {errors.email && (
            <span className="text-[#F56C6C] text-xs -mt-3">
              {errors.email?.message}
            </span>
          )}
          <label htmlFor="password" className="relative flex flex-col gap-1">
            <h3 className="text-secondary text-sm font-semibold">Password</h3>
            <input
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              className="border w-[400px] border-gray-300 px-3 py-2 rounded-md"
              placeholder="**************"
            />
            {errors.password && (
              <span className="text-[#F56C6C] text-xs">
                {errors.password?.message}
              </span>
            )}
          </label>
          <label htmlFor="password" className="relative flex flex-col gap-1">
            <h3 className="text-secondary text-sm font-semibold">
              Confirm password
            </h3>
            <input
              {...register("confirmPassword", {
                validate: (val) => {
                  if (!val) {
                    return "This field is required.";
                  } else if (watch("password") !== val) {
                    return "Your paswords don't match.";
                  }
                },
              })}
              type="password"
              className="border w-[400px] border-gray-300 px-3 py-2 rounded-md"
              placeholder="**************"
            />
            {errors.confirmPassword && (
              <span className="text-[#F56C6C] text-xs">
                {errors.confirmPassword?.message}
              </span>
            )}
          </label>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary flex justify-center items-center h-10 text-bg rounded-md py-2 w-[400px] px-3 mt-2 font-semibold disabled:bg-gray-400 hover:bg-primary/80"
          >
            {isLoading ? <Loader styles={"h-4 w-4"} /> : "Sign up"}
          </button>
          <p className="text-sm text-center text-secondary ">
            Already have an account?{" "}
            <Link to="/sign-in">
              <span className="underline underline-offset-4 text-title">
                Sign in.
              </span>
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
