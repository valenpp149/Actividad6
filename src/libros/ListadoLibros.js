import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function ListadoLibros() {
  let url = "http://localhost:3002/api/books";
  const [libros, setLibros] = useState([]);
  useEffect(() => {
    fetchData(url);
  }, []);

  const handleEliminar = async (id) => {
    try {
      console.log(`Valor a eliminar es ${id}`)
      const options = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "*",
          "cache-control": "no-cache",
        },
      };
      await axios.delete(
        `http://localhost:3002/api/books/${id}`,
        {
          options,
        }
      );
    } catch (error) {
      console.error("Error al eliminar libro:", error);
    }
  };

  const fetchData = async (url) => {
    //Incluir configuracion de politicas CORS para invocar componente
    //El componente remoto tambien debe tener politicas para evitar errores
    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "*",
        "cache-control": "no-cache",
      },
    };

    console.log("Llamando a componente remoto uniminuto ...");
    axios
      .get(url, {
        options,
      })
      .then(
        (response) => {
          console.log("respuesta es ");
          console.log(response.data);
          setLibros(response.data);
        },
        (error) => {
          console.log("*********** error: ");
          console.log(error);
        }
      );
  };
  return (
    <div className="mx-5">
      <div>
        <div className="mb-3">
          <Link to="/books">
            <button className="btn btn-success">Agregar libro</button>
          </Link>
        </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {libros.map((libro, index) => {
            console.log(libro);
              return [
                <div className="col" key={index}>
                <div className="card">
                  <div className="card-header">
                    {libro.author}
                  </div>
                  <div className="card-body">
                    <blockquote className="blockquote mb-0">
                      <p>{libro.name}, {libro.pages} páginas</p>
                      <footer className="blockquote-footer">Escrito en {libro.year}</footer>
                    </blockquote>
                    <div className="footer mt-3">
                    <div className="d-grid gap-2 d-md-flex">
                      <Link
                        to={`/books/${libro.ID}`}
                      >
                        <button className="btn btn-primary">
                          Actualizar
                        </button>
                        
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          handleEliminar(libro.ID)
                        }
                      >
                        Eliminar
                      </button>
                    </div>
                    </div>
                  </div>
                </div>
                </div>
              ];
            })}
          </div>
        </div>
      </div>
  );
}
