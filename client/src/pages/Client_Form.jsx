import React, {useState, useEffect} from "react";
import Axios from "axios";

/*Styles*/
import "bootstrap/dist/css/bootstrap.min.css";

export const Client_Form = () => {
  const [fecha, setFecha] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [edad, setEdad] = useState('')
  const [telefono, setTelefono] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [direccion, setDireccion] = useState('')
  const [vivienda, setVivienda] = useState('')
  const [correo, setCorreo] = useState('')
  const [ocupacion, setOcupacion] = useState('')
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:4000/api/Solicitud/get').then((response) => {
        setSolicitudes(response.data);
    });
  }, []);

  const getFechaActual = (fechaActual) => {
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    setFecha(hoy.toISOString())
  }

  //Insert
  const enviarSolicitud = () => {
      Axios.post('http://localhost:4000/api/Solicitud/insert', {
        fechaSolicitud : fecha,
        nombre : nombre,
        apellido : apellido,
        edad : edad,
        telefono : telefono,
        ciudad : ciudad,
        direccion : direccion,
        tipo_vivienda : vivienda,
        correo : correo,
        ocupacion : ocupacion
      });
      
      setSolicitudes([
          ...solicitudes, {
            fecha_solicitud : fecha,
            nombre : nombre,
            apellido : apellido,
            edad : edad,
            telefono : telefono,
            ciudad : ciudad,
            direccion : direccion,
            tipo_vivienda : vivienda,
            correo : correo,
            ocupacion : ocupacion
          },
      ])
      alert("Solicitud enviada");
  };

        return (
            <section className="container w-75 bg-light mt-4 ">
            <br /><br/>
          <div className="py-5 text-center">        
            <h2>¿Un nuevo miembro en la familia?</h2>
            <p className="mb-4 pb-2">Por favor llena el siguiente formulario con tus datos personales e información acerca de las condiciones de adopción.</p>
          </div>
      
          <div className="row g-5">
            <div className="col-md-7 col-lg-8">
              <form method="POST">
                <div className="row g-3">
  
                <div className="col-sm-12">
                    <label htmlFor="txtNombre" className="form-label">Nombre: </label>
                    <input type="text" className="form-control" id="Nombre" required
                    onChange={(e) => {setNombre(e.target.value)}}/>
                  </div>
    
                  <div className="col-sm-6">
                    <label htmlFor="txtApellido" className="form-label">Apellido:: </label>
                    <input type="text" className="form-control" id="Apellido" required
                    onChange={(e) => {setApellido(e.target.value)}}/>
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="txtFecha" className="form-label">Edad: </label>
                    <input type="number" className="form-control" id="Fecha" required
                    onChange={(e) => {setEdad(e.target.value)}}/>
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="txtContacto" className="form-label">Contacto:</label>
                    <input type="text" className="form-control" id="Contacto" required
                    onChange={(e) => {setTelefono(e.target.value)}}/>
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="txtCorreo" className="form-label">Correo:</label>
                    <input type="email" className="form-control" id="Correo" required
                    onChange={(e) => {setCorreo(e.target.value)}}/>
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="txtOcupacion" className="form-label">Ocupación:</label>
                    <input type="text" className="form-control" id="Ocupacion" required
                    onChange={(e) => {setOcupacion(e.target.value)}}/>
                  </div>
                  <div className="col-sm-10">
                    <label htmlFor="txtDireccion" className="form-label">Dirección exacta del lugar donde permanecerá el animal::</label>
                    <input type="text" className="form-control" id="Direccion" required
                    onChange={(e) => {setDireccion(e.target.value)}}/>
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="txtSector" className="form-label">Sector:</label>
                    <input type="text" className="form-control" id="Sector" required
                    onChange={(e) => {setCiudad(e.target.value)}}/>
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="txtInmueble" className="form-label">Tipo de inmueble: </label>
                    <select className="form-select border-0" name="inmueble" id="inmueble"
                    onChange={(e) => {setVivienda(e.target.value)}}>
                      <option defaultValue>Seleccione</option>
                      <option value="Casa">Casa</option>
                      <option value="Departamento">Departamento</option>
                      <option value="Finca">Finca</option>
                  </select>                
                  </div>
                </div>         
                <hr className="my-4"/>    
                <div className="row">
                  <div className="col-sm-4">
                      <button type="button" className="w-100 btn btn-success btn-lg" onClick={enviarSolicitud}>Guardar</button>
                    </div>
                </div>   
              </form>
            </div>
          </div><br /><br />
        </section>
      
      );
  }