import React, { useState, useEffect } from 'react';
import NameList from './components/NameList';

const App = () => {
  const [names, setNames] = useState(() => {
    const saved = localStorage.getItem('names');
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState('');
  const [newName, setNewName] = useState('');

  useEffect(() => {
    localStorage.setItem('names', JSON.stringify(names));
  }, [names]);

  const handleAdd = () => {
    if (newName.trim() && !names.includes(newName.trim())) {
      setNames([...names, newName.trim()]);
      setNewName('');
    }
  };

  const handleDelete = (nameToDelete) => {
    setNames(names.filter((n) => n !== nameToDelete));
  };

  const handleEdit = (oldName, newName) => {
    if (newName.trim()) {
      setNames(names.map((n) => (n === oldName ? newName.trim() : n)));
    }
  };

  const filteredNames = names.filter((n) =>
    n.toLowerCase().startsWith(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem' }}>
      <h2>Simple Name Manager</h2>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Add name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
      <NameList names={filteredNames} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default App;