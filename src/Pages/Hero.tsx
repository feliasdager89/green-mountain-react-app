import heroImage from "../assets/images/fall_scenery.jpg"; 
import { useNavigate } from 'react-router-dom';

export default function Hero() {

  const navigate = useNavigate();
  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center px-6">

        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          GreenMountain Care
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          Connecting trusted homecare providers with families in need.
        </p>

        <div className="flex justify-center gap-4">
          
          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-lg font-semibold transition" 
            onClick={() => navigate("/register")}>
            Register
          </button>

        </div>

      </div>

    </section>
  );
}


