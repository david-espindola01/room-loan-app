import { useEffect, useState } from 'react';
import API from '../api/api';
import '../styles/moreover.css';

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    room_name: '',
    room_location: '',
    capacidad: ''
  });

  const fetchRooms = () => {
    API.get('/rooms')
      .then(res => setRooms(res.data.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    API.post('/rooms', form)
      .then(() => {
        fetchRooms();
        setForm({ room_name: '', room_location: '', capacidad: '' });
      })
      .catch(err => console.error(err));
  };

  return (
    <div id='rooms'>
      <h2>Salas</h2>

      <form onSubmit={handleSubmit}>
        <input name="room_name" placeholder="Nombre" value={form.room_name} onChange={handleChange} required />
        <input name="room_location" placeholder="Ubicación" value={form.room_location} onChange={handleChange} />
        <input name="capacidad" placeholder="Capacidad" type="number" value={form.capacidad} onChange={handleChange} />
        <button type="submit">Crear Sala</button>
      </form>

      <ul>
        {rooms.map(r => (
          <li key={r.room_id}>
            {r.room_name} ({r.room_location}) - Capacidad: {r.capacidad}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rooms;
