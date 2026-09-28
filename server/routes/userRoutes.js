const express = require('express');
const router = express.Router();
const {
  getUserRoutine,
  addRoutineSlot,
  updateRoutineSlot,
  deleteRoutineSlot,
  addCustomGoal,
  deleteCustomGoal
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Sabhi routes `protect` middleware se secured hain
router.get('/routine', protect, getUserRoutine);
router.post('/routine', protect, addRoutineSlot);
router.put('/routine/:slotId', protect, updateRoutineSlot);
router.delete('/routine/:slotId', protect, deleteRoutineSlot);

// Dynamic Goals Routes
router.post('/goals', protect, addCustomGoal);
router.delete('/goals/:goalId', protect, deleteCustomGoal);


module.exports = router;