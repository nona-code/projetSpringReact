import React from 'react';

export default function Profile({ user }) {
  if (!user) return <div>Non connecté</div>;
  return (
    <div>
      <h2>Profil</h2>
      <div>Nom : {user.name}</div>
      <div>Email : {user.email}</div>
      {/* Ajoutez d'autres infos si besoin */}
    </div>
  );
}
