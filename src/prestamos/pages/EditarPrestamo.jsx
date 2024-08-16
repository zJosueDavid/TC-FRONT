import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../../components/Navbar.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

export const EditarPrestamo = () => {
  const [formData, setFormData] = useState({
    empleadoId: '',
    montolunes: 0,
    montomartes: 0,
    montomiercoles: 0,
    montojueves: 0,
    montoviernes: 0,
    montosabado: 0,
  });
  const [empleadoNombre, setEmpleadoNombre] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrestamo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/ads/${id}`);
        const prestamo = response.data;

        setFormData({
          empleadoId: prestamo.empleado.id, // Guarda el ID del empleado
          montolunes: prestamo.montolunes,
          montomartes: prestamo.montomartes,
          montomiercoles: prestamo.montomiercoles,
          montojueves: prestamo.montojueves,
          montoviernes: prestamo.montoviernes,
          montosabado: prestamo.montosabado,
        });

        setEmpleadoNombre(prestamo.empleado.nombre); // Usa el nombre directamente desde la respuesta
      } catch (error) {
        console.error('Error fetching prestamo data:', error);
      }
    };

    fetchPrestamo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/ads/${id}`, formData)
      .then(response => {
        alert('Adelanto de sueldo actualizado exitosamente');
        navigate('/prestamos');
      })
      .catch(error => {
        console.error('Error updating adelanto de sueldo:', error);
        alert('Hubo un error al actualizar el adelanto de sueldo');
      });
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="flex items-center justify-center p-12">
          <div className="mx-auto w-full max-w-[550px]">
            <h2 className="text-center mb-4">Editar Adelanto de Sueldo</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="empleadoId" className="block text-sm font-medium text-gray-700">Empleado</label>
                <div className="w-full rounded-md border border-gray-300 p-3 outline-none focus:border-indigo-600">
                  {empleadoNombre}
                </div>
              </div>
              <div className="mb-5">
                <label htmlFor="montolunes" className="block text-sm font-medium text-gray-700">Monto Lunes</label>
                <input
                  type="number"
                  id="montolunes"
                  name="montolunes"
                  className="w-full rounded-md border border-gray-300 p-3 outline-none focus:border-indigo-600"
                  value={formData.montolunes}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="montomartes" className="block text-sm font-medium text-gray-700">Monto Martes</label>
                <input
                  type="number"
                  id="montomartes"
                  name="montomartes"
                  className="w-full rounded-md border border-gray-300 p-3 outline-none focus:border-indigo-600"
                  value={formData.montomartes}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="montomiercoles" className="block text-sm font-medium text-gray-700">Monto Miércoles</label>
                <input
                  type="number"
                  id="montomiercoles"
                  name="montomiercoles"
                  className="w-full rounded-md border border-gray-300 p-3 outline-none focus:border-indigo-600"
                  value={formData.montomiercoles}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="montojueves" className="block text-sm font-medium text-gray-700">Monto Jueves</label>
                <input
                  type="number"
                  id="montojueves"
                  name="montojueves"
                  className="w-full rounded-md border border-gray-300 p-3 outline-none focus:border-indigo-600"
                  value={formData.montojueves}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="montoviernes" className="block text-sm font-medium text-gray-700">Monto Viernes</label>
                <input
                  type="number"
                  id="montoviernes"
                  name="montoviernes"
                  className="w-full rounded-md border border-gray-300 p-3 outline-none focus:border-indigo-600"
                  value={formData.montoviernes}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="montosabado" className="block text-sm font-medium text-gray-700">Monto Sábado</label>
                <input
                  type="number"
                  id="montosabado"
                  name="montosabado"
                  className="w-full rounded-md border border-gray-300 p-3 outline-none focus:border-indigo-600"
                  value={formData.montosabado}
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-between items-center">
                <button type="submit" className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                  Guardar
                </button>
                <Link to="/prestamos" className="ml-4 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                  Cancelar
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditarPrestamo;
