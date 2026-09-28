const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    
    // Completely Dynamic Custom Goals Array
    customGoals: [
      {
        title: { type: String, required: true },  // e.g. "Read Books", "10k Steps", "Water Intake"
        target: { type: String, required: true }, // e.g. "20", "10000", "3"
        unit: { type: String, default: '' }       // e.g. "pages", "steps", "liters"
      }
    ],

    // User's Flexible Routine Timetable
    routineSlots: [
      {
        title: { type: String, required: true },// e.g. "Client Meeting", "Workout"
        startTime: { type: String, required: true }, // e.g. "18:00"
        endTime: { type: String, required: true },   // e.g. "19:30"
        category: { type: String, default: 'General' } // Work, Study, Health, University
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);