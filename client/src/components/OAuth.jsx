import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../config/firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

export default function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log("Cannot login with google", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 rounded-lg text-white uppercase p-3 hover:opacity-95 disabled:opacity-80"
    >
      Continue with google
    </button>
  );
}
