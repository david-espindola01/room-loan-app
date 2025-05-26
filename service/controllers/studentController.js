const Student = require('../models/Student');

const studentController = {
  // GET /api/students
  getAllStudents: async (req, res) => {
    try {
      const students = await Student.findAll();
      res.json({
        success: true,
        data: students,
        count: students.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching students',
        error: error.message
      });
    }
  },

  // GET /api/students/:id
  getStudentById: async (req, res) => {
    try {
      const { id } = req.params;
      const student = await Student.findById(id);
      
      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }

      res.json({
        success: true,
        data: student
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching student',
        error: error.message
      });
    }
  },

  // POST /api/students
  createStudent: async (req, res) => {
    try {
      const { student_name, student_code, program } = req.body;

      if (!student_name || !student_code) {
        return res.status(400).json({
          success: false,
          message: 'Student name and code are required'
        });
      }

      const existingStudent = await Student.findByCode(student_code);
      if (existingStudent) {
        return res.status(409).json({
          success: false,
          message: 'Student code already exists'
        });
      }

      const newStudent = await Student.create({ student_name, student_code, program });
      
      res.status(201).json({
        success: true,
        message: 'Student created successfully',
        data: newStudent
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating student',
        error: error.message
      });
    }
  },

  // PUT /api/students/:id
  updateStudent: async (req, res) => {
    try {
      const { id } = req.params;
      const { student_name, student_code, program } = req.body;

      const existingStudent = await Student.findById(id);
      if (!existingStudent) {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }

      const updatedStudent = await Student.update(id, { student_name, student_code, program });
      
      res.json({
        success: true,
        message: 'Student updated successfully',
        data: updatedStudent
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating student',
        error: error.message
      });
    }
  },

  // DELETE /api/students/:id
  deleteStudent: async (req, res) => {
    try {
      const { id } = req.params;
      
      const deletedStudent = await Student.delete(id);
      
      if (!deletedStudent) {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }

      res.json({
        success: true,
        message: 'Student deleted successfully',
        data: deletedStudent
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting student',
        error: error.message
      });
    }
  },

  // GET /api/students/:id/loans
  getStudentLoans: async (req, res) => {
    try {
      const { id } = req.params;
      
      const student = await Student.findById(id);
      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }

      const loans = await Student.getStudentLoans(id);
      
      res.json({
        success: true,
        data: {
          student: student,
          loans: loans
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching student loans',
        error: error.message
      });
    }
  },

  getTopUsers: async (req, res) => {
    try {
      const topUsers = await Student.getTopUsers();
      res.json({ success: true, data: topUsers });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching top users', error: error.message });
    }
  }  
};

module.exports = studentController;