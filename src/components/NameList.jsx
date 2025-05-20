import React, { useState } from 'react';

const NameList = ({ names, onDelete, onEdit }) => {
  const [editMode, setEditMode] = useState(null);
  const [editValue, setEditValue] = useState('');

  return (
    <ul>
      {names.map((name, index) => (
        <li key={index} style={{ marginBottom: '0.5rem' }}>
          {editMode === name ? (
            <>
              <input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
              <button onClick={() => { onEdit(name, editValue); setEditMode(null); }}>Save</button>
              <button onClick={() => setEditMode(null)}>Cancel</button>
            </>
          ) : (
            <>
              {name}
              <button onClick={() => { setEditMode(name); setEditValue(name); }}>Edit</button>
              <button onClick={() => onDelete(name)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NameList;