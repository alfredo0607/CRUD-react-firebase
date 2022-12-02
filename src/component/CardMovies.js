import React from "react";
import { Link } from "react-router-dom";

export default function CardMovies({ data, deleteMovies }) {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  return (
    <div className="card movie_card">
      <img
        src={`https://picsum.photos/200/300?random=${getRandomInt(50)}`}
        className="card-img-top"
        alt="..."
      />
      <Link to={`/editar-movies/${data.id}`}>
        <button
          type="button"
          className="btn btn-warning btn-circle button_1 btn-xl"
        >
          <i className="fa-regular fa-pen-to-square"></i>
        </button>
      </Link>

      <button
        type="button"
        className="btn btn-danger btn-circle button_2 btn-xl"
        onClick={() => deleteMovies(data.id)}
      >
        <i className="fa-solid fa-trash"></i>
      </button>

      <div className="card-body">
        <h5
          className="card-title"
          style={{ fontSize: "17px", marginTop: "10px" }}
        >
          {data.titulo}
        </h5>
        <p>{data.resumen}</p>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span className="movie_info" style={{ marginRight: "3rem" }}>
            Lenguje : {data.lenguaje}
          </span>
          <span className="movie_info">votos: {data.cantidad_votos}</span>
        </div>

        <span className="movie_info">{data.lanzamiento}</span>
        <span className="movie_info float-right">
          <i className="fas fa-star" style={{ marginLeft: "3.5rem" }}></i>{" "}
          {data.rating} / 10
        </span>
      </div>
    </div>
  );
}
