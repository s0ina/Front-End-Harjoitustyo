import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './App.css';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";

function App() {
  return (
    <div className="App">
    
      <BrowserRouter>
      
          <Link to="/traininglist">Trainings</Link>
       
          <Link to="/customerlist">Customers</Link>
       
      <Routes>
      <Route exact path="/traininglist" element={<Traininglist/>}/>
      <Route exact path="/customerlist" element={<Customerlist/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
