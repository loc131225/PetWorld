import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ThanhToan from './pages/Thanhtoan';

function App() {
  return <>
  <Routes>
    <Route path=''>
      <Route path='thanhtoan' element={<ThanhToan/>}/>
    </Route>
  </Routes>
  </>;
}

export default App;
