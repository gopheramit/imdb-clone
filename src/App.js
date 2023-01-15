
import './App.css';
import Home from './components/Home';
import AddMovies from './components/AddMovies';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
function App() {
  return (
    // <div>
    //   <h1>IMDB CLONE</h1>
    //   <Home/>
    // </div>
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Home/>}></Route>
      <Route path="/addMovie" exact element={<AddMovies/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
