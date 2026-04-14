import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import NavBar from './components/NavBar';
import "./css/App.css";
import { MovieProvider } from './context/MovieContext';
import MovieDetails from './pages/MovieDetails';

function App() {
  

  return (
    <MovieProvider>
      <NavBar />
   <main className='main-contemt'>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/favorites" element={<Favorites/>} />
      <Route path="/movie/:id" element={<MovieDetails />} /> 
    </Routes>
   </main>
   </MovieProvider>
  );
}

export default App;