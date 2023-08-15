import './App.scss';
import HomePage from './Pages/HomePage/HomePage';
import Header from './Components/Header/Header';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
      <div className='page-background'>
      <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
