import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar.jsx';
import SearchBar from '../../components/SearchBar';

export const Inventario = () => {
  const [inventario, setInventario] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredInventario, setFilteredInventario] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);

  const handleGetInventario = async () => {
    try {
      const data = await (await fetch('http://localhost:3000/inventarios')).json();
      setInventario(data);
      setFilteredInventario(data); // Inicialmente mostrar todo el inventario
    } catch (error) {
      console.error('Error fetching inventory data:', error);
    }
  };

  useEffect(() => {
    handleGetInventario();
  }, []);

  useEffect(() => {
    setFilteredInventario(
      inventario.filter((item) =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, inventario]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este inventario?');
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/inventarios/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setInventario(inventario.filter(item => item.id !== id));
      } else {
        console.error('Error deleting inventory:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting inventory:', error);
    }
  };

  // Calcular los ítems a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInventario.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Estilos en línea para los botones de paginación
  const buttonStyle = {
    padding: '10px 20px',
    margin: '0 10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f8f9fa',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    cursor: 'not-allowed',
    backgroundColor: '#e9ecef'
  };

  return (
    <>
      <Navbar />
      <div className='container' style={{ padding: 20 }}>
      <h2>Inventario de Materiales</h2>
      <div className="actions" style={{ marginTop: '20px' }}>
          <Link to={'/inventario/nuevo'} className="btn-add">
            <i className="fas fa-plus" /> Agregar Nuevo
          </Link>
        </div>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <table id="inventoryTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Departamento</th>
              <th>Cantidad Disponible</th>
              <th>Ubicación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>
                <td>{item.descripcion}</td>
                <td>{item.departamento}</td>
                <td>{item.cantidad}</td>
                <td>{item.ubicacion}</td>
                <td>
                  <Link to={`/inventario/editar/${item.id}`}>
                    <button className="btn-edit">
                      <i className="fas fa-edit" />
                    </button>
                  </Link>
                  <button onClick={() => handleDelete(item.id)} className="btn-delete">
                    <i className="fas fa-trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            style={currentPage === 1 ? disabledButtonStyle : buttonStyle}
          >
            Anterior
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastItem >= filteredInventario.length}
            style={indexOfLastItem >= filteredInventario.length ? disabledButtonStyle : buttonStyle}
          >
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};

export default Inventario;
