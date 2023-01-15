import React from "react";
import "./Home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  let naviage = useNavigate();
  const [actors, setActors] = useState([]);
  const [producers, setProducers] = useState([]);
  const getAllActors = () => {
    axios.get("http://localhost:8080/actors").then((res) => {
      setActors(res.data[0]);
      //console.log(actors)
    });
  };

  const getAllProducers = () => {
    axios.get("http://localhost:8080/producers").then((res) => {
      setProducers(res.data[0]);
      //console.log(producers)
    });
  };
  let actorsList =
    actors.length > 0 &&
    actors.map((item, i) => {
      return (
        <option key={i} value={item.ID}>
          {item.Name}
        </option>
      );
    });

  let producersList =
    producers.length > 0 &&
    producers.map((item, i) => {
      return (
        <option key={i} value={item.ID}>
          {item.Name}
        </option>
      );
    });
  const [movie, setMovie] = useState({
    id: 0,
    name: "",
    yearOfRelease: 0,
    plot: "",
    producerId: 0,
    actors: [],
  });
  const [movies, setMovies] = useState([]);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const getMovieDetails = () => {
    axios.get("http://localhost:8080/movies").then((res) => {
      //setMovies(res.data[0]);
      //console.log(movies, "res");
      formatMovies(res.data[0]);
    });
  };

  const formatMovies = (movieArray) => {
    let formatedMovieArray = [];
    let moviesId = [];
    let movie = {
      id: 0,
      name: "",
      YearOfRelease: 0,
      plot: "",
      producerName: "",
      actorName: [],
    };
    movieArray.forEach((element) => {
      //console.log(element,"element")
      //console.log(element.id,!(element.id in moviesId))
      if (!moviesId.includes(element.id)) {
        //console.log(element.id )
        let actors = [];
        moviesId.push(element.id);
        movie.id = element.id;
        movie.name = element.name;
        movie.YearOfRelease = element.YearOfRelease;
        movie.plot = element.Plot;
        movie.producerName = element.producerName;
        actors.push(element.actorName);
        movie.actorName = actors;
        let temp = { ...movie };
        formatedMovieArray.push(temp);
      } else {
        let tempMovie = formatedMovieArray.find(
          (item) => item.id === element.id
        );
        tempMovie.actorName.push(element.actorName);
      }
    });
    // console.log(formatedMovieArray,"formatedMoviesArray");
    setMovies(formatedMovieArray);
    //console.log(movies, "finalMovies");
  };
  const editMovie = (id) => {
    setShowEditPanel(!showEditPanel);
    setMovie({...movie,id:id})
  };
  useEffect(() => {
    getMovieDetails();
    getAllProducers();
    getAllActors();
  }, []);
  const addNewMovie = () => {
    naviage("/addMovie");
  };
  const selectActor = (e) => {
    let actorTemp = [];
    actorTemp.push(parseInt(e.target.value));
    setMovie({ ...movie, actors: actorTemp });
  };

  const selectProducer = (e) => {
    let producerTemp = parseInt(e.target.value);
    console.log(producerTemp, "found the correct producer id");
    setMovie({ ...movie, producerId: producerTemp });
  };
  const editMovieDetails = (e) => {
    e.preventDefault();
    console.log(movie, "movie to edited");
    axios
    .put("http://localhost:8080/movies", movie)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  };
  console.log(movies, "finalMovies");
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Year Of Release</th>
            <th scope="col">Plot</th>
            <th scope="col">Actor Name</th>
            <th scope="col">Producer Name</th>
          </tr>
        </thead>
      </table>
      {movies.map((item) => (
        <div className="blog-priview" key={item.id}>
          <h2>{item.name}</h2>
          <p>{item.actorName}</p>
          <button onClick={() => editMovie(item.id)}>Edit Details</button>
          {showEditPanel ? (
            <div>
              <form onSubmit={editMovieDetails}>
                {" "}
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setMovie({ ...movie, name: e.target.value })
                    }
                  ></input>
                </div>
                <div>
                  <label>Yeat OF Release</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setMovie({ ...movie, yearOfRelease: e.target.value })
                    }
                  ></input>
                </div>
                <div>
                  {" "}
                  <label>Plot</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setMovie({ ...movie, plot: e.target.value })
                    }
                  ></input>
                </div>
                <div>
                  <select onChange={selectActor}>{actorsList}</select>
                </div>
                <div>
                  <select onChange={selectProducer}>{producersList}</select>
                </div>
                <button> Edit Movie</button>
              </form>
            </div>
          ) : (
            <></>
          )}
        </div>
      ))}

      <button onClick={addNewMovie}>Add New Movie</button>
    </div>
  );
}

export default Home;
