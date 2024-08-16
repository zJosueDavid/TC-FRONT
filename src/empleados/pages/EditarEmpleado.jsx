import Navbar from '../../components/Navbar.jsx';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const EditarEmpleado = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nombre: '',
    puesto: '',
    curp: '',
    rfc: '',
    sueldo_semanal: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmpleado = async () => {
      try {
        const response = await fetch(`http://localhost:3000/empleados/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          console.error('Error fetching employee:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmpleado();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    let tempErrors = {};
    const nombrePattern = /^[A-Za-z\s]+$/;
    const puestoPattern = /^[A-Za-z\s]+$/;
    const curpPattern = /^.{18}$/;
    const rfcPattern = /^[A-Z]{4}[0-9]{6}[A-Z0-9]{3}$/;

    if (!formData.nombre) {
      tempErrors.nombre = 'Nombre es requerido';
    } else if (!nombrePattern.test(formData.nombre)) {
      tempErrors.nombre = 'Nombre no puede contener números ni caracteres especiales';
    } else if (formData.nombre.length < 5) {
      tempErrors.nombre = 'Nombre debe tener al menos 5 caracteres';
    }

    if (!formData.puesto) {
      tempErrors.puesto = 'Puesto es requerido';
    } else if (!puestoPattern.test(formData.puesto)) {
      tempErrors.puesto = 'Puesto no puede contener números ni caracteres especiales';
    } else if (formData.puesto.length < 5) {
      tempErrors.puesto = 'Puesto debe tener al menos 5 caracteres';
    }

    if (!formData.curp) {
      tempErrors.curp = 'CURP es requerido';
    } else if (!curpPattern.test(formData.curp)) {
      tempErrors.curp = 'CURP debe tener exactamente 18 caracteres';
    }

    if (!formData.rfc) {
      tempErrors.rfc = 'RFC es requerido';
    } else if (!rfcPattern.test(formData.rfc)) {
      tempErrors.rfc = 'RFC debe tener exactamente 13 caracteres';
    }

    if (!formData.sueldo_semanal || formData.sueldo_semanal <= 0) {
      tempErrors.sueldo_semanal = 'Sueldo Semanal debe ser mayor a 0';
    } else if (formData.sueldo_semanal > 10000) {
      tempErrors.sueldo_semanal = 'Sueldo Semanal no debe exceder los 10,000';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch(`http://localhost:3000/empleados/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate('/empleados');
      } else {
        console.error('Error updating employee:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="flex items-center justify-center p-12">
          <div className="mx-auto w-full max-w-[550px]">
            <h2 className="text-center mb-4">Editar Empleado</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="nombre" className="mb-3 block text-base font-medium text-[#07074D]">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                />
                {errors.nombre && <span className="text-red-500">{errors.nombre}</span>}
              </div>
              <div className="mb-5">
                <label htmlFor="puesto" className="mb-3 block text-base font-medium text-[#07074D]">
                  Puesto
                </label>
                <input
                  type="text"
                  name="puesto"
                  id="puesto"
                  placeholder="Puesto"
                  value={formData.puesto}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                />
                {errors.puesto && <span className="text-red-500">{errors.puesto}</span>}
              </div>
              <div className="mb-5">
                <label htmlFor="curp" className="mb-3 block text-base font-medium text-[#07074D]">
                  CURP
                </label>
                <input
                  type="text"
                  name="curp"
                  id="curp"
                  placeholder="CURP"
                  value={formData.curp}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                  maxLength="18"
                />
                {errors.curp && <span className="text-red-500">{errors.curp}</span>}
              </div>
              <div className="mb-5">
                <label htmlFor="rfc" className="mb-3 block text-base font-medium text-[#07074D]">
                  RFC
                </label>
                <input
                  type="text"
                  name="rfc"
                  id="rfc"
                  placeholder="RFC"
                  value={formData.rfc}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                  maxLength="13"
                />
                {errors.rfc && <span className="text-red-500">{errors.rfc}</span>}
              </div>
              <div className="mb-5">
                <label htmlFor="sueldo_semanal" className="mb-3 block text-base font-medium text-[#07074D]">
                  Sueldo Semanal
                </label>
                <input
                  type="number"
                  name="sueldo_semanal"
                  id="sueldo_semanal"
                  placeholder="Sueldo Semanal"
                  value={formData.sueldo_semanal}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  min="1"
                  max="10000"
                  required
                />
                {errors.sueldo_semanal && <span className="text-red-500">{errors.sueldo_semanal}</span>}
              </div>
              <div className="flex justify-between items-center">
                <button type="submit" className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                  Actualizar
                </button>
                <Link to="/empleados" className="ml-4 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
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

export default EditarEmpleado;
