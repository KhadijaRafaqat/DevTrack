const mongoose = require('mongoose');

const dailyLogSchema = new mongoose.Schema(
    {
        date:
        {
            type: String,
            required: true,
        },//Formate : YYYY-MM-DD


        steps: 
        {
            type: Number,
            default: 0,
        },


        webFlowMinutes: 
        {
            type: Number,
            default: 0,
        },


        backendMinutes: 
        {
            type: Number,
            default: 0,
        },


        completedTasks: 
        [{
            type: String
        }],


        notes: 
        {
            type: String,
            default: ''
        }


    }
)

module.exports = mongoose.model('DailyLog' , dailyLogSchema);