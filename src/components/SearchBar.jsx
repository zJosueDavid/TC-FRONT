import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Buscar por nombre..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        marginBottom: 20,
        padding: '10px 15px',
        width: '100%',
        border: '1px solid #dcdcdc',
        borderRadius: 24, // Bordes redondeados
        backgroundColor: '#ffffff', // Fondo blanco
        color: '#333333', // Texto oscuro
        fontSize: 16, // Tamaño de fuente
        outline: 'none', // Quitar borde al enfocar
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)' // Sombra ligera
      }}
    />
  );
};

export default SearchBar;
