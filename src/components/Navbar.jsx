import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, proveedor, logout } = useContext(AuthContext);
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
          {/* LOGO */}
          <Link
            to="/view-message"
            className="flex items-center gap-2 font-bold text-2xl text-gray-800 group relative"
          >
            <span className="relative inline-block">
              <span className="text-4xl logo-anim">🎁</span>
              <span className="badge-heart absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow border-2 border-white">
                <span className="badge-heart-content">1</span>
              </span>
              <span className="absolute left-1/2 top-1/2 pointer-events-none hearts-container">
                <span className="heart heart-anim" style={{ left: "-18px", top: "-30px" }}>💖</span>
                <span className="heart heart-anim2" style={{ left: "10px", top: "-38px" }}>💗</span>
                <span className="heart heart-anim3" style={{ left: "-8px", top: "-50px" }}>💓</span>
              </span>
            </span>
            <span className="hidden sm:inline logo-text-anim">Mensaje para Ti</span>
          </Link>

          {/* NAV DESKTOP */}
          <div className="hidden sm:flex items-center gap-2">
            <Link to="/home-info" className="px-4 py-2 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition flex items-center gap-2 shadow-sm">
              <span className="text-xl">🏠</span> Inicio
            </Link>
            <Link to="/" className="px-4 py-2 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition flex items-center gap-2 shadow-sm">
              <span className="text-xl">✉️</span> Crear
            </Link>
            <Link to="/view-message" className="px-4 py-2 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition flex items-center gap-2 shadow-sm">
              <span className="text-xl">👁️</span> Ver
            </Link>
            {user?.is_staff && (
              <Link to="/admin-codes" className="px-4 py-2 rounded-lg font-semibold text-gray-700 bg-yellow-100 hover:bg-yellow-200 transition flex items-center gap-2 shadow-sm">
                <span className="text-xl">🛠️</span> Gestión
              </Link>
            )}
            {user ? (
              <>
                {user && (
                  <Link to="/dashboard" className="px-4 py-2 rounded-lg font-semibold text-gray-700 bg-green-100 hover:bg-green-200 transition flex items-center gap-2 shadow-sm">
                    <span className="text-xl">📊</span> Panel
                  </Link>
                )}
                {proveedor && (
                  <Link to="/proveedor-info" className="px-4 py-2 rounded-lg font-semibold text-gray-700 bg-blue-100 hover:bg-blue-200 transition flex items-center gap-2 shadow-sm">
                    <span className="text-xl">👤</span> {proveedor.comercial_name || proveedor.name}
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg font-semibold text-white bg-rose-600 hover:bg-rose-700 transition flex items-center gap-2 shadow-sm"
                >
                  <span className="text-xl">🚪</span> Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="px-4 py-2 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition flex items-center gap-2 shadow-sm">
                <span className="text-xl">🏪</span> Comercios
              </Link>
            )}
          </div>

          {/* BOTÓN MÓVIL */}
          <div className="flex sm:hidden">
            <button
              onClick={() => setMenuOpen(true)}
              className="p-3 text-3xl bg-gray-200 rounded-md"
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* PANEL LATERAL */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-end">
          <div className="w-72 bg-white h-full p-4 flex flex-col gap-3">
            <button
              className="self-end text-3xl"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>
            <Link to="/home-info" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition flex items-center gap-2 shadow-sm">
              <span className="text-xl">🏠</span> Inicio
            </Link>
            <Link to="/" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition flex items-center gap-2 shadow-sm">
              <span className="text-xl">✉️</span> Crear
            </Link>
            <Link to="/view-message" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition flex items-center gap-2 shadow-sm">
              <span className="text-xl">👁️</span> Ver
            </Link>
            {user?.is_staff && (
              <Link to="/admin-codes" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg font-semibold text-gray-700 bg-yellow-100 hover:bg-yellow-200 transition flex items-center gap-2 shadow-sm">
                <span className="text-xl">🛠️</span> Gestión
              </Link>
            )}
            {user ? (
              <>
                {user && (
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg font-semibold text-gray-700 bg-green-100 hover:bg-green-200 transition flex items-center gap-2 shadow-sm">
                    <span className="text-xl">📊</span> Panel
                  </Link>
                )}
                {proveedor && (
                  <Link to="/proveedor-info" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg font-semibold text-gray-700 bg-blue-100 hover:bg-blue-200 transition flex items-center gap-2 shadow-sm">
                    <span className="text-xl">👤</span> {proveedor.comercial_name || proveedor.name}
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="px-4 py-3 rounded-lg font-semibold text-white bg-rose-600 hover:bg-rose-700 transition flex items-center gap-2 shadow-sm"
                >
                  <span className="text-xl">🚪</span> Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition flex items-center gap-2 shadow-sm">
                <span className="text-xl">🏪</span> Comercios
              </Link>
            )}
          </div>
        </div>
      )}

      {/* ESTILOS */}
      <style>{`
        .logo-anim { display:inline-block; }
        .logo-text-anim { display:inline-block; }
        .group:hover .logo-anim { animation: logo-bounce-spin .7s both; }
        .group:hover .logo-text-anim { animation: logo-text-move .7s both; }
        .heart { position:absolute; opacity:0; font-size:1.5rem; }
        .group:hover .heart-anim { animation: heart-float1 1.1s; opacity:1; }
        .group:hover .heart-anim2 { animation: heart-float2 1.1s .1s; opacity:1; }
        .group:hover .heart-anim3 { animation: heart-float3 1.1s .2s; opacity:1; }
        @keyframes logo-bounce-spin {
          0%{transform:scale(1)}
          50%{transform:scale(1.15) rotate(10deg)}
          100%{transform:scale(1)}
        }
        @keyframes logo-text-move {
          0%{transform:translateY(0)}
          50%{transform:translateY(-6px)}
          100%{transform:translateY(0)}
        }
        @keyframes heart-float1 { to { transform: translateY(-40px); opacity:0 } }
        @keyframes heart-float2 { to { transform: translateY(-50px); opacity:0 } }
        @keyframes heart-float3 { to { transform: translateY(-60px); opacity:0 } }
      `}</style>
    </>
  );
}
