import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './App.css';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({

  navContainer: {
    display: 'flex',
    listStyle: 'none',
    paddingLeft: 0,
    margin: 0,
  },
  navLink: {
    textDecoration: 'none',
    margin: theme.spacing(1),
    '&.active': {
      fontWeight: 'bold',
      borderBottom: '2px solid #fff',
    },
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <AppBar position = "static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Training App
        </Typography>
      </Toolbar>
      </AppBar>
      <BrowserRouter>
      <ul className={classes.navContainer}>
          <li>
            <NavLink to="/traininglist" className={classes.navLink}>
              Trainings
            </NavLink>
          </li>
          <li>
            <NavLink to="/customerlist" className={classes.navLink}>
              Customers
            </NavLink>
          </li>
        </ul>
  <Routes>
  <Route exact path="/traininglist" element={<Traininglist/>}/>
  <Route exact path="/customerlist" element={<Customerlist/>}/>
  </Routes>
  </BrowserRouter>
    
      
      
    </div>
  );
}

export default App;
