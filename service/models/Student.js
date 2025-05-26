const { pool } = require('../config/database');

class Student {
  static async findAll() {
    const query = 'SELECT * FROM students ORDER BY student_id';
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM students WHERE student_id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findByCode(code) {
    const query = 'SELECT * FROM students WHERE student_code = $1';
    const result = await pool.query(query, [code]);
    return result.rows[0];
  }

  static async create(studentData) {
    const { student_name, student_code, program } = studentData;
    const query = `
      INSERT INTO students (student_name, student_code, program) 
      VALUES ($1, $2, $3) 
      RETURNING *
    `;
    const result = await pool.query(query, [student_name, student_code, program]);
    return result.rows[0];
  }

  static async update(id, studentData) {
    const { student_name, student_code, program } = studentData;
    const query = `
      UPDATE students 
      SET student_name = $1, student_code = $2, program = $3, updated_at = CURRENT_TIMESTAMP
      WHERE student_id = $4 
      RETURNING *
    `;
    const result = await pool.query(query, [student_name, student_code, program, id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM students WHERE student_id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async getStudentLoans(id) {
    const query = `
      SELECT l.*, r.room_name, r.room_location 
      FROM loans l 
      JOIN rooms r ON l.room_id = r.room_id 
      WHERE l.student_id = $1 
      ORDER BY l.date DESC
    `;
    const result = await pool.query(query, [id]);
    return result.rows;
  }

  static async getTopUsers() {
    const query = `
      SELECT s.student_id, s.student_name, s.student_code, COUNT(l.loan_id) AS loan_count
      FROM students s
      JOIN loans l ON s.student_id = l.student_id
      GROUP BY s.student_id, s.student_name, s.student_code
      ORDER BY loan_count DESC
      LIMIT 10
    `;
    const result = await pool.query(query);
    return result.rows;
  }  

}

module.exports = Student;