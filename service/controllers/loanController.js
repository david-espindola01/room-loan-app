const Loan = require('../models/Loan');
const Student = require('../models/Student');
const Room = require('../models/Room');

const loanController = {
  getAllLoans: async (req, res) => {
    try {
      const loans = await Loan.findAll();
      res.json({
        success: true,
        data: loans,
        count: loans.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching loans',
        error: error.message
      });
    }
  },

  getLoanById: async (req, res) => {
    try {
      const { id } = req.params;
      const loan = await Loan.findById(id);
      
      if (!loan) {
        return res.status(404).json({
          success: false,
          message: 'Loan not found'
        });
      }

      res.json({
        success: true,
        data: loan
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching loan',
        error: error.message
      });
    }
  },

  createLoan: async (req, res) => {
    try {
      const { student_id, room_id, duration } = req.body;

      if (!student_id || !room_id) {
        return res.status(400).json({
          success: false,
          message: 'Student ID and Room ID are required'
        });
      }

  
      const student = await Student.findById(student_id);
      if (!student) {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }

      // Verify room exists
      const room = await Room.findById(room_id);
      if (!room) {
        return res.status(404).json({
          success: false,
          message: 'Room not found'
        });
      }

      const newLoan = await Loan.create({ student_id, room_id, duration });
      
      res.status(201).json({
        success: true,
        message: 'Loan created successfully',
        data: newLoan
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating loan',
        error: error.message
      });
    }
  },

  updateLoan: async (req, res) => {
    try {
      const { id } = req.params;
      const { student_id, room_id, duration } = req.body;

      const existingLoan = await Loan.findById(id);
      if (!existingLoan) {
        return res.status(404).json({
          success: false,
          message: 'Loan not found'
        });
      }


      if (student_id) {
        const student = await Student.findById(student_id);
        if (!student) {
          return res.status(404).json({
            success: false,
            message: 'Student not found'
          });
        }
      }

      if (room_id) {
        const room = await Room.findById(room_id);
        if (!room) {
          return res.status(404).json({
            success: false,
            message: 'Room not found'
          });
        }
      }

      const updatedLoan = await Loan.update(id, { student_id, room_id, duration });
      
      res.json({
        success: true,
        message: 'Loan updated successfully',
        data: updatedLoan
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating loan',
        error: error.message
      });
    }
  },

  deleteLoan: async (req, res) => {
    try {
      const { id } = req.params;
      
      const deletedLoan = await Loan.delete(id);
      
      if (!deletedLoan) {
        return res.status(404).json({
          success: false,
          message: 'Loan not found'
        });
      }

      res.json({
        success: true,
        message: 'Loan deleted successfully',
        data: deletedLoan
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting loan',
        error: error.message
      });
    }
  },

  getActiveLoans: async (req, res) => {
    try {
      const activeLoans = await Loan.getActiveLoans();
      
      res.json({
        success: true,
        data: activeLoans,
        count: activeLoans.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching active loans',
        error: error.message
      });
    }
  },

  
  getLoansByDateRange: async (req, res) => {
    try {
      const { start, end } = req.query;

      if (!start || !end) {
        return res.status(400).json({
          success: false,
          message: 'Start date and end date are required'
        });
      }

      const loans = await Loan.getLoansByDateRange(start, end);
      
      res.json({
        success: true,
        data: loans,
        count: loans.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching loans by date range',
        error: error.message
      });
    }
  },

  getWeeklyReport: async (req, res) => {
    try {
      const report = await Loan.getWeeklyReport();
      res.json({ success: true, data: report });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching weekly report', error: error.message });
    }
  },
  
  getMonthlyReport: async (req, res) => {
    try {
      const report = await Loan.getMonthlyReport();
      res.json({ success: true, data: report });
    } catch (error) {
      console.error("error: ", error)
      res.status(500).json({ success: false, message: 'Error fetching monthly report', error: error.message });
    }
  }  
};

module.exports = loanController;