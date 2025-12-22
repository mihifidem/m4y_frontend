import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";


export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-300 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-2 py-2 flex items-center justify-between">
          {/* Logo con animación */}
          <Link 
            to="view-message/" 
            className="flex items-center gap-2 font-bold text-2xl text-gray-800 group relative"
          >
            <span className="relative inline-block">
              <span className="text-4xl logo-anim">🎁</span>
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow z-10 border-2 border-white transition-all duration-300 badge-heart group-hover:badge-heart-anim">
                <span className="badge-heart-content">1</span>
              </span>
              {/* Corazones animados */}
              <span className="absolute left-1/2 top-1/2 pointer-events-none select-none hearts-container">
                <span className="heart absolute opacity-0 group-hover:heart-anim" style={{left: '-18px', top: '-30px'}}>💖</span>
                <span className="heart absolute opacity-0 group-hover:heart-anim2" style={{left: '10px', top: '-38px'}}>💗</span>
                <span className="heart absolute opacity-0 group-hover:heart-anim3" style={{left: '-8px', top: '-50px'}}>💓</span>
              </span>
            </span>
            <span className="hidden sm:inline logo-text-anim group-hover:logo-text-anim-hover">Mensaje para Ti</span>
          </Link>

          {/* Enlaces principales - ocultos en móvil, visibles en sm+ */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
            to="/home-info"
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-xl font-bold text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none"
          >
            <span className="text-2xl">🏠</span>
            Inicio
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-xl font-bold text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none"
          >
            <span className="text-2xl">✉️</span>
            Crear
          </Link>
          <Link
            to="/view-message"
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-xl font-bold text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none"
          >
            <span className="text-2xl">👁️</span>
            Ver
          </Link>
          {user && user.is_staff ? (
            <Link
              to="/admin-codes"
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-xl font-bold text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none"
            >
              <span className="text-2xl">🛠️</span>
              Gestión
            </Link>
          ) : null}
          <Link
            to="/login"
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-xl font-bold text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none"
          >
            <span className="text-2xl">🏪</span>
            Comercios
          </Link>
        </div>

        {/* Menú hamburguesa solo en móvil */}
        <div className="flex sm:hidden items-center">
          <button
            className="p-3 rounded-md bg-gray-200 text-3xl text-gray-800 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            ☰
          </button>
          {/* Panel lateral */}
          {menuOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-end">
              <div className="w-72 bg-white h-full p-4 flex flex-col gap-4 overflow-y-auto">
                <button className="self-end mb-2 text-3xl text-gray-800" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú">
                  ×
                </button>
                <Link to="/home-info" className="flex items-center gap-3 px-4 py-4 rounded-lg text-xl font-bold text-gray-800 bg-gray-200 hover:bg-gray-300" onClick={() => setMenuOpen(false)}>
                  <span className="text-2xl">🏠</span> Inicio
                </Link>
                <Link to="/" className="flex items-center gap-3 px-4 py-4 rounded-lg text-xl font-bold text-gray-800 bg-gray-200 hover:bg-gray-300" onClick={() => setMenuOpen(false)}>
                  <span className="text-2xl">✉️</span> Crear
                </Link>
                <Link to="/view-message" className="flex items-center gap-3 px-4 py-4 rounded-lg text-xl font-bold text-gray-800 bg-gray-200 hover:bg-gray-300" onClick={() => setMenuOpen(false)}>
                  <span className="text-2xl">👁️</span> Ver
                </Link>
                {user && user.is_staff ? (
                  <Link to="/admin-codes" className="flex items-center gap-3 px-4 py-4 rounded-lg text-xl font-bold text-gray-800 bg-gray-200 hover:bg-gray-300" onClick={() => setMenuOpen(false)}>
                    <span className="text-2xl">🛠️</span> Gestión
                  </Link>
                ) : null}
                <Link to="/login" className="flex items-center gap-3 px-4 py-4 rounded-lg text-xl font-bold text-gray-800 bg-gray-200 hover:bg-gray-300" onClick={() => setMenuOpen(false)}>
                  <span className="text-2xl">🏪</span> Comercios
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Botón de acceso para comercios / Usuario logueado */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              {/* Usuario logueado */}
              <Link 
                to="/account" 
                className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-xs sm:text-sm hidden sm:inline">{user.email?.split('@')[0]}</span>
              </Link>
              
              {/* Botón Logout */}
              <button 
                onClick={handleLogout}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="text-xs sm:text-sm hidden sm:inline">Salir</span>
              </button>
            </>
          ) : (
            /* Botón de login cuando no está autenticado */
            <Link 
              to="/login" 
              className="flex items-center gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs sm:text-sm md:text-base">Comercios</span>
            </Link>
          )}
        </div>
      </div>
      {/* Botón flotante FAQs en la esquina inferior izquierda */}
      {/* Botón FAQs eliminado del Navbar */}
      
      {/* Animaciones sorprendentes */}
      <style>{`
        @keyframes heartBurst {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.3) rotate(180deg); opacity: 1; }
          100% { transform: scale(1) rotate(360deg); opacity: 1; }
        }
        
        @keyframes heartPulse {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(1.1); }
          75% { transform: scale(1.15); }
        }
        
        @keyframes particle1 {
          0% { transform: translate(0, 0) scale(0) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(-35px, -40px) scale(1.5) rotate(360deg); opacity: 0; }
        }
        @keyframes particle2 {
          0% { transform: translate(0, 0) scale(0) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(40px, -35px) scale(1.5) rotate(-360deg); opacity: 0; }
        }
        @keyframes particle3 {
          0% { transform: translate(0, 0) scale(0) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(-45px, 10px) scale(1.5) rotate(540deg); opacity: 0; }
        }
        @keyframes particle4 {
          0% { transform: translate(0, 0) scale(0) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(45px, 15px) scale(1.5) rotate(-540deg); opacity: 0; }
        }
        @keyframes particle5 {
          0% { transform: translate(0, 0) scale(0) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(-25px, 45px) scale(1.5) rotate(720deg); opacity: 0; }
        }
        @keyframes particle6 {
          0% { transform: translate(0, 0) scale(0) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(30px, 40px) scale(1.5) rotate(-720deg); opacity: 0; }
        }
        @keyframes particle7 {
          0% { transform: translate(0, 0) scale(0) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(-15px, -50px) scale(1.5) rotate(180deg); opacity: 0; }
        }
        @keyframes particle8 {
          0% { transform: translate(0, 0) scale(0) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(20px, -45px) scale(1.5) rotate(-180deg); opacity: 0; }
        }
        
        .animate-heartBurst { animation: heartBurst 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }
        .animate-heartPulse { animation: heartPulse 1s ease-in-out infinite; }
        .animate-particle1 { animation: particle1 1s ease-out forwards; }
        .animate-particle2 { animation: particle2 1s ease-out forwards; }
        .animate-particle3 { animation: particle3 1s ease-out forwards; }
        .animate-particle4 { animation: particle4 1s ease-out forwards; }
        .animate-particle5 { animation: particle5 1s ease-out forwards; }
        .animate-particle6 { animation: particle6 1s ease-out forwards; }
        .animate-particle7 { animation: particle7 1s ease-out forwards; }
        .animate-particle8 { animation: particle8 1s ease-out forwards; }
      `}</style>
    </nav>
    <style>{`
      @keyframes logo-bounce-spin {
        0% { transform: scale(1) rotate(0deg); }
        20% { transform: scale(1.15) rotate(12deg); }
        40% { transform: scale(0.95) rotate(-8deg); }
        60% { transform: scale(1.1) rotate(8deg); }
        80% { transform: scale(1.05) rotate(-4deg); }
        100% { transform: scale(1) rotate(0deg); }
      }
      @keyframes logo-text-move {
        0% { transform: scale(1) translateY(0); }
        30% { transform: scale(1.08) translateY(-4px); }
        60% { transform: scale(1.12) translateY(-8px); }
        100% { transform: scale(1) translateY(0); }
      }
      @keyframes heart-float1 {
        0% { opacity: 0; transform: translateY(0) scale(0.7) rotate(-10deg); }
        10% { opacity: 1; }
        80% { opacity: 1; }
        100% { opacity: 0; transform: translateY(-40px) scale(1.2) rotate(10deg); }
      }
      @keyframes heart-float2 {
        0% { opacity: 0; transform: translateY(0) scale(0.7) rotate(10deg); }
        10% { opacity: 1; }
        80% { opacity: 1; }
        100% { opacity: 0; transform: translateY(-50px) scale(1.2) rotate(-10deg); }
      }
      @keyframes heart-float3 {
        0% { opacity: 0; transform: translateY(0) scale(0.7) rotate(0deg); }
        10% { opacity: 1; }
        80% { opacity: 1; }
        100% { opacity: 0; transform: translateY(-60px) scale(1.2) rotate(0deg); }
      }
      .logo-anim {
        display: inline-block;
        transition: transform 0.3s;
      }
      .logo-text-anim {
        display: inline-block;
        transition: transform 0.3s;
      }
      .group:hover .logo-anim {
        animation: logo-bounce-spin 0.7s cubic-bezier(.4,0,.2,1) both;
      }
      .group:hover .logo-text-anim {
        animation: logo-text-move 0.7s cubic-bezier(.4,0,.2,1) both;
      }
      .heart {
        font-size: 1.5rem;
        pointer-events: none;
        opacity: 0;
      }
      .group:hover .heart-anim {
        animation: heart-float1 1.1s ease-in-out;
        opacity: 1;
      }
      .group:hover .heart-anim2 {
        animation: heart-float2 1.1s ease-in-out 0.1s;
        opacity: 1;
      }
      .group:hover .heart-anim3 {
        animation: heart-float3 1.1s ease-in-out 0.2s;
        opacity: 1;
      }
      .badge-heart-content {
        display: inline-block;
        transition: opacity 0.2s, transform 0.3s;
      }
      .group:hover .badge-heart-content {
        opacity: 0;
        transform: scale(0.5) translateY(-8px);
      }
      .badge-heart::after {
        content: '';
        display: none;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0.7);
        font-size: 1.1rem;
        color: #fff;
        transition: opacity 0.2s, transform 0.3s;
      }
      .group:hover .badge-heart::after {
        content: '💖';
        display: block;
        opacity: 1;
        animation: badge-heart-pop 0.7s cubic-bezier(.4,0,.2,1);
      }
      @keyframes badge-heart-pop {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5) rotate(-10deg); }
        40% { opacity: 1; transform: translate(-50%, -70%) scale(1.2) rotate(10deg); }
        70% { opacity: 1; transform: translate(-50%, -90%) scale(1.1) rotate(-8deg); }
        100% { opacity: 0; transform: translate(-50%, -120%) scale(0.7) rotate(0deg); }
      }
    `}</style>
  </>
);
}