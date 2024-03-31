import { Mail } from "lucide-react";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import { useAppContext } from "../hooks/use-app-context";
import { useForm } from "react-hook-form";
import { SignInFormData } from "../types";
const SignIn = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const { mutate: signIn } = useMutation(apiClient.signIn, {
    onError: (err: Error) => {
      showToast({ message: err.message, type: "ERROR" });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Signed in!", type: "SUCCESS" });
      navigate("/");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = handleSubmit((data) => signIn(data));
  return (
    <div className="max-w-7xl w-full mx-auto flex-1 px-8">
      <div className="max-w-[400px] mx-auto flex flex-col gap-6 pt-40 h-screen">
        <div className="flex flex-col gap-2 ">
          <h1 className="text-title text-3xl md:text-4xl font-semibold ">
            Sign in
          </h1>
          <p className="text-secondary text-sm">
            Welcome back! Please enter your details.
          </p>
        </div>
        <form className="flex flex-col gap-4 " onSubmit={onSubmit}>
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
          <button className="bg-primary text-bg rounded-md py-2 w-[400px] px-3 mt-2 font-semibold hover:bg-primary/80">
            Sign in
          </button>
          <p className="text-sm text-center text-secondary ">
            Don't have an account?{" "}
            <Link to="/register">
              <span className="underline underline-offset-4 text-title">
                Sign up.
              </span>
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
