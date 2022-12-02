import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewHome from "./component/ViewHome";
import CreateMoviesForm from "./component/CreateMoviesForm";

function App() {
  return (
    <div className="container mt-5">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ViewHome />} />
          <Route
            path="/editar-movies/:id"
            element={<CreateMoviesForm type={"editar"} />}
          />
          <Route
            path="/crear-movies"
            element={<CreateMoviesForm type={"crear"} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
