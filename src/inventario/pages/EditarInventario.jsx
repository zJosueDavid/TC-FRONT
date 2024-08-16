import Navbar from '../../components/Navbar.jsx';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const EditarInventario = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    departamento: '',
    cantidad: '',
    ubicacion: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInventario = async () => {
      try {
        const response = await fetch(`http://localhost:3000/inventarios/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          console.error('Error fetching inventory item:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching inventory item:', error);
      }
    };

    fetchInventario();
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
    const nombrePattern = /^[\w\s/]+$/; // Allow letters, numbers, spaces, and slashes
    // const cantidadPattern = /^\d+ $/;

    if (!formData.nombre) {
      tempErrors.nombre = 'Nombre es requerido';
    } else if (!nombrePattern.test(formData.nombre)) {
      tempErrors.nombre = 'Nombre no puede contener números ni caracteres especiales';
    } else if (formData.nombre.length < 3) {
      tempErrors.nombre = 'Nombre debe tener al menos 3 caracteres';
    }

    if (!formData.descripcion) {
      tempErrors.descripcion = 'Descripción es requerida';
    } else if (formData.descripcion.length < 8) {
      tempErrors.descripcion = 'Descripción debe tener al menos 8 caracteres';
    }

    if (!formData.departamento) {
      tempErrors.departamento = 'Departamento es requerido';
    } else if (formData.departamento.length < 3) {
      tempErrors.departamento = 'Departamento debe tener al menos 3 caracteres';
    }
    // if (!formData.cantidad) {
    //   tempErrors.cantidad = 'Cantidad es requerida';
    // } else if (!cantidadPattern.test(formData.cantidad) || formData.cantidad <= 0) {
    //   tempErrors.cantidad = 'Cantidad debe ser un número positivo';
    // }

    if (!formData.ubicacion) {
      tempErrors.ubicacion = 'Ubicación es requerida';
    } else if (formData.ubicacion.length < 3) {
      tempErrors.ubicacion = 'Ubicación debe tener al menos 3 caracteres';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch(`http://localhost:3000/inventarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate('/inventario');
      } else {
        console.error('Error updating inventory item:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating inventory item:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="flex items-center justify-center p-12">
          <div className="mx-auto w-full max-w-[550px]">
            <h2 className="text-center mb-4">Editar Inventario</h2>
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
                <label htmlFor="descripcion" className="mb-3 block text-base font-medium text-[#07074D]">
                  Descripción
                </label>
                <input
                  type="text"
                  name="descripcion"
                  id="descripcion"
                  placeholder="Descripción"
                  value={formData.descripcion}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                />
                {errors.descripcion && <span className="text-red-500">{errors.descripcion}</span>}
              </div>
              <div className="mb-5">
                <label htmlFor="departamento" className="mb-3 block text-base font-medium text-[#07074D]">
                  Departamento
                </label>
                <input
                  type="text"
                  name="departamento"
                  id="departamento"
                  placeholder="Departamento"
                  value={formData.departamento}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                />
                {errors.departamento && <span className="text-red-500">{errors.departamento}</span>}
              </div>
              <div className="mb-5">
                <label htmlFor="cantidad" className="mb-3 block text-base font-medium text-[#07074D]">
                  Cantidad
                </label>
                <input
                  type="number"
                  name="cantidad"
                  id="cantidad"
                  placeholder="Cantidad"
                  value={formData.cantidad}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                />
                {errors.cantidad && <span className="text-red-500">{errors.cantidad}</span>}
              </div>
              <div className="mb-5">
                <label htmlFor="ubicacion" className="mb-3 block text-base font-medium text-[#07074D]">
                  Ubicación
                </label>
                <input
                  type="text"
                  name="ubicacion"
                  id="ubicacion"
                  placeholder="Ubicación"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                />
                {errors.ubicacion && <span className="text-red-500">{errors.ubicacion}</span>}
              </div>
              <div className="flex justify-between items-center">
                <button type="submit" className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                  Actualizar
                </button>
                <Link to="/inventario" className="ml-4 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
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

export default EditarInventario;
