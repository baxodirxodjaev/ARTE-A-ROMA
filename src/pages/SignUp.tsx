import { useNavigate } from "react-router-dom";
import { signUpWithEmail } from "../services/authService";
import LoginForm from "../components/LoginForm";
import { toast } from "react-toastify";
import { AuthFormInput } from "../types";

const SignUp = () => {
  const navigate = useNavigate();

  const onSubmit = async (data: AuthFormInput) => {
    if (!data.name) {
      toast.error("Name is required", { position: "top-right" });
      return;
    }

    const user = await signUpWithEmail(data.email, data.password, data.name);
    if (user) {
      toast.success("Account created successfully!", { position: "top-right" });
      navigate("/");
    } else {
      toast.error("Error creating account!", { position: "top-right" });
    }
  };

  return <LoginForm isSignup={true} onSubmit={onSubmit} />;
};

export default SignUp;
