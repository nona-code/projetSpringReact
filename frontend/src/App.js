import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import DepartmentList from './components/DepartmentList';
import ProjectList from './components/ProjectList';
import OfficeList from './components/OfficeList';
import RoleList from './components/RoleList';
import SkillList from './components/SkillList';
import SearchBar from './components/SearchBar';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import './App.css';

function Dashboard() {
  // Exemple de données statiques, à remplacer par des appels API si besoin
  const stats = [
    { label: "Employés", value: 12, color: "primary" },
    { label: "Départements", value: 4, color: "success" },
    { label: "Projets", value: 7, color: "info" },
    { label: "Bureaux", value: 3, color: "secondary" },
    { label: "Rôles", value: 5, color: "dark" },
    { label: "Compétences", value: 8, color: "warning" }
  ];

  return (
    <div className="container mt-4" style={{ background: "#f8fafc", borderRadius: 12, padding: 24 }}>
      <h1 className="mb-4">Bienvenu sur notre site de gestion des ressources d'une entreprise</h1>
      {/* Histogramme Bootstrap */}
      <div className="mb-5">
        <h4>Statistiques des ressources</h4>
        <div style={{maxWidth: 600}}>
          {stats.map(stat => (
            <div key={stat.label} className="mb-2">
              <div className="d-flex justify-content-between">
                <span>{stat.label}</span>
                <span>{stat.value}</span>
              </div>
              <div className="progress" style={{height: 20}}>
                <div
                  className={`progress-bar bg-${stat.color}`}
                  role="progressbar"
                  style={{width: `${stat.value * 10}%`}}
                  aria-valuenow={stat.value}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Employés</h5>
              <p className="card-text">Gérez les employés de l'entreprise.</p>
              <Link to="/employees" className="btn btn-primary">Voir les employés</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Départements</h5>
              <p className="card-text">Gérez les départements de l'entreprise.</p>
              <Link to="/departments" className="btn btn-success">Voir les départements</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Projets</h5>
              <p className="card-text">Gérez les projets de l'entreprise.</p>
              <Link to="/projects" className="btn btn-info">Voir les projets</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Bureaux</h5>
              <p className="card-text">Gérez les bureaux de l'entreprise.</p>
              <Link to="/offices" className="btn btn-secondary">Voir les bureaux</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Rôles</h5>
              <p className="card-text">Gérez les rôles de l'entreprise.</p>
              <Link to="/roles" className="btn btn-dark">Voir les rôles</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Compétences</h5>
              <p className="card-text">Gérez les compétences de l'entreprise.</p>
              <Link to="/skills" className="btn btn-info">Voir les compétences</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login'); // 'login' | 'register' | 'profile'

  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Entreprise</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/employees">Employés</Link>
            <Link className="nav-link" to="/departments">Départements</Link>
            <Link className="nav-link" to="/projects">Projets</Link>
            <Link className="nav-link" to="/offices">Bureaux</Link>
            <Link className="nav-link" to="/roles">Rôles</Link>
            <Link className="nav-link" to="/skills">Compétences</Link>
          </div>
        </div>
      </nav>
      <div>
        {/* <SearchBar value={globalSearch} onChange={setGlobalSearch} placeholder="Recherche globale..." /> */}
        {view === 'login' && <Login onLogin={u => { setUser(u); setView('profile'); }} />}
        {view === 'register' && <Register onRegister={u => { setUser(u); setView('profile'); }} />}
        {view === 'profile' && <Profile user={user} />}
        <button onClick={() => setView('login')}>Connexion</button>
        <button onClick={() => setView('register')}>Inscription</button>
        {user && <button onClick={() => { setUser(null); setView('login'); }}>Déconnexion</button>}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/departments" element={<DepartmentList />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/offices" element={<OfficeList />} />
          <Route path="/roles" element={<RoleList />} />
          <Route path="/skills" element={<SkillList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
