/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { Link, useNavigate, useParams } from "react-router-dom";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);

export default function CreateMoviesForm({ type }) {
  const { id } = useParams();

  const [value, setvalue] = useState({
    titulo: "",
    lenguaje: "",
    rating: "",
    fecha: "",
    resumen: "",
    calificacion: "",
  });

  const [error, seterror] = useState({
    titulo: "",
    lenguaje: "",
    rating: "",
    fecha: "",
    resumen: "",
    calificacion: "",
  });

  const navigate = useNavigate();

  const [adulto, setadulto] = useState(false);

  const changeData = (e) => {
    setvalue({ ...value, [e.target.name]: e.target.value });
  };

  const moviesCollection = collection(db, "movies");

  const crearMovies = async (e) => {
    e.preventDefault();

    if (type === "crear") {
      await addDoc(moviesCollection, {
        titulo: value.titulo,
        resumen: value.resumen,
        adulto: adulto,
        cantidad_votos: value.calificacion,
        rating: value.rating,
        lenguaje: value.lenguaje,
        lanzamiento: value.fecha,
      });
      alertSucces();
    }

    if (type === "editar") {
      const movies = doc(db, "movies", id);

      const data = {
        titulo: value.titulo,
        resumen: value.resumen,
        adulto: adulto,
        cantidad_votos: value.calificacion,
        rating: value.rating,
        lenguaje: value.lenguaje,
        lanzamiento: value.fecha,
      };

      updateDoc(movies, data);
      alertSucces();
    }

    navigate("/");
  };

  const limpiarErrores = (data) => {
    if (data === "titulo") {
      seterror({ ...error, titulo: "" });
    }

    if (data === "lenguaje") {
      seterror({ ...error, lenguaje: "" });
    }

    if (data === "rating") {
      seterror({ ...error, rating: "" });
    }

    if (data === "fecha") {
      seterror({ ...error, fecha: "" });
    }

    if (data === "resumen") {
      seterror({ ...error, resumen: "" });
    }

    if (data === "calificacion") {
      seterror({ ...error, calificacion: "" });
    }
  };

  const validarInput = (e) => {
    e.preventDefault();

    if (value?.titulo === "") {
      seterror({ ...error, titulo: "El titulo es un campo obligatorio" });
      return;
    }

    if (value?.lenguaje === "") {
      seterror({ ...error, lenguaje: "El lenguaje es un campo obligatorio" });
      return;
    }

    if (value?.rating === "") {
      seterror({ ...error, rating: "El rating es un campo obligatorio" });
      return;
    }

    if (value?.fecha === "") {
      seterror({ ...error, fecha: "La fecha es un campo obligatorio" });
      return;
    }

    if (value?.resumen === "") {
      seterror({ ...error, resumen: "El resumen es un campo obligatorio" });
      return;
    }

    if (value?.calificacion === "") {
      seterror({
        ...error,
        calificacion: "La calificacion es un campo obligatorio",
      });
      return;
    }

    crearMovies(e);
  };

  const limpiarErroresForm = (data) => {
    limpiarErrores(data);
  };

  const alertSucces = () => {
    MySwal.fire({
      position: "center",
      icon: "success",
      title: "Pelicula registrada con exito",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const obtenerMoviesUpdate = async () => {
    const moviesUpdate = await getDoc(doc(db, "movies", id));

    if (moviesUpdate.exists()) {
      setvalue({
        titulo: moviesUpdate.data().titulo,
        lenguaje: moviesUpdate.data().lenguaje,
        rating: Number(moviesUpdate.data().rating),
        fecha: moviesUpdate.data().lanzamiento,
        resumen: moviesUpdate.data().resumen,
        calificacion: Number(moviesUpdate.data().cantidad_votos),
      });
      setadulto(moviesUpdate.data().adulto);
    } else {
      console.log("No exite la pelicual");
    }
  };

  useEffect(() => {
    if (type === "editar") {
      obtenerMoviesUpdate();
    }
  }, [type]);

  return (
    <div>
      <div>
        <div className="d-flex justify-content-start">
          <h2 className="text-center">Agregar una nueva pelicula</h2>
        </div>
        <form className="m-5" onSubmit={validarInput}>
          <div className="row">
            <div className="col">
              <label htmlFor="titulo">Titulo</label>
              <input
                value={value.titulo}
                type="text"
                name="titulo"
                onChange={changeData}
                className="form-control"
                placeholder="Titulo"
                onKeyDown={() => limpiarErroresForm("titulo")}
              />
              {error.titulo && (
                <small id="emailHelp" className="form-text text-danger">
                  {error.titulo}
                </small>
              )}
            </div>
            <div className="col">
              <label htmlFor="lenguaje">Lenguaje</label>
              <input
                value={value.lenguaje}
                name="lenguaje"
                onChange={changeData}
                type="text"
                className="form-control"
                placeholder="Lenguaje"
                onKeyDown={() => limpiarErroresForm("lenguaje")}
              />
              {error.lenguaje && (
                <small id="emailHelp" className="form-text text-danger">
                  {error.lenguaje}
                </small>
              )}
            </div>
          </div>

          <div className="row mt-5">
            <div className="col">
              <label htmlFor="rating">Rating 1/10</label>
              <input
                value={value.rating}
                name="rating"
                onChange={changeData}
                type="number"
                className="form-control"
                placeholder="Rating"
                onKeyDown={() => limpiarErroresForm("rating")}
              />
              {error.rating && (
                <small id="emailHelp" className="form-text text-danger">
                  {error.rating}
                </small>
              )}
            </div>
            <div className="col">
              <label htmlFor="fecha">Fecha de lanzamiento</label>
              <input
                value={value.fecha}
                name="fecha"
                onChange={changeData}
                type="date"
                className="form-control"
                onKeyDown={() => limpiarErroresForm("fecha")}
              />
              {error.fecha && (
                <small id="emailHelp" className="form-text text-danger">
                  {error.fecha}
                </small>
              )}
            </div>
          </div>

          <div className="row mt-5">
            <div className="col">
              <div className="form-group">
                <label htmlFor="resumen">Resumen de la pelicula</label>
                <textarea
                  value={value.resumen}
                  name="resumen"
                  onChange={changeData}
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  onKeyDown={() => limpiarErroresForm("resumen")}
                ></textarea>

                {error.resumen && (
                  <small id="emailHelp" className="form-text text-danger">
                    {error.resumen}
                  </small>
                )}
              </div>
            </div>
            <div className="col">
              <label htmlFor="calificacion">Ingresa tu calificacion</label>
              <input
                type="text"
                name="calificacion"
                value={value.calificacion}
                onChange={changeData}
                className="form-control"
                placeholder="Ingresa tus votos"
                onKeyDown={() => limpiarErroresForm("calificacion")}
              />
              {error.calificacion && (
                <small id="emailHelp" className="form-text text-danger">
                  {error.calificacion}
                </small>
              )}
              <div className="form-check form-switch mt-4">
                <input
                  value={adulto}
                  checked={adulto}
                  onChange={(e) => setadulto(e.target.checked)}
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckChecked"
                />
                <label htmlFor="adulto" className="form-check-label">
                  ¿La pelicula es para mayores de edad?
                </label>
              </div>
            </div>
          </div>

          <div className="m-4">
            <button className="btn btn-primary">Guardar</button>

            <Link to={"/"}>
              <button className="btn btn-secondary m-2">Atras</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
