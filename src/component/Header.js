import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div
            className="col-sm "
            style={{ width: "100%", display: "flex", justifyContent: "start" }}
          >
            <h1 className="text-center">Tus peliculas favoritas</h1>
          </div>

          <div
            className="col-sm"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Link to={"/crear-movies"}>
              <button className="btn btn-primary mt-2">
                Registrar nueva pelicula
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
