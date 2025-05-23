import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="flex justify-center gap-6 p-4 bg-white shadow dark:bg-slate-800">
      <Link
        to="/admin"
        className={`text-lg font-medium ${location.pathname === '/admin' ? 'text-[#DF2E20]' : 'text-gray-600 dark:text-gray-300'}`}
      >
        Puntos de Venta
      </Link>
      <Link
        to="/map"
        className={`text-lg font-medium ${location.pathname === '/map' ? 'text-[#DF2E20]' : 'text-gray-600 dark:text-gray-300'}`}
      >
        Mapa y Gráfico
      </Link>
    </nav>
  );
}

export default NavBar;

