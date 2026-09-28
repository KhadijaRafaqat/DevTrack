const DailyLog = require('../models/DailyLog');

//Get all logs or log for a specific date

const getLogs = async(req,res)=>{
    try{

        const logs = await DailyLog.find().sort({createdAt: -1});//sort createdAT: -1 means descending order, so the most recent logs will be returned first.find() means sara logs lai ao
        res.status(200).json(logs);

    }
    catch(error){
        res.status(500).json({message:error.message});

    }
};

//Create or update today's log

const saveLog = async(req,res) =>{
    const {date, steps, webflowMinutes, backendMinutes, completedTasks, notes} = req.body;


    try{
        let log = await DailyLog.findOne({date});//findOne() means k ak 

        if(log){
            log.steps = steps ?? log.steps;
            log.webFlowMinutes = webflowMinutes ?? log.webFlowMinutes;
            log.backendMinutes = backendMinutes ?? log.backendMinutes;
            log.completedTasks = completedTasks ?? log.completedTasks;
            log.notes = notes ?? log.notes;

            await log.save();

        }
        else{

            log = await DailyLog.create({
        date,
        steps,
        webflowMinutes,
        backendMinutes,
        completedTasks,
        notes
      });

        }

        res.status(200).json(log);


    }

    catch(error){

        res.status(500).json({message: error.message});
    }
};

module.exports = { getLogs, saveLog};
