// SignUp.tsx
import { useNavigate } from "react-router-dom";
import { signUpWithEmail } from "../services/authService";
import LoginForm from "../components/LoginForm";
import { toast } from "react-toastify";
import { SignUpFormData } from "../types";

const SignUp = () => {
  const navigate = useNavigate();

  const onSubmit = async (data: SignUpFormData) => {
    const user = await signUpWithEmail(data.email, data.password, data.name);
    if (user) {
      toast.success("Account created successfully!", { position: "top-right" });
      navigate("/");
    } else {
      toast.error("Error creating account!", { position: "top-right" });
    }
  };

  return <LoginForm<SignUpFormData> isSignup={true} onSubmit={onSubmit} />;
};

export default SignUp;
