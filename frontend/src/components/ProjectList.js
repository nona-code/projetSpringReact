import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    axios.get('/projects')
      .then(res => setProjects(res.data))
      .catch(() => setProjects([]));
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name.trim() || !form.description.trim()) return;

    if (editId) {
      axios.put(`/projects/${editId}`, form)
        .then(res => {
          setProjects(projects.map(p => (p.id === editId ? res.data : p)));
          setEditId(null);
          setForm({ name: '', description: '' });
        })
        .catch(() => alert("Erreur lors de la modification. Vérifiez que l'ID existe."));
    } else {
      axios.post('/projects', form)
        .then(res => setProjects([...projects, res.data]))
        .catch(() => alert("Erreur lors de l'ajout."));
    }
  };

  const handleDelete = id => {
    if (!id) {
      alert("ID invalide pour la suppression.");
      return;
    }
    axios.delete(`/projects/${id}`)
      .then(() => setProjects(projects.filter(p => p.id !== id)))
      .catch(() => alert("Erreur lors de la suppression. Vérifiez que l'ID existe."));
  };

  const handleEdit = proj => {
    setEditId(proj.id);
    setForm({ name: proj.name, description: proj.description });
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({ name: '', description: '' });
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-info text-white">
          <h2 className="mb-0">Liste des projets</h2>
        </div>
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead className="table-light">
              <tr>
                <th>Nom</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.description}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(p)}>Modifier</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 className="mt-4">{editId ? "Modifier un projet" : "Ajouter un projet"}</h3>
          <form className="row g-3 align-items-end" onSubmit={handleSubmit}>
            <div className="col-md-5">
              <label className="form-label">Nom</label>
              <input name="name" className="form-control" placeholder="Nom" value={form.name} onChange={handleChange} required />
            </div>
            <div className="col-md-5">
              <label className="form-label">Description</label>
              <input name="description" className="form-control" placeholder="Description" value={form.description} onChange={handleChange} required />
            </div>
            <div className="col-md-2 d-grid">
              <button type="submit" className="btn btn-info text-white">{editId ? "Enregistrer" : "Ajouter"}</button>
              {editId && (
                <button type="button" className="btn btn-secondary mt-2" onClick={handleCancel}>
                  Annuler
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProjectList;
