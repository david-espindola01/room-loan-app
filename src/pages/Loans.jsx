import { useEffect, useState } from 'react';
import API from '../api/api';
import '../styles/moreover.css';

function Loans() {
  const [loans, setLoans] = useState([]);
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    student_id: '',
    room_id: '',
    duration: ''
  });

  const fetchData = () => {
    API.get('/loans').then(res => setLoans(res.data.data));
    API.get('/students').then(res => setStudents(res.data.data));
    API.get('/rooms').then(res => setRooms(res.data.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    API.post('/loans', form)
      .then(() => {
        fetchData();
        setForm({ student_id: '', room_id: '', duration: '' });
      })
      .catch(err => console.error(err));
  };

  return (
    <div id='loans'>
      <h2>Préstamos</h2>

      <form onSubmit={handleSubmit}>
        <select name="student_id" value={form.student_id} onChange={handleChange} required>
          <option value="">Selecciona estudiante</option>
          {students.map(s => (
            <option key={s.student_id} value={s.student_id}>
              {s.student_name}
            </option>
          ))}
        </select>

        <select name="room_id" value={form.room_id} onChange={handleChange} required>
          <option value="">Selecciona sala</option>
          {rooms.map(r => (
            <option key={r.room_id} value={r.room_id}>
              {r.room_name}
            </option>
          ))}
        </select>

        <input name="duration" type="number" placeholder="Duración (horas)" value={form.duration} onChange={handleChange} />
        <button type="submit">Crear Préstamo</button>
      </form>

      <ul>
        {loans.map(l => (
          <li key={l.loan_id}>
            {l.student_name} reservó {l.room_name} por {l.duration} horas
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Loans;
