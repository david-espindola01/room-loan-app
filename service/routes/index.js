const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController');
const roomController = require('../controllers/roomController');
const loanController = require('../controllers/loanController');

router.get('/students/top-users', studentController.getTopUsers);
router.get('/students', studentController.getAllStudents);
router.get('/students/:id', studentController.getStudentById);
router.post('/students', studentController.createStudent);
router.put('/students/:id', studentController.updateStudent);
router.delete('/students/:id', studentController.deleteStudent);
router.get('/students/:id/loans', studentController.getStudentLoans);


router.get('/rooms/most-used', roomController.getMostUsedRoom);
router.get('/rooms/available', roomController.getAvailableRooms);
router.get('/rooms', roomController.getAllRooms);
router.get('/rooms/:id', roomController.getRoomById);
router.post('/rooms', roomController.createRoom);
router.put('/rooms/:id', roomController.updateRoom);
router.delete('/rooms/:id', roomController.deleteRoom);
router.get('/rooms/:id/loans', roomController.getRoomLoans);

router.get('/loans/report/weekly', loanController.getWeeklyReport);
router.get('/loans/report/monthly', loanController.getMonthlyReport);
router.get('/loans/active', loanController.getActiveLoans);
router.get('/loans/date-range', loanController.getLoansByDateRange);
router.get('/loans', loanController.getAllLoans);
router.get('/loans/:id', loanController.getLoanById);
router.post('/loans', loanController.createLoan);
router.put('/loans/:id', loanController.updateLoan);
router.delete('/loans/:id', loanController.deleteLoan);



router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
