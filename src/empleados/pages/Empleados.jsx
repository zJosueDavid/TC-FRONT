  import { Link } from 'react-router-dom'
  import '../../components/Navbar.jsx'
  import Navbar from '../../components/Navbar.jsx'
  import { useEffect, useState } from 'react'

  export const Empleados = () =>   {
    
    const [ empleados , setEmpleados ] = useState([])

    // Ver tabla de los empleados
    const handleGetEmpleados = async () => {

      try {
        const data = await (await fetch('http://localhost:3000/empleados')).json()
        setEmpleados(data)
      } 
      catch (error) 
      { console.error('Error fetching inventory data:', error); }

    }
    useEffect( () => {
      handleGetEmpleados()
    }, [])

    
  // Eliminar Empleado
    const handleDelete = async (id) => {
      const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este empleado?');
      if (!confirmDelete) {
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/empleados/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setEmpleados(empleados.filter(empleado => empleado.id !== id));
        } else {
          console.error('Error deleting employee:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    };

    return (
      <>
    
      <Navbar />
      
      <div className='container' style={{ padding: 20 }}>
        <h2>Registro de Empleados</h2>
        
        <div className="actions" style={{ marginTop: '20px' }}>
        <Link to={'/empleados/nuevo'} className="btn-add">
            <i className="fas fa-plus" /> Agregar Nuevo
          </Link>
        </div>
        <table id="employeesTable">
          <thead>
            <tr>
              <th>ID Empleado</th>
              <th>Nombre</th>
              <th>Puesto</th>
              <th>CURP</th>
              <th>RFC</th>
              <th>Sueldo Semanal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              empleados.map((empleado) => {

                return (
                  <tr key={empleado.id}>
                  <td> {empleado.id} </td>
                  <td>{empleado.nombre}</td>
                  <td>{empleado.puesto}</td>
                  <td>{empleado.curp}</td>
                  <td>{empleado.rfc}</td>
                  <td>{empleado.sueldo_semanal}</td>
                  <td>
                  <Link to={`/empleados/editar/${empleado.id}`}>
                    <button className="btn-edit">
                      <i className="fas fa-edit" />
                    </button>
                  </Link>
                <button onClick={() => handleDelete(empleado.id)} className="btn-delete">
                      <i className="fas fa-trash" />
                    </button>
                </td>
                </tr>
                )
              })
            }
            {/* Añadir más filas según sea necesario */}
          </tbody>
        </table>  
      </div>
    </>
      )
  }

  export default Empleados
