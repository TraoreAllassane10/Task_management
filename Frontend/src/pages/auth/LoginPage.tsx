import { Link, useNavigate } from "react-router-dom";
import lefSideImage from "../../assets/leftSideImage.png";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useFlow } from "fractostate";
import { UserFlow } from "../../flows/userFlow";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [userState, { actions: userActions }] = useFlow(UserFlow);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const user = await userActions.login(email, password);

    setEmail("");
    setPassword("");

    if (user) {
      if (user.role === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/member/dashboard");
      }
    }
  };

  return (
    <div className="flex h-screen w-full bg-white">
      <div className="w-full hidden md:inline-block">
        <img className="h-full" src={lefSideImage} alt="leftSideImage" />
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="md:w-96 w-80 flex flex-col items-center justify-center"
        >
          <h2 className="text-4xl text-gray-900 font-medium">Connectez-vous</h2>
          <p className="text-sm text-gray-500/90 mt-3">
            Ravi de vous revoir! connectez-vous svp
          </p>

          <button
            type="button"
            className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full"
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="googleLogo"
            />
          </button>

          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="w-full text-nowrap text-sm text-gray-500/90">
              ou avec email
            </p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div>

          {userState.error && (<span className="text-sm text-red-500 mb-2">{userState.error}</span>)}

          <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                fill="#6B7280"
              />
            </svg>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
            />
          </div>

          <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <svg
              width="13"
              height="17"
              viewBox="0 0 13 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                fill="#6B7280"
              />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              required
            />

            <button type="button" onClick={() => setShowPassword((v) => !v)}>
              {showPassword ? (
                <EyeOff className="mx-2 text-gray-500/80" />
              ) : (
                <Eye className="mx-2 text-gray-500/80" />
              )}
            </button>
          </div>

          <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
            <div className="flex items-center gap-2">
              <input className="h-5" type="checkbox" id="checkbox" />
              <label className="text-sm" htmlFor="checkbox">
                Se souvenir de moi
              </label>
            </div>
            <a className="text-sm underline" href="#">
              Mot de passe oublié?
            </a>
          </div>

          <button
            type="submit"
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity flex items-center justify-center"
            disabled={userState.isLoading}
          >
            {userState.isLoading ? (
              <Loader2 className="animate-spin text-white mr-2" />
            ) : (
              "Connexion"
            )}
          </button>
          <p className="text-gray-500/90 text-sm mt-4">
            N'avez-vous pas de compte?{" "}
            <Link to="/register" className="text-indigo-400 hover:underline">
              inscrivez-vous
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
