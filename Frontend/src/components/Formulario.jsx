import { useEffect, useState } from "react";

const API = 'http://localhost:3000/api/users';

const Formulario = () => {
  const [datos, setDatos] = useState([]);

  const getDatos = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      console.log(data);
      setDatos(data); // Cambiado para usar data directamente
    } catch (error) {
      console.error(error);
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevenir el comportamiento predeterminado

    // Obtener los valores del formulario
    const nombreSolicitante = document.getElementById("nombre").value;
    console.log("Nombre del solicitante:", nombreSolicitante);  // Verifica el valor

    const area = document.getElementById("area").value;
    const descripcion = document.getElementById("descripcion").value;
    const prioridad = document.getElementById("prioridad").value;
    const fechaProgramada = document.getElementById("fecha").value;

    // Crear un objeto con los datos del formulario
    const nuevaSolicitud = {
      fecha_solicitud: new Date().toISOString(),
      fecha_programada: fechaProgramada || null,
      area,
      descripcion,
      estado: "Pendiente", // Estado inicial
      prioridad,
      nombre_solicitante: nombreSolicitante
    };

    try {
      // Enviar la nueva solicitud a la API
      const response = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaSolicitud)
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      }

      // Volver a obtener los datos después de enviar la solicitud
      getDatos();

      // Limpiar el formulario
      document.getElementById("mantenimientoForm").reset();
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };


  useEffect(() => {
    getDatos();
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="text-center">Solicitud de Mantenimiento</h1>
        <form id="mantenimientoForm" onSubmit={handleSubmit}>
          <div className="row g-3"> {/* Start of the row for columns */}
            {/* Nombre del Solicitante */}
            <div className="col-md-6">
              <label htmlFor="nombre" className="form-label">Nombre del Solicitante:</label>
              <input type="text" className="form-control" id="nombre" required />
            </div>

            {/* Área o Equipo */}
            <div className="col-md-6">
              <label htmlFor="area" className="form-label">Área o Equipo:</label>
              <select className="form-select" id="area" required>
                <option value="">Seleccione...</option>
                <option value="muelles">Muelles</option>
                <option value="barcos">Barcos</option>
                <option value="equipos">Equipos de Carga</option>
              </select>
            </div>

            {/* Descripción del Problema */}
            <div className="col-md-12">
              <label htmlFor="descripcion" className="form-label">Descripción del Problema:</label>
              <textarea className="form-control" id="descripcion" rows={3} required defaultValue={""} />
            </div>

            {/* Prioridad */}
            <div className="col-md-6">
              <label htmlFor="prioridad" className="form-label">Prioridad:</label>
              <select className="form-select" id="prioridad">
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>
            </div>

            {/* Fecha Deseada para Mantenimiento */}
            <div className="col-md-6">
              <label htmlFor="fecha" className="form-label">Fecha Deseada para Mantenimiento:</label>
              <input type="date" className="form-control" id="fecha" required />
            </div>
          </div> {/* End of the row */}

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary mt-3">Enviar Solicitud</button>
        </form>

        {/* Historial */}
        <h2 className="mt-5">Historial de Mantenimientos</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha Solicitud</th>
              <th>Fecha Programada</th>
              <th>Área/Equipo</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Prioridad</th>
              <th>Nombre Solicitante</th> {/* Nueva columna para el nombre del solicitante */}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody id="historialTableBody">
            {datos && datos.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.fecha_solicitud}</td>
                  <td>{item.fecha_programada ? item.fecha_programada : 'No programada'}</td>
                  <td>{item.area}</td>
                  <td>{item.descripcion}</td>
                  <td>{item.estado}</td>
                  <td>{item.prioridad}</td>
                  <td>{item.nombre_solicitante ? item.nombre_solicitante : 'No especificado'}</td> {/* Mostrar nombre del solicitante */}
                  <td>
                    {/* Aquí puedes agregar botones para editar o eliminar */}
                    <button className="btn btn-warning">Editar</button>
                    <button className="btn btn-danger">Eliminar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

      </div>

    </>
  );
}

export default Formulario;