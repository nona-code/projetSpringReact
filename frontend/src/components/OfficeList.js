import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';

function OfficeList() {
  const [offices, setOffices] = useState([]);
  const [location, setLocation] = useState('');
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => { loadOffices(); }, []);
  const loadOffices = () => {
    axios.get('/offices').then(res => setOffices(res.data)).catch(() => setOffices([]));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!location.trim()) return;
    if (editId) {
      axios.put(`/offices/${editId}`, { location })
        .then(res => {
          setOffices(offices.map(o => (o.id === editId ? res.data : o)));
          setEditId(null); setLocation('');
        });
    } else {
      axios.post('/offices', { location })
        .then(res => { setOffices([...offices, res.data]); setLocation(''); });
    }
  };

  const handleDelete = id => {
    if (!id) return;
    axios.delete(`/offices/${id}`)
      .then(() => setOffices(offices.filter(o => o.id !== id)));
  };

  const handleEdit = office => { setEditId(office.id); setLocation(office.location); };
  const handleCancel = () => { setEditId(null); setLocation(''); };

  const filteredOffices = offices.filter(office =>
    office.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>Liste des bureaux</h2>
      <SearchBar value={search} onChange={setSearch} placeholder="Rechercher un bureau..." />
      <table className="table table-striped">
        <thead>
          <tr><th>Emplacement</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {filteredOffices.map(o => (
            <tr key={o.id}>
              <td>{o.location}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(o)}>Modifier</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(o.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>{editId ? "Modifier un bureau" : "Ajouter un bureau"}</h3>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <input value={location} className="form-control" onChange={e => setLocation(e.target.value)} placeholder="Emplacement" required />
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

export default OfficeList;
