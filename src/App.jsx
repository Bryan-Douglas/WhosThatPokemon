import './App.scss';
import HomePage from './Pages/HomePage/HomePage';
import Header from './Components/Header/Header';
import GamePage from './Pages/GamePage/GamePage';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className='page-background'>
          <div className='page-background__overlay'>
            <Header />
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/game' element={<GamePage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

/* ToDo 
- Set up variables and mixins.
- add linkedin and github icons to the trainer bio.
*/

/* Credits
- https://tcm.pokecharms.com/legacy?c=89e03e94-a5ab-4387-a750-1add567daaaa
- https://fontmeme.com/pokemon-font/
- https://svgcrown.com/download.php?category=pokeball&id=4
*/