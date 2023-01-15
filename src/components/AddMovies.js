import React, { useEffect } from "react";
import "./AddMovies.css";
import { useState } from "react";
import axios from "axios";

function AddMovies() {
  const [actor, setActor] = useState({
    Name: "",
    Gender: "",
    dob: "",
    Bio: "",
  });
  const [producer, setProducer] = useState({
    Name: "",
    Gender: "",
    dob: "",
    Bio: "",
  });
  const [movie, setMovie] = useState({
    name: "",
    yearOfRelease: 0,
    plot: "",
    producerId: 0,
    actors: [],
  });

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

  useEffect(() => {
    getAllActors();
    getAllProducers();
  }, []);
  const addActor = (e) => {
    e.preventDefault();
    console.log(actor, "actor");
    axios
      .post("http://localhost:8080/actors", actor)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const addProducer = (e) => {
    e.preventDefault();
    console.log(producer, "producer");
    axios
      .post("http://localhost:8080/producers", producer)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addMovie = (e) => {
    e.preventDefault();
    console.log(movie,"movie to be posted")
    axios
    .post("http://localhost:8080/movies", movie)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    
  };

  let actorsList = actors.length > 0
		&& actors.map((item, i) => {
		return (
			<option key={i} value={item.ID}>{item.Name}</option>
		)})

  let producersList = producers.length > 0
		&& producers.map((item, i) => {
		return (
			<option key={i} value={item.ID}>{item.Name}</option>
		)})
  // console.log(actors,"actorList")
  // console.log(producers,"producers")
const selectActor=(e)=>{
  let actorTemp=[];
  actorTemp.push(parseInt(e.target.value));
  setMovie({...movie,actors:actorTemp});
}

const selectProducer=(e)=>{
  let producerTemp=parseInt(e.target.value);
  console.log(producerTemp,"found the correct producer id")
  setMovie({...movie,producerId:producerTemp});
}
  return (
    <div>
      AddMovies
      <div className="actor-continer">
        <form onSubmit={addActor}>
          {" "}
          <div>
            <label>Name</label>
            <input
              type="text"
              onChange={(e) => setActor({ ...actor, Name: e.target.value })}
            ></input>
          </div>
          <div>
            <label>Gender</label>
            <input
              type="text"
              onChange={(e) => setActor({ ...actor, Gender: e.target.value })}
            ></input>
          </div>
          {/* <div>
            {" "}
            <label>DOB</label>
            <input type="date"></input>
          </div> */}
          <div>
            {" "}
            <label>Bio</label>
            <input
              type="text"
              onChange={(e) => setActor({ ...actor, Bio: e.target.value })}
            ></input>
          </div>
          <button>Add Actor</button>
        </form>
      </div>
      <div className="producer-continer">
        <form onSubmit={addProducer}>
          {" "}
          <div>
            <label>Name</label>
            <input
              type="text"
              onChange={(e) =>
                setProducer({ ...producer, Name: e.target.value })
              }
            ></input>
          </div>
          <div>
            <label>Gender</label>
            <input
              type="text"
              onChange={(e) =>
                setProducer({ ...producer, Gender: e.target.value })
              }
            ></input>
          </div>
          {/* <div>
            {" "}
            <label>DOB</label>
            <input type="date"></input>
          </div> */}
          <div>
            {" "}
            <label>Bio</label>
            <input
              type="text"
              onChange={(e) =>
                setProducer({ ...producer, Bio: e.target.value })
              }
            ></input>
          </div>
          <button>Add Producer</button>
        </form>
      </div>
      <div className="movies-continer">
        <form onSubmit={addMovie}>
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
          {/* <div>
            {" "}
            <label>DOB</label>
            <input type="date"></input>
          </div> */}
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
            <select  onChange={selectActor}>
                {actorsList}
              </select>
          </div>
          <div>
            <select onChange={selectProducer}>
                {producersList}
              </select>
          </div>
          <button>Add Movie</button>
        </form>
      </div> 
    </div>
  );
}

export default AddMovies;
