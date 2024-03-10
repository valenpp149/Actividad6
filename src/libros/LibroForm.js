import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

export function LibroForm() {
  console.log("Invocando componente formulario");
  const [estudiante, setEstudiante] = useState({
    ID: "",
    name: "",
    author: "",
    year: "",
    pages: ""
  });
  const { id } = useParams();
  //const history = useHistory();
  useEffect(() => {
    console.log("Valor estudianteId: " + id);
    if (id) {
      console.log("Invocar carga de datos: " + id);
      // Si se proporciona un ID de estudiante, cargar los datos del estudiante para la edición
      cargarDatosEstudiante(id);
    }
  }, [id]);

  const cargarDatosEstudiante = async (id) => {
    let url = `http://localhost:3002/api/books/${id}`;
    console.log("URL ES " + url);
    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "*",
        "cache-control": "no-cache",
      },
    };

    axios
      .get(url, {
        options,
      })
      .then(
        (response) => {
          console.log("respuesta es response.data:");
          console.log(response.data[0]);
          setEstudiante(response.data[0]);
        },
        (error) => {
          console.log("*********** error: ");
          console.log(error);
        }
      );
  };

  const handleChange = (e) => {
    setEstudiante({ ...estudiante, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = "";
      if (id) {
        // Si hay un ID de estudiante, realizar una solicitud de actualización
        console.log("Actualizando");
        response = await axios.put(
          `http://localhost:3002/api/books/${id}`,
          estudiante
        );
      } else {
        // Si no hay ID de estudiante, realizar una solicitud de creación
        response = await axios.post(
          "http://localhost:3002/api/books/",
          estudiante
        );
      }

      console.log("Respuesta del servidor:", response.data);
      //history.push('/');
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
  };

  return (
    <div className="mx-5 mt-4">
      <Form onSubmit={handleSubmit}>
        
        <Form.Group controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={estudiante.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="autor">
          <Form.Label>Autor</Form.Label>
          <Form.Control
            type="text"
            name="author"
            value={estudiante.author}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="fecha">
          <Form.Label>Año</Form.Label>
          <Form.Control
            type="number"
            name="year"
            value={estudiante.year}
            onChange={handleChange}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="paginas">
          <Form.Label>Páginas</Form.Label>
          <Form.Control
            type="number"
            name="pages"
            value={estudiante.pages}
            onChange={handleChange}
          />
        </Form.Group>
        <br></br>

        <Button variant="primary" type="submit">
          {id ? "Actualizar" : "Crear"}
        </Button>
      </Form>
    </div>
  );
}
