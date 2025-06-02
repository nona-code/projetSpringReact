import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SkillList() {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => { loadSkills(); }, []);
  const loadSkills = () => {
    axios.get('/skills').then(res => setSkills(res.data)).catch(() => setSkills([]));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!name.trim()) return;
    if (editId) {
      axios.put(`/skills/${editId}`, { name })
        .then(res => {
          setSkills(skills.map(s => (s.id === editId ? res.data : s)));
          setEditId(null); setName('');
        });
    } else {
      axios.post('/skills', { name })
        .then(res => { setSkills([...skills, res.data]); setName(''); });
    }
  };

  const handleDelete = id => {
    if (!id) return;
    axios.delete(`/skills/${id}`)
      .then(() => setSkills(skills.filter(s => s.id !== id)));
  };

  const handleEdit = skill => { setEditId(skill.id); setName(skill.name); };
  const handleCancel = () => { setEditId(null); setName(''); };

  return (
    <div className="container mt-4">
      <h2>Liste des compétences</h2>
      <table className="table table-striped">
        <thead>
          <tr><th>Nom</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {skills.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(s)}>Modifier</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>{editId ? "Modifier une compétence" : "Ajouter une compétence"}</h3>
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

export default SkillList;
