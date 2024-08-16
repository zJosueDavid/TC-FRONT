import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { jwtDecode } from 'jwt-decode'
import  { useState } from 'react';

const Login = () => {
  const [nameUser, setNameUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        nameUser,
        password,
      });
      const { token, user } = response.data;

      // Guardar el token en el local storage
      localStorage.setItem('token', token);

      // Decodificar el token si es necesario
      const decodedToken = jwtDecode(token);
      console.log('Decoded Token:', decodedToken);

      // Redirigir o actualizar el estado de autenticación en tu aplicación
      console.log('User:', user);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Usuario o Contraseña Incorrecto');
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#1E3A8A' }}>
      <div className="row">
        <div className="col-lg-6 mb-5 mb-lg-0 d-flex align-items-center justify-content-center">
          <div className="bg-white p-4 rounded-5 shadow" style={{ maxWidth: '80%', maxHeight: '80%' }}>
            <img
              className="img-fluid rounded-5"
              src="./src/Fotos/LogoCastillo.png"
              alt="left-image"
              style={{ maxWidth: 'calc(100% - 19px)', height: 'auto' }}
            />
          </div>
        </div>
        <div className="col-lg-6 py-5 px-md-5 d-flex align-items-center justify-content-center">
          <form onSubmit={handleLogin} className="bg-white p-5 rounded-5 shadow" style={{ maxWidth: '25rem' }}>
            <div className="text-center fs-1 fw-bold mb-4">Login</div>
            <div className="input-group mt-4">
              <div className="input-group-text bg-info">
                <img src="./src/Fotos/username-icon.svg" alt="username-icon" style={{ height: '1rem' }} />
              </div>
              <input
                className="form-control"
                name="email"
                placeholder="userName"
                type="text"
                value={nameUser}
                onChange={(e) => setNameUser(e.target.value)}
              />
            </div>
            <div className="input-group mt-3">
              <div className="input-group-text bg-info">
                <img src="./src/Fotos/password-icon.svg" alt="password-icon" style={{ height: '1rem' }} />
              </div>
              <input
                type="password"
                className="form-control"
                name="pass"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="d-grid gap-2 mt-4">
              <button type="submit" className="btn btn-warning btn-dark btn-lg">
                <i className="bi bi-envelope-fill me-2"></i> Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
