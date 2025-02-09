import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

function SignUpPage() {
    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-[url('../assets/images/heroPicture.jpg')] bg-no-repeat bg-cover bg-center">
            <div className="w-full max-w-[420px] bg-transparent text-red backdrop-blur-[50px] border border-[rgba(255,255,255,0.2)] px-8 py-10 rounded-[20px] shadow-[0_7px_10px_rgba(255,255,255,0.5)]">
                <img src={logo} className="h-auto w-[50%] mx-auto mb-6" alt="Logo" />
                <form action="">
                    <h1 className="font-bold text-center text-[28px] md:text-[36px] text-secondary mb-6">Création du compte</h1>
                    <div className="relative w-full h-[50px] mb-2">
                        <input
                            className="placeholder-gray-100 w-full h-full bg-transparent outline-none border-[2px] border-gray-500  rounded-[40px] text-secondary text-[16px] px-6 py-2"
                            type="text"
                            placeholder="Nom"
                            required
                        />
                    </div>
                    <div className="relative w-full h-[50px] mb-2">
                        <input
                            className="placeholder-gray-100 w-full h-full bg-transparent outline-none border-[2px] border-gray-500  rounded-[40px] text-secondary text-[16px] px-6 py-2"
                            type="text"
                            placeholder="Prénom"
                            required
                        />
                    </div>
                    <div className="relative w-full h-[50px] mb-2">
                        <input
                            className="placeholder-gray-100 w-full h-full bg-transparent outline-none border-[2px] border-gray-500  rounded-[40px] text-secondary text-[16px] px-6 py-2"
                            type="email"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="relative w-full h-[50px] mb-2">
                        <input
                            className="placeholder-gray-100 w-full h-full bg-transparent outline-none border-[2px] border-gray-500  rounded-[40px] text-secondary text-[16px] px-6 py-2"
                            type="password"
                            placeholder="Mot de passe"
                            required
                        />
                    </div>
                    <div className="relative w-full h-[50px] mb-2">
                        <input
                            className="placeholder-gray-100 w-full h-full bg-transparent outline-none border-[2px] border-gray-500  rounded-[40px] text-secondary text-[16px] px-6 py-2"
                            type="password"
                            placeholder="Confirmez votre mot de passe"
                            required
                        />
                    </div>
                    <Link to="/student-space">
                        <button
                            className="w-full h-[45px] bg-white border-none outline-none rounded-[40px] shadow-[0_0_10px_rgba(0,0,0,0.1)] cursor-pointer text-[16px] text-[#333] font-bold"
                            type="submit"
                        >
                            Créer un compte
                        </button>
                    </Link>
                </form>
  
            </div>
        </div>
    );
}

export default SignUpPage;
