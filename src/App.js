import './App.css';
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Trainlist from './components/Trainlist';
import Frontpage from './components/Frontpage';
import Custlist from './components/Custlist';
import Scheduler from './components/Scheduler';
import Stats from './components/Stats';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Personal trainer
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <div>
          <Link to="/">Home</Link>{' '}
          <Link to="/components/trainlist">Training list</Link>{' '}
          <Link to="/components/custlist">Customer list</Link>{' '}
          <Link to="/components/scheduler">Training calendar</Link>{' '}
          <Link to="/components/stats">Activity Statistics</Link>{' '}
          <Routes>
            <Route exact path="/" element={<Frontpage />} />
            <Route path="/components/trainlist" element={<Trainlist />} />
            <Route path="/components/custlist" element={<Custlist />} />
            <Route path="/components/scheduler" element={<Scheduler />} />
            <Route path="/components/stats" element={<Stats />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
