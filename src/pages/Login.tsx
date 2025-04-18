import { useNavigate } from "react-router-dom";
import { loginWithEmail } from "../services/authService";
import LoginForm from "../components/LoginForm";
import { toast } from "react-toastify";
import { LoginFormData } from "../types";

const Login = () => {
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    const user = await loginWithEmail(data.email, data.password);
    if (user) {
      toast.success("Successful Login!", { position: "top-right" });
      navigate("/");
    } else {
      toast.error("Error logging in!", { position: "top-right" });
    }
  };

  return <LoginForm<LoginFormData> isSignup={false} onSubmit={onSubmit}/>
};

export default Login;
