import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './SearchBar';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', departmentId: '', projectId: '' });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    axios.get('/employees')
      .then(res => setEmployees(res.data))
      .catch(() => setEmployees([]));
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      ...form,
      departmentId: form.departmentId ? Number(form.departmentId) : null,
      projectId: form.projectId ? Number(form.projectId) : null,
    };
    if (editId) {
      axios.put(`/employees/${editId}`, payload)
        .then(res => {
          setEmployees(employees.map(e => (e.id === editId ? res.data : e)));
          setEditId(null);
          setForm({ name: '', email: '', departmentId: '', projectId: '' });
        })
        .catch(() => alert("Erreur lors de la modification. Vérifiez que l'ID existe."));
    } else {
      axios.post('/employees', payload)
        .then(res => setEmployees([...employees, res.data]))
        .catch(() => alert("Erreur lors de l'ajout."));
    }
  };

  const handleDelete = id => {
    if (!id) {
      alert("ID invalide pour la suppression.");
      return;
    }
    axios.delete(`/employees/${id}`)
      .then(() => setEmployees(employees.filter(e => e.id !== id)))
      .catch(() => alert("Erreur lors de la suppression. Vérifiez que l'ID existe."));
  };

  const handleEdit = emp => {
    setEditId(emp.id);
    setForm({
      name: emp.name,
      email: emp.email,
      departmentId: emp.departmentId,
      projectId: emp.projectId
    });
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({ name: '', email: '', departmentId: '', projectId: '' });
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>Liste des employés</h2>
      <SearchBar value={search} onChange={setSearch} placeholder="Rechercher un employé..." />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Département</th>
            <th>Projet</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(e => (
            <tr key={e.id}>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.departmentId}</td>
              <td>{e.projectId}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(e)}>Modifier</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(e.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>{editId ? "Modifier un employé" : "Ajouter un employé"}</h3>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-3">
          <input name="name" className="form-control" placeholder="Nom" value={form.name} onChange={handleChange} required />
        </div>
        <div className="col-md-3">
          <input name="email" className="form-control" placeholder="Email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="col-md-3">
          <input name="departmentId" className="form-control" placeholder="Département ID" value={form.departmentId} onChange={handleChange} required />
        </div>
        <div className="col-md-3">
          <input name="projectId" className="form-control" placeholder="Projet ID" value={form.projectId} onChange={handleChange} required />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">{editId ? "Enregistrer" : "Ajouter"}</button>
          {editId && (
            <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>
              Annuler
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EmployeeList;
