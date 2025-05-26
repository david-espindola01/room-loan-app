const { pool } = require('../config/database');

class Loan {
  static async findAll() {
    const query = `
      SELECT l.*, s.student_name, s.student_code, r.room_name, r.room_location
      FROM loans l
      JOIN students s ON l.student_id = s.student_id
      JOIN rooms r ON l.room_id = r.room_id
      ORDER BY l.date DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = `
      SELECT l.*, s.student_name, s.student_code, r.room_name, r.room_location
      FROM loans l
      JOIN students s ON l.student_id = s.student_id
      JOIN rooms r ON l.room_id = r.room_id
      WHERE l.loan_id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async create(loanData) {
    const { student_id, room_id, duration } = loanData;
    const query = `
      INSERT INTO loans (student_id, room_id, duration) 
      VALUES ($1, $2, $3) 
      RETURNING *
    `;
    const result = await pool.query(query, [student_id, room_id, duration]);
    return result.rows[0];
  }

  static async update(id, loanData) {
    const { student_id, room_id, duration } = loanData;
    const query = `
      UPDATE loans 
      SET student_id = $1, room_id = $2, duration = $3
      WHERE loan_id = $4 
      RETURNING *
    `;
    const result = await pool.query(query, [student_id, room_id, duration, id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM loans WHERE loan_id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async getActiveLoans() {
    const query = `
      SELECT l.*, s.student_name, s.student_code, r.room_name, r.room_location
      FROM loans l
      JOIN students s ON l.student_id = s.student_id
      JOIN rooms r ON l.room_id = r.room_id
      WHERE l.date + INTERVAL '1 hour' * l.duration > CURRENT_TIMESTAMP
      ORDER BY l.date DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async getLoansByDateRange(startDate, endDate) {
    const query = `
      SELECT l.*, s.student_name, s.student_code, r.room_name, r.room_location
      FROM loans l
      JOIN students s ON l.student_id = s.student_id
      JOIN rooms r ON l.room_id = r.room_id
      WHERE l.date BETWEEN $1 AND $2
      ORDER BY l.date DESC
    `;
    const result = await pool.query(query, [startDate, endDate]);
    return result.rows;
  }

  static async getWeeklyReport() {
    const query = `
      SELECT DATE_TRUNC('week', date) AS week, COUNT(*) AS total
      FROM loans
      GROUP BY week
      ORDER BY week DESC
      LIMIT 4
    `;
    const result = await pool.query(query);
    return result.rows;
  }
  
  static async getMonthlyReport() {
    const query = `
      SELECT TO_CHAR(date, 'YYYY-MM') AS month, COUNT(*) AS total
      FROM loans
      GROUP BY month
      ORDER BY month DESC
      LIMIT 6
    `;
    const result = await pool.query(query);
    return result.rows;
  }  
}

module.exports = Loan;