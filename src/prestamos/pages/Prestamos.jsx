import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from '../../components/Navbar.jsx';
import UpdateWeekDates from '../../components/UpdateWeekDates.jsx';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Prestamos = () => {
  const [prestamos, setPrestamos] = useState([]);

  useEffect(() => {
    fetchPrestamos();
  }, []);

  const fetchPrestamos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/ads');
      setPrestamos(response.data);
    } catch (error) {
      console.error('Error fetching prestamos:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este préstamo?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/ads/${id}`);
        setPrestamos(prestamos.filter((prestamo) => prestamo.id !== id));
      } catch (error) {
        console.error('Error deleting prestamo:', error);
      }
    }
  };

  // const handleClearAmounts = async (id) => {
  //   const confirmClear = window.confirm('¿Estás seguro de que deseas limpiar los montos de este préstamo?');
  //   if (confirmClear) {
  //     try {
  //       await axios.patch(`http://localhost:3000/ads/clear-amounts/${id}`);
  //       fetchPrestamos(); // Refresca la lista de préstamos después de limpiar los montos
  //     } catch (error) {
  //       console.error('Error clearing amounts:', error);
  //     }
  //   }
  // };

  const handleClearAll = async () => {
    const confirmClear = window.confirm('¿Estás seguro de que deseas limpiar todos los préstamos?');
    if (!confirmClear) {
      return;
    }
  
    try {
      const response = await axios.patch('http://localhost:3000/ads/clear-all');
      if (response.status === 200) {
        fetchPrestamos(); // Vuelve a obtener los préstamos para reflejar los cambios
      } else {
        console.error('Error al limpiar préstamos:', response.statusText);
      }
    } catch (error) {
      console.error('Error al limpiar préstamos:', error);
    }
  };
  

  return (
    <>
      <Navbar />

      <div className='container' style={{ padding: 20 }}>
        <h2>Registro de Préstamos Semanales</h2>
        <UpdateWeekDates />
        <br />

        <div className="actions">
          <Link to={'/prestamos/nuevo'} className="btn-add">
            <i className="fas fa-plus" /> Agregar Nuevo
          </Link>
          <button className="btn-clear-all" onClick={handleClearAll}>
            <i className="fas fa-eraser" /> Limpiar Todos los Préstamos
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Empleados</th>
              <th>Lunes</th>
              <th>Martes</th>
              <th>Miércoles</th>
              <th>Jueves</th>
              <th>Viernes</th>
              <th>Sábado</th>
              <th>Sueldo Neto</th>
              <th>Sueldo a Recibir</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {prestamos.map((prestamo) => (
              <tr key={prestamo.id}>
                <td>{prestamo.empleado.nombre}</td>
                <td>{prestamo.montolunes}</td>
                <td>{prestamo.montomartes}</td>
                <td>{prestamo.montomiercoles}</td>
                <td>{prestamo.montojueves}</td>
                <td>{prestamo.montoviernes}</td>
                <td>{prestamo.montosabado}</td>
                <td>{prestamo.sueldoneto}</td>
                <td>{prestamo.sueldodisponible}</td>
                <td>
                  <Link to={`/prestamos/editar/${prestamo.id}`}>
                    <button className="btn-edit">
                      <i className="fas fa-edit" />
                    </button>
                  </Link>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(prestamo.id)}
                  >
                    <i className="fas fa-trash" />
                  </button>
                  {/* <button
                    className="btn-clear"
                    onClick={() => handleClearAmounts(prestamo.id)}
                  >
                    <i className="fas fa-eraser" /> Limpiar Montos
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Prestamos;
