import React, { useState } from 'react';
import uniqid from 'uniqid';
const ListNames = () => {
  const [name, setName] = useState();
  const [listName, setListName] = useState([]);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState('');
  const [error, setError] = useState(null);
  const addName = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('field is empty');
      return;
    }
    const newName = {
      id: uniqid(),
      titlename: name,
    };

    setListName([...listName, newName]);
    setName('');
    setError(null);
  };
  const deleteName = (id) => {
    const newArray = listName.filter((item) => item.id !== id);
    setListName(newArray);
  };

  const edition = (item) => {
    setEdit(true);
    setName(item.titlename);
    setId(item.id);
  };

  const editName = (e) => {
    e.preventDefault();
    const neWArray = listName.map((item) =>
      item.id === id ? { id: item.id, titlename: name } : item
    );
    setListName(neWArray);
    setEdit(false);
    setName('');
  };

  return (
    <div>
      <h1>CRUD BASIC</h1>
      <div className="row">
        <div className="col">
          <h2>LIST NAME</h2>
          <ul className="list-group">
            {listName.map((item) => (
              <li key={item.id} className="list-group-item">
                {item.titlename}
                <button
                  className="btn btn-danger float-right"
                  onClick={() => {
                    deleteName(item.id);
                  }}
                >
                  Delete
                </button>
                <button
                  className="btn btn-warning float-right"
                  onClick={() => {
                    edition(item);
                  }}
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col">
          <h2>ADD NAME</h2>
          <form onSubmit={edit ? editName : addName} className="form-group">
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control mb-3"
              placeholder="write name"
              value={name}
            />
            <input
              type="submit"
              className="form-control btn btn-info btn-block"
              value={edit ? 'Edit Name' : 'Register Name'}
            />
          </form>
          {error !== null ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListNames;
