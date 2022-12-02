/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "@firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import CardMovies from "./CardMovies";
import Header from "./Header";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);

export default function ViewHome() {
  const [movies, setMovies] = useState([]);
  const [loading, setloading] = useState(false);

  const moviesCollection = collection(db, "movies");

  const getMovies = async () => {
    setloading(true);
    const data = await getDocs(moviesCollection);
    setMovies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setloading(false);
  };

  const deleteMovies = async (id) => {
    const moviesDoc = doc(db, "movies", id);
    await deleteDoc(moviesDoc);
    getMovies();
  };

  const alertDelete = (id) => {
    MySwal.fire({
      title: "Estas segur@?",
      text: "No podrás revertir esto.!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMovies(id);
        Swal.fire("Eliminado!", "Su archivo ha sido eliminado.", "success");
      }
    });
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <div className="row">
          {movies.length !== 0 &&
            movies.map((data) => (
              <div key={data.id} className="col-sm">
                <CardMovies data={data} deleteMovies={alertDelete} />
              </div>
            ))}
        </div>

        {!loading && movies.length === 0 && (
          <div className="text-center m-5">
            <h2>No hay peliculas registradas</h2>
          </div>
        )}

        {loading && movies.length === 0 && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
