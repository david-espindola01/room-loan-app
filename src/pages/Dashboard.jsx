import { useEffect, useState } from 'react';
import API from '../api/api.js';
import '../styles/moreover.css';

function Dashboard() {
  const [mostUsedRoom, setMostUsedRoom] = useState(null);
  const [weeklyReport, setWeeklyReport] = useState([]);
  const [monthlyReport, setMonthlyReport] = useState([]);
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    API.get('/rooms/most-used').then(res => setMostUsedRoom(res.data.data));
    API.get('/loans/report/weekly').then(res => setWeeklyReport(res.data.data));
    API.get('/loans/report/monthly').then(res => setMonthlyReport(res.data.data));
    API.get('/students/top-users').then(res => setTopUsers(res.data.data));
  }, []);

  return (
    <div id='dashboard'>
      <h2>📊 Dashboard de Reportes</h2>

      <section>
        <h3>🔝 Sala más usada</h3>
        {mostUsedRoom ? (
          <p>{mostUsedRoom.room_name} ({mostUsedRoom.loan_count} préstamos)</p>
        ) : <p>Cargando...</p>}
      </section>

      <section>
        <h3>📅 Reporte Semanal</h3>
        <ul>
          {weeklyReport.map((r, i) => (
            <li key={i}>{r.week} — {r.total} préstamos</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>📆 Reporte Mensual</h3>
        <ul>
          {monthlyReport.map((r, i) => (
            <li key={i}>{r.month} — {r.total} préstamos</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>👨‍🎓 Estudiantes más activos</h3>
        <ul>
          {topUsers.map((u, i) => (
            <li key={u.student_id}>{u.student_name} ({u.student_code}) — {u.loan_count} préstamos</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Dashboard;
