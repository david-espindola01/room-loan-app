import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Students from './pages/Students';
import Rooms from './pages/Rooms';
import Loans from './pages/Loans';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div id='container'>
        <nav>
          <Link className="nav-link" to="/students">Estudiantes</Link>
          <Link className="nav-link" to="/rooms">Salas</Link>
          <Link className="nav-link" to="/loans">Préstamos</Link>
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
        </nav>


        <Routes>
          <Route path="/" element={<Students />} />
          <Route path="/students" element={<Students />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
