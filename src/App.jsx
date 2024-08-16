import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import './Inventario.css';
import './index.css';
import Empleados from './empleados/pages/Empleados';
import Asistencia from './asistencia/pages/Asistencia';
import Inventario from './inventario/pages/Inventario';
import Inicio from './inicio/pages/Inicio';
import Prestamos from './prestamos/pages/Prestamos';
import Login from './login/pages/Login';
import NuevoEmpleado from './empleados/pages/NuevoEmpleado';
import EditarEmpleado from './empleados/pages/EditarEmpleado';
import NuevoAsistencia from './asistencia/pages/NuevaAsistencia';
import NuevoInventario from './inventario/pages/NuevoInventario';
import EditarInventario from './inventario/pages/EditarInventario';
import PrestamoSueldo from './prestamos/pages/NuevoPrestamo';
import EditarPrestamo from './prestamos/pages/EditarPrestamo';
import EditarAsistencia from './asistencia/pages/EditarAsistencia';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica si el usuario está autenticado
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirige al login si no hay token
    }
  }, [navigate]); // Se ejecuta solo cuando `navigate` cambia

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Inicio /></ProtectedRoute>} />
      <Route path="/empleados" element={<ProtectedRoute><Empleados /></ProtectedRoute>} />
      <Route path="/empleados/nuevo" element={<ProtectedRoute><NuevoEmpleado /></ProtectedRoute>} />
      <Route path="/empleados/editar/:id" element={<ProtectedRoute><EditarEmpleado /></ProtectedRoute>} />
      <Route path="/asistencia" element={<ProtectedRoute><Asistencia /></ProtectedRoute>} />
      <Route path="/asistencia/nueva" element={<ProtectedRoute><NuevoAsistencia /></ProtectedRoute>} />
      <Route path="/asistencia/editar/:id" element={<ProtectedRoute><EditarAsistencia /></ProtectedRoute>} />
      <Route path="/inventario" element={<ProtectedRoute><Inventario /></ProtectedRoute>} />
      <Route path="/inventario/nuevo" element={<ProtectedRoute><NuevoInventario /></ProtectedRoute>} />
      <Route path="/inventario/editar/:id" element={<ProtectedRoute><EditarInventario /></ProtectedRoute>} />
      <Route path="/prestamos" element={<ProtectedRoute><Prestamos /></ProtectedRoute>} />
      <Route path="/prestamos/nuevo" element={<ProtectedRoute><PrestamoSueldo /></ProtectedRoute>} />
      <Route path="/prestamos/editar/:id" element={<ProtectedRoute><EditarPrestamo /></ProtectedRoute>} />
    </Routes>
  );
}

export default function RootApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
