import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);

  // Charger la liste au montage
  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = () => {
    axios.get('/departments')
      .then(res => setDepartments(res.data))
      .catch(() => setDepartments([]));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editId) {
      // Modification
      axios.put(`/departments/${editId}`, { name })
        .then(res => {
          setDepartments(departments.map(d => (d.id === editId ? res.data : d)));
          setEditId(null);
          setName('');
        })
        .catch(() => alert("Erreur lors de la modification. Vérifiez que l'ID existe."));
    } else {
      // Création
      axios.post('/departments', { name })
        .then(res => {
          setDepartments([...departments, res.data]);
          setName('');
        })
        .catch(() => alert("Erreur lors de l'ajout."));
    }
  };

  const handleDelete = id => {
    if (!id) {
      alert("ID invalide pour la suppression.");
      return;
    }
    axios.delete(`/departments/${id}`)
      .then(() => setDepartments(departments.filter(d => d.id !== id)))
      .catch(() => alert("Erreur lors de la suppression. Vérifiez que l'ID existe."));
  };

  const handleEdit = dep => {
    setEditId(dep.id);
    setName(dep.name);
  };

  const handleCancel = () => {
    setEditId(null);
    setName('');
  };

  return (
    <div className="container mt-4">
      <h2>Liste des départements</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map(d => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(d)}>Modifier</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(d.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>{editId ? "Modifier un département" : "Ajouter un département"}</h3>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <input
            value={name}
            className="form-control"
            onChange={e => setName(e.target.value)}
            placeholder="Nom"
            required
          />
        </div>
        <div className="col-md-6">
          <button type="submit" className="btn btn-success">{editId ? "Enregistrer" : "Ajouter"}</button>
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

export default DepartmentList;
