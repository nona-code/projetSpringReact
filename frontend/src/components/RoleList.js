import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RoleList() {
  const [roles, setRoles] = useState([]);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => { loadRoles(); }, []);
  const loadRoles = () => {
    axios.get('/roles').then(res => setRoles(res.data)).catch(() => setRoles([]));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!name.trim()) return;
    if (editId) {
      axios.put(`/roles/${editId}`, { name })
        .then(res => {
          setRoles(roles.map(r => (r.id === editId ? res.data : r)));
          setEditId(null); setName('');
        });
    } else {
      axios.post('/roles', { name })
        .then(res => { setRoles([...roles, res.data]); setName(''); });
    }
  };

  const handleDelete = id => {
    if (!id) return;
    axios.delete(`/roles/${id}`)
      .then(() => setRoles(roles.filter(r => r.id !== id)));
  };

  const handleEdit = role => { setEditId(role.id); setName(role.name); };
  const handleCancel = () => { setEditId(null); setName(''); };

  return (
    <div className="container mt-4">
      <h2>Liste des rôles</h2>
      <table className="table table-striped">
        <thead>
          <tr><th>Nom</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {roles.map(r => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(r)}>Modifier</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(r.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>{editId ? "Modifier un rôle" : "Ajouter un rôle"}</h3>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <input value={name} className="form-control" onChange={e => setName(e.target.value)} placeholder="Nom" required />
        </div>
        <div className="col-md-6">
          <button type="submit" className="btn btn-success">{editId ? "Enregistrer" : "Ajouter"}</button>
          {editId && (
            <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>Annuler</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default RoleList;
