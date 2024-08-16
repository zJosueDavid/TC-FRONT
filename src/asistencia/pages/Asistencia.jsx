import { useEffect, useState } from 'react';
import UpdateWeekDates from '../../components/UpdateWeekDates.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from '../../components/Navbar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Asistencia = () => {
  const [asistencias, setAsistencias] = useState([]);

  useEffect(() => {
    const fetchAsistencias = async () => {
      try {
        const response = await fetch('http://localhost:3000/asistencias');
        if (!response.ok) {
          throw new Error('Error al obtener datos de asistencias');
        }
        const data = await response.json();
        setAsistencias(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchAsistencias();
  }, []); // El array vacío significa que este efecto solo se ejecutará una vez, al montar el componente

  const handleClearAll = async () => {
    const confirmClear = window.confirm('¿Estás seguro de que deseas limpiar todas las asistencias?');
    if (!confirmClear) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/asistencias/clear-all', {
        method: 'PATCH',
      });
      if (response.ok) {
        // Vuelve a obtener las asistencias para reflejar los cambios
        const newResponse = await fetch('http://localhost:3000/asistencias');
        const data = await newResponse.json();
        setAsistencias(data);
      } else {
        console.error('Error al limpiar asistencias:', response.statusText);
      }
    } catch (error) {
      console.error('Error al limpiar asistencias:', error);
    }
  };

  // Eliminar Asistencia
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta asistencia?');
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/asistencias/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setAsistencias(asistencias.filter(asistencia => asistencia.id !== id));
      } else {
        console.error('Error al borrar asistencia:', response.statusText);
      }
    } catch (error) {
      console.error('Error al borrar asistencia:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className='container' style={{ padding: 20 }}>
        <h2>Registro de Asistencias</h2>
        <UpdateWeekDates />
        <br />
        <div className="actions">
          <Link to={'/asistencia/nueva'} className="btn-add">
            <i className="fas fa-plus" /> Agregar Nuevo
          </Link>
          <button className="btn-clear-all" onClick={handleClearAll}>
          <i className="fas fa-eraser" /> Limpiar Todas las Asistencias
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
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {asistencias.map((asistencia) => (
              <tr key={asistencia.id}>
                <td>{asistencia.empleado?.nombre || 'Desconocido'}</td>
                <td>{asistencia.entrada1}</td>
                <td>{asistencia.entrada2}</td>
                <td>{asistencia.entrada3}</td>
                <td>{asistencia.entrada4}</td>
                <td>{asistencia.entrada5}</td>
                <td>{asistencia.entrada6}</td>
                <td>
                  <Link to={`/asistencia/editar/${asistencia.id}`} className="btn-edit">
                    <i className="fas fa-edit" /> 
                  </Link>
                  <button onClick={() => handleDelete(asistencia.id)} className="btn-delete">
                    <i className="fas fa-trash-alt" /> 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Asistencia;
