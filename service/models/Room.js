const { pool } = require('../config/database');

class Room {
  static async findAll() {
    const query = 'SELECT * FROM rooms ORDER BY room_id';
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM rooms WHERE room_id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async create(roomData) {
    const { room_name, room_location, capacidad } = roomData;
    const query = `
      INSERT INTO rooms (room_name, room_location, capacidad) 
      VALUES ($1, $2, $3) 
      RETURNING *
    `;
    const result = await pool.query(query, [room_name, room_location, capacidad]);
    return result.rows[0];
  }

  static async update(id, roomData) {
    const { room_name, room_location, capacidad } = roomData;
    const query = `
      UPDATE rooms 
      SET room_name = $1, room_location = $2, capacidad = $3
      WHERE room_id = $4 
      RETURNING *
    `;
    const result = await pool.query(query, [room_name, room_location, capacidad, id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM rooms WHERE room_id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async getRoomLoans(id) {
    const query = `
      SELECT l.*, s.student_name, s.student_code 
      FROM loans l 
      JOIN students s ON l.student_id = s.student_id 
      WHERE l.room_id = $1 
      ORDER BY l.date DESC
    `;
    const result = await pool.query(query, [id]);
    return result.rows;
  }

  static async getAvailableRooms() {
    const query = `
      SELECT r.*, 
             COALESCE(COUNT(l.loan_id), 0) as active_loans
      FROM rooms r
      LEFT JOIN loans l ON r.room_id = l.room_id 
      GROUP BY r.room_id
      ORDER BY r.room_name
    `;
    const result = await pool.query(query);
    return result.rows;
  }
}

module.exports = Room;