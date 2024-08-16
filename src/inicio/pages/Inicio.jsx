import Navbar from '../../components/Navbar.jsx';

export const Inicio = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-extrabold">Bienvenido a Taller Castillo</h1>
          <p className="text-lg mt-4">Tu confianza, nuestro compromiso. Explora nuestras secciones para conocer más.</p>
          <button className="mt-8 bg-white text-blue-900 py-2 px-4 rounded-full font-semibold hover:bg-gray-200 transition duration-300">Explorar</button>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto mt-20">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-blue-900">Nuestros Servicios</h1>
          <p className="text-lg text-gray-700 mt-2">Proveemos soluciones integrales para tu Gestion Empresarial.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-900">Asistencias</h2>
            <p className="text-gray-700 mt-4">
              Gestionamos la asistencia del personal, registrando entradas y salidas, así como las ausencias y retardos. Esta información es fundamental para la administración de nóminas y el cumplimiento de horarios.
            </p>
          </div>
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-900">Sueldos Adelantados</h2>
            <p className="text-gray-700 mt-4">
              Ofrecemos la opción de sueldos adelantados para nuestros empleados, permitiéndoles solicitar un porcentaje de su salario antes del día de pago. Esta facilidad ayuda a cubrir emergencias financieras.
            </p>
          </div>
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-900">Inventario</h2>
            <p className="text-gray-700 mt-4">
              Nos encargamos del control y gestión del inventario de herramientas y materiales. Mantener un inventario actualizado asegura que todos los recursos necesarios están disponibles para las tareas diarias.
            </p>
          </div>
        </div>
      </div>

      {/* Generations Section */}
      <div className="bg-gray-100 py-20 mt-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-12">Nuestra Historia Empresarial</h1>
        </div>
        <div className="container mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="relative p-4 w-full">
            <div className="relative w-full h-96">
              <img
                src="./src/Fotos/FotoTaller.jpg"
                alt="Taller"
                className="rounded-lg shadow-lg mb-6 border-4 border-blue-900 w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0 right-0 bg-black text-white text-center py-1 rounded-t-lg">
                <span className="block text-lg font-semibold">En memoria de</span>
                <span className="block text-xl font-bold">Alejandro Castillo</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-blue-900 text-white text-center py-2 rounded-b-lg">
                <h2 className="text-xl font-semibold">2DA GENERACIÓN</h2>
              </div>
            </div>
            <p className="text-lg text-gray-700 mt-4 px-4 text-left">
              En memoria de la segunda generación, liderada por el inolvidable Alejandro Castillo, quien fue más que un maestro en el taller; fue un mentor, un guía y una inspiración para todos nosotros. Su legado perdura en cada pieza que creamos y en cada lección que aprendemos. A pesar de su partida, su espíritu vive en cada uno de nosotros, recordándonos que todo esfuerzo tiene su recompensa y que las enseñanzas que nos dejó continúan dando frutos. Hoy, honramos su memoria con gratitud y admiración. Descansa en paz, tu legado perdurará por siempre.
            </p>
          </div>
          <div className="relative p-4 w-full">
            <div className="relative w-full h-96">
              <img
                src="./src/Fotos/FotoTaller2.jpg"
                alt="Taller 2"
                className="rounded-lg shadow-lg mb-6 border-4 border-blue-900 w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-blue-900 text-white text-center py-2 rounded-b-lg">
                <h2 className="text-xl font-semibold">3RA GENERACIÓN</h2>
              </div>
            </div>
            <p className="text-lg text-gray-700 mt-4 px-4 text-left">
              Hoy en día, el esfuerzo, el trabajo diario y todas las tareas cotidianas representan pilares fundamentales en nuestro camino. Cada paso que damos nos acerca un poco más a nuestros sueños y metas. Recordemos que cada desafío superado nos hace más fuertes y nos prepara para lo que está por venir. Al final del día, merecemos un buen descanso y disfrutar de la compañía de quienes nos rodean. ¡Taller Castillo les desea a todos un excelente día!
            </p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-blue-900 text-white py-10">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Taller Castillo. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}

export default Inicio;