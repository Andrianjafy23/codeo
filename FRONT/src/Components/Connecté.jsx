import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

function Connecté() {
  const [values, setValues] = useState({
    titre: '',
    soutitre: '',
    expliquer: '',
    html: '',
    css: '',
    js: ''
  });

  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      axios.put(`http://localhost:8084/don/${editId}`, values)
        .then(response => {
          console.log('Data updated successfully:', response.data);
          setValues({
            titre: '',
            soutitre: '',
            expliquer: '',
            html: '',
            css: '',
            js: ''
          });
          setIsEditing(false);
          setEditId(null);
          fetchData();
        })
        .catch(error => {
          console.error('There was an error updating the data!', error);
        });
    } else {
      axios.post('http://localhost:8084/don', values)
        .then(response => {
          console.log('Data submitted successfully:', response.data);
          setValues({
            titre: '',
            soutitre: '',
            expliquer: '',
            html: '',
            css: '',
            js: ''
          });
          fetchData();
        })
        .catch(error => {
          console.error('There was an error submitting the data!', error);
        });
    }
  };

  const fetchData = () => {
    axios.get('http://localhost:8084/don')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (item) => {
    setValues({
      titre: item.titre,
      soutitre: item.soutitre,
      expliquer: item.expliquer,
      html: item.html,
      css: item.css,
      js: item.js
    });
    setIsEditing(true);
    setEditId(item.id);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8084/don/${id}`)
      .then(response => {
        console.log('Data deleted successfully:', response.data);
        fetchData();
      })
      .catch(error => {
        console.error('There was an error deleting the data!', error);
      });
  };

  return (
    <div className='izy'>
      <form onSubmit={handleSubmit}>
        <div className='text'>
          <div id='aza'>
            <input
              type="text"
              name="titre"
              placeholder='Titre'
              value={values.titre}
              onChange={handleChange}
            />
            <textarea
              name="soutitre"
              id="tete"
              placeholder='Sous titre'
              value={values.soutitre}
              onChange={handleChange}
            ></textarea>
          </div>
          <textarea
            name="expliquer"
            id="expication"
            placeholder='Expliqué'
            value={values.expliquer}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className='codeo'>
          <textarea
            name="html"
            id="html"
            placeholder='Code HTML'
            value={values.html}
            onChange={handleChange}
          ></textarea>
          <textarea
            name="css"
            id="css"
            placeholder='Code CSS'
            value={values.css}
            onChange={handleChange}
          ></textarea>
          <textarea
            name="js"
            id="js"
            placeholder='Code JS'
            value={values.js}
            onChange={handleChange}
          ></textarea>
        </div>
        <center><button className='aj' type="submit">{isEditing ? 'Modifier' : 'Ajouter'}</button></center>
      </form>

      <div className="data-list">
        <center><h2>LISTES DES DONNÉES</h2></center>
        <ul>
          {data.map((item, index) => (
            <tbody key={index}>
              <tr className='données'>
                <td>{item.titre}</td>
                <td>{item.soutitre}</td>
                <td>{item.expliquer}</td>
                <td>{item.html}</td>
                <td>{item.css}</td>
                <td>{item.js}</td>
              </tr>
              <div className='style'>
                <button className='btt' onClick={() => handleEdit(item)}>Modifier</button>
                <button className='btt' onClick={() => handleDelete(item.id)}>Supprimer</button>
              </div>
            </tbody>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Connecté;
