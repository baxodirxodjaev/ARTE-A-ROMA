import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { motion } from "framer-motion";
import SignInWithGoogleButton from "./SignInWithGoogleButton";
import { Link } from "react-router-dom";
import PageNav from "./PageNav";
import { AuthFormInput } from "../types";


interface LoginFormProps {
  isSignup: boolean;
  onSubmit: (data: AuthFormInput) => Promise<void>;
}

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Wrong email").required("Email is required"),
  password: Yup.string().min(6, "Minimum 6 symbols").required("Password is required"),
});

const signupSchema = loginSchema.shape({
  name: Yup.string().required("Name is required"),
});

const LoginForm = ({ isSignup, onSubmit }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormInput>({
    resolver: yupResolver(isSignup ? signupSchema : loginSchema),
  });

  const submitHandler: SubmitHandler<AuthFormInput> = (data) => {
    onSubmit(data);
  };

  return (
    <section className="bg-slate-300 w-screen h-screen pt-[2rem] px-[1rem]">
      <div className="container mx-auto mb-[3rem]">
        <PageNav />
      </div>

      <motion.div
        className="max-w-md mx-auto p-8 border rounded-2xl shadow-2xl bg-white relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Background shapes */}
        <motion.div
          className="absolute -top-16 -left-16 w-40 h-40 bg-blue-400 rounded-full opacity-30"
          animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-16 -right-16 w-52 h-52 bg-purple-400 rounded-full opacity-20"
          animate={{ x: [0, -20, 0], y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <motion.h2
          className="text-3xl font-extrabold text-center mb-6 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {isSignup ? "Create Account" : "Welcome Back"}
        </motion.h2>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          {isSignup && (
            <div>
              <input
                {...register("name")}
                type="text"
                placeholder="Name"
                className="border p-3 w-full rounded focus:ring-2 focus:ring-blue-400"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
          )}

          <div>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="border p-3 w-full rounded focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="border p-3 w-full rounded focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg shadow-md"
          >
            {isSignup ? "Sign Up" : "Log In"}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          {isSignup ? (
            <>
              Already have an account?{" "} <br />
              <Link to="/login" className="text-blue-500 underline">
                Log in
              </Link>
            </>
          ) : (
            <>
              Don’t have an account?{" "} <br />
              <Link to="/signup" className="text-blue-500 underline">
                Sign up
              </Link>
            </>
          )}
        </p>

        <div className="mt-4">
          <SignInWithGoogleButton />
        </div>
      </motion.div>
    </section>
  );
};

export default LoginForm;
