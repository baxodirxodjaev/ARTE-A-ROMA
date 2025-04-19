import { useNavigate } from "react-router-dom";
import { loginWithEmail } from "../services/authService";
import LoginForm from "../components/LoginForm";
import { toast } from "react-toastify";
import { AuthFormInput } from "../types";

const Login = () => {
  const navigate = useNavigate();

  const onSubmit = async (data: AuthFormInput) => {
    const user = await loginWithEmail(data.email, data.password);
    if (user) {
      toast.success("Successful Login!", { position: "top-right" });
      navigate("/");
    } else {
      toast.error("Error logging in!", { position: "top-right" });
    }
  };

  return <LoginForm isSignup={false} onSubmit={onSubmit}/>
};

export default Login;
