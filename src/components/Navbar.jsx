import { NavLink, useLocation, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token
    navigate('/login'); // Redirige al login
  };

  return (
    <div className="navbar">
      <a href="/" className="logo">
        Taller Castillo
      </a>
      <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>Inicio</NavLink>
      <NavLink to="/Asistencia" className={location.pathname === '/Asistencia' ? 'active' : ''}>Asistencias</NavLink>
      <NavLink to="/Prestamos" className={location.pathname === '/Prestamos' ? 'active' : ''}>Prestamos</NavLink>
      <NavLink to="/Inventario" className={location.pathname === '/Inventario' ? 'active' : ''}>Inventario</NavLink>
      <NavLink to="/Empleados" className={location.pathname === '/Empleados' ? 'active' : ''}>Empleados</NavLink>
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: '#007bff', /* Color de fondo */
          color: 'white', /* Color de texto */
          border: 'none', /* Sin borde */
          padding: '0.5rem 1rem', /* Relleno */
          cursor: 'pointer', /* Cursor al pasar sobre el botón */
          fontSize: '1rem', /* Tamaño de fuente */
          borderRadius: '0.25rem', /* Bordes redondeados */
          transition: 'background-color 0.3s' /* Transición suave */
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'} /* Color de fondo al pasar el ratón */
        onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'} /* Color de fondo original */
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Navbar;
