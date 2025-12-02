import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import Loader from "../Findjobs/Loader";
import ButtonLoader from "../Loader/ButtonLoader";

function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [redirecting, setRedirecting] = useState(false);

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("FORM SENT TO BACKEND:", form);

        dispatch(loginUser(form)).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                setRedirecting(true);

                setTimeout(() => {
                    navigate("/find-jobs");
                }, 1500); // show loader for 1 second
            }
        });
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-mine-shaft-950 text-white">

            <form
                onSubmit={handleSubmit}
                className="
          bg-mine-shaft-900 mb-20 p-10 rounded-2xl w-[420px] border border-mine-shaft-800 
          shadow-xl transform transition-all duration-500 
          hover:scale-[1.03] hover:shadow-2xl hover:shadow-bright-sun-300/20
          animate-[fadeInUp_0.8s_ease-out]
        "
            >
                <h2 className="text-3xl font-bold mb-6 text-bright-sun-300 text-center">
                    Login
                </h2>

                {/* EMAIL */}
                <div className="mb-4">
                    <label className="text-sm text-mine-shaft-300">Email</label>
                    <input
                        type="email"
                        required
                        className="
              w-full p-3 bg-mine-shaft-800 rounded-lg 
              border border-mine-shaft-700 mt-1 
              transition-all duration-300 
              focus:ring-2 focus:ring-bright-sun-300 focus:border-bright-sun-300
            "
                        placeholder="Enter email"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>

                {/* PASSWORD */}
                <div className="mb-4 relative">
                    <label className="text-sm text-mine-shaft-300">Password</label>

                    <input
                        type={showPassword ? "text" : "password"}
                        required
                        className="
              w-full p-3 bg-mine-shaft-800 rounded-lg 
              border border-mine-shaft-700 mt-1 
              transition-all duration-300
              focus:ring-2 focus:ring-bright-sun-300 focus:border-bright-sun-300
            "
                        placeholder="Enter password"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />

                    <div
                        className="
              absolute right-3 top-10 cursor-pointer 
              text-mine-shaft-400 hover:text-bright-sun-300
              transition-all
            "
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                    </div>
                </div>

                {/* ERROR */}
                {error && (
                    <p className="text-red-400 text-sm mb-3 text-center animate-pulse">
                        {error}
                    </p>
                )}

                {/* LOGIN BUTTON + REDIRECTING LOADER */}
                <button
                    type="submit"
                    className="
    w-full bg-bright-sun-300 text-black py-3 rounded-lg font-semibold 
    transition-all duration-300 
    hover:bg-bright-sun-200 hover:scale-[1.03]
    active:scale-95
    shadow-md hover:shadow-bright-sun-400/30
    flex justify-center items-center
  "
                    disabled={loading || redirecting}
                >
                    {redirecting ? (
                        <div className="scale-50">
                            <ButtonLoader />
                        </div>
                    ) : loading ? (
                        "Logging in..."
                    ) : (
                        "Login"
                    )}
                </button>

                <p className="mt-4 text-sm text-center">
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        className="
              text-bright-sun-300 cursor-pointer 
              hover:text-bright-sun-200 transition-all
            "
                    >
                        Sign Up
                    </span>
                </p>
            </form>
        </div>
    );
}

export default LoginPage;
