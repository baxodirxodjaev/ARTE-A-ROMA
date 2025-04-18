import { signInWithGoogle } from '../services/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignInWithGoogleButton = () => {

  const navigate = useNavigate();


  return (
        <button onClick={async () => {
            const user = await signInWithGoogle();
            if (user) {
              toast.success(" Successfully signed in with Google!", { position: "top-right" });
              navigate("/");
            } else {
              toast.error(" Failed to log in with Google!", { position: "top-right" });
            }
          }} className="w-full bg-red-500 text-white px-4 py-2 rounded">
              Sign in with Google
          </button>
  )
}

export default SignInWithGoogleButton