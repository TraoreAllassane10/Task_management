import { Navigate, useNavigate } from "react-router-dom";
import lefSideImage from "../../assets/leftSideImage.png";
import { Eye, EyeOff, Key, Loader2, User } from "lucide-react";
import AvatarFileUpload from "../../components/AvatarFileUpload";
import { useState, type FormEvent } from "react";
import { useFlow } from "fractostate";
import { UserFlow } from "../../flows/userFlow";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [code_invitation, setCodeInvitation] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [userState, { actions: userActions }] = useFlow(UserFlow);

  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (photo && !(photo instanceof File)) {
      console.error("Photo invalide");
      return;
    }

    const formData = new FormData();
    
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("code_invitation", code_invitation);
    if (photo) {
      formData.append("photo", photo);
    }

    const user = await userActions.register(formData);

    if (user) {
      toast.success("Compte crée avec success!");
      navigate("/");
    }
  };

  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/member/dashboard" />;
  }

  return (
    <div className="flex h-screen w-full bg-white">
      <div className="w-full hidden md:inline-block">
        <img className="h-full" src={lefSideImage} alt="leftSideImage" />
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <form
          onSubmit={handleRegister}
          className="md:w-96 w-80 flex flex-col items-center justify-center"
          encType="multipart/form-data"
        >
          <h2 className="text-4xl text-gray-900 font-medium">Inscrivez-vous</h2>
          <p className="text-sm text-gray-500/90 mt-3">
            Entrer vos informations pour la creation de votre compte
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

          <div className="flex items-center my-2">
            <AvatarFileUpload setPhoto={setPhoto} />
          </div>

          {/* Nom et Email */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <User className="text-gray-500/80" />
              <input
                type="text"
                placeholder="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
              />
            </div>

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
          </div>

          {/* Mot de passe et code d'invitation */}
          <div className="grid grid-cols-2 gap-2">
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

            <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <Key className="text-gray-500/80" />
              <input
                type="text"
                placeholder="Code d'invitation"
                value={code_invitation}
                onChange={(e) => setCodeInvitation(e.target.value)}
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
              />
            </div>
          </div>

          {userState.error && (
            <span className="text-sm text-red-500 my-2">{userState.error}</span>
          )}

          <button
            type="submit"
            disabled={userState.isLoading}
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity flex items-center justify-center"
          >
            {userState.isLoading ? (
              <Loader2 className="animate-spin text-white mr-2" />
            ) : (
              "Inscription"
            )}
          </button>
          <p className="text-gray-500/90 text-sm mt-4">
            Avez-vous un compte?{" "}
            <a href="/" className="text-indigo-400 hover:underline">
              connectez-vous
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
