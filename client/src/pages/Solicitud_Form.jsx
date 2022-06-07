import React, { useState, useEffect } from "react";
import Axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";


export const Solicitud_Form = () => {

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
          <br /><br />
        <div className="py-5 text-center">        
          <h2>Registro de Adopción</h2>
        </div>
    
        <div className="row g-5">
          <div className="col-md-7 col-lg-8">
            <hr className="my-2"/>
            <form method="POST">
              <div className="row g-3">

              <div className="col-sm-12">
                  <label htmlFor="txtFecha" className="form-label">Fecha Solicitud: </label>
                  <input type="date" className="form-control" id="Fecha" required
                  onChange={(e) => {setFecha(e.target.value)}}
                  />
                </div>
  
                <div className="col-sm-6">
                  <label htmlFor="txtnombre" className="form-label">Nombre: </label>
                  <input type="text" className="form-control" id="Nombre" required
                  onChange={(e) => {setNombre(e.target.value)}}
                  />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="txtApellido" className="form-label">Apellido: </label>
                  <input type="text" className="form-control" id="Apellido" required
                  onChange={(e) => {setApellido(e.target.value)}}
                  />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="txtTelefono" className="form-label">Telefono: </label>
                  <input type="text" className="form-control" id="Telefono" required
                  onChange={(e) => {setTelefono(e.target.value)}}
                  />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="txtCiudad" className="form-label">Ciudad: </label>
                  <input type="text" className="form-control" id="Ciudad" required
                  onChange={(e) => {setCiudad(e.target.value)}}
                  />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="txtDireccion" className="form-label">Direccion: </label>
                  <input type="text" className="form-control" id="Direccion" required
                  onChange={(e) => {setDireccion(e.target.value)}}
                  />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="txtVivienda" className="form-label">Vivienda: </label>
                  <input type="text" className="form-control" id="Vivienda" required
                  onChange={(e) => {setVivienda(e.target.value)}}
                  />
                </div>
                
              </div>         
              <hr className="my-4"/>    
              <div className="row">
                <div className="col-sm-4">
                    <button type="button" className="w-100 btn btn-success btn-lg" onClick={enviarSolicitud}>Guardar</button>
                  </div>
                  <div className="col-sm-4">
                    <button type="button" className="w-100 btn  btn-warning btn-lg">Modificar</button>
                  </div>
                  <div className="col-sm-4">
                    <button type="button" className="w-100 btn btn-danger btn-lg">Eliminar</button>
                  </div>
              </div>   
            </form>
          </div>
        </div><br /><br />
      </section>
  );
}
