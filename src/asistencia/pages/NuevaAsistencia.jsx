import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar.jsx';
import { Link, useNavigate } from 'react-router-dom';

const NuevaAsistencia = () => {
  const [empleados, setEmpleados] = useState([]);
  const [form, setForm] = useState({
    empleadoId: '',
    entrada1: '',
    entrada2: '',
    entrada3: '',
    entrada4: '',
    entrada5: '',
    entrada6: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await fetch('http://localhost:3000/empleados');
        if (!response.ok) {
          throw new Error('Error al obtener datos de empleados');
        }
        const data = await response.json();
        setEmpleados(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchEmpleados();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value.toUpperCase()
    });
  };

  const validateTime = (time) => {
    const timeRegex = /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$/;
    return timeRegex.test(time);
  };

  const validate = () => {
    let tempErrors = {};

    if (!form.empleadoId) {
      tempErrors.empleadoId = 'Empleado es requerido';
    }

    for (const [key, value] of Object.entries(form)) {
      if (key !== 'empleadoId' && value) {
        if (!validateTime(value)) {
          tempErrors[key] = 'Formato de hora no válido. Ejemplo: 9:00 AM / 2:00 PM';
        }
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch('http://localhost:3000/asistencias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        navigate('/asistencia'); // Redirige a la vista de asistencias
      } else {
        console.error('Error al crear la asistencia:', response.statusText);
      }
    } catch (error) {
      console.error('Error al crear la asistencia:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="flex items-center justify-center p-12">
          <div className="mx-auto w-full max-w-[550px]">
            <h2 className="text-center mb-4">Registrar Nueva Asistencia</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="empleadoId" className="mb-3 block text-base font-medium text-[#07074D]">
                  Empleado
                </label>
                <select 
                  id="empleadoId" 
                  name="empleadoId" 
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  value={form.empleadoId} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Seleccione un empleado</option>
                  {empleados.map((empleado) => (
                    <option key={empleado.id} value={empleado.id}>
                      {empleado.nombre}
                    </option>
                  ))}
                </select>
                {errors.empleadoId && <span className="text-red-500">{errors.empleadoId}</span>}
              </div>
              {['entrada1', 'entrada2', 'entrada3', 'entrada4', 'entrada5', 'entrada6'].map((entrada, index) => (
                <div className="mb-5" key={entrada}>
                  <label htmlFor={entrada} className="mb-3 block text-base font-medium text-[#07074D]">
                    {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][index]}
                  </label>
                  <input
                    type="text"
                    name={entrada}
                    id={entrada}
                    placeholder="Escriba como en este ejemplo 9:00 AM / 2:00 PM"
                    value={form[entrada]}
                    onChange={handleChange}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                  {errors[entrada] && <span className="text-red-500">{errors[entrada]}</span>}
                </div>
              ))}
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
                >
                  Registrar Asistencia
                </button>
                <Link to="/asistencia" className="ml-4 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
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

export default NuevaAsistencia;
