const User = require('../models/User');

// @desc    Get logged in user routine & custom goals
// @route   GET /api/user/routine
// @access  Private

const getUserRoutine = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        if(!user){
            return res.status(404).json({message: 'USer not found'});
        }
        res.status(200).json({
            routineSlots: user.routineSlots,
            customGoals: user.customGoals,
        });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a new routine slot
// @route   POST /api/user/routine
// @access  Private

const addRoutineSlot = async (req, res) =>{
    const { title, startTime, endTime, category} = req.body;

    if(!title || !startTime || !endTime || !category){
        return res.status(400).json({message: 'Title, start time, and end time are required'});
    }

    try{
        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        const newSlot = {
            title,
            startTime,
            endTime,
            category: category || 'General'
        };
        await USer.save();
        res.status(200).json(user.routineSlots);
        }catch(error){
            res.status(500).json({message: error.message});
    }
};



// @desc    Update an existing routine slot
// @route   PUT /api/user/routine/:slotId
// @access  Private
const updateRoutineSlot = async (req, res) => {
  const { slotId } = req.params;
  const { title, startTime, endTime, category } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const slot = user.routineSlots.id(slotId);
    if (!slot) {
      return res.status(404).json({ message: 'Routine slot not found' });
    }

    if (title) slot.title = title;
    if (startTime) slot.startTime = startTime;
    if (endTime) slot.endTime = endTime;
    if (category) slot.category = category;

    await user.save();
    res.status(200).json(user.routineSlots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a routine slot
// @route   DELETE /api/user/routine/:slotId
// @access  Private
const deleteRoutineSlot = async (req, res) => {
  const { slotId } = req.params;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.routineSlots = user.routineSlots.filter(
      (slot) => slot._id.toString() !== slotId
    );

    await user.save();
    res.status(200).json(user.routineSlots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add or Update a Custom Goal
// @route   POST /api/user/goals
// @access  Private
const addCustomGoal = async (req, res) => {
  const { title, target, unit } = req.body;

  if (!title || !target) {
    return res.status(400).json({ message: 'Title and target are required' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newGoal = { title, target, unit: unit || '' };
    user.customGoals.push(newGoal);
    await user.save();

    res.status(201).json(user.customGoals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a Custom Goal
// @route   DELETE /api/user/goals/:goalId
// @access  Private
const deleteCustomGoal = async (req, res) => {
  const { goalId } = req.params;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.customGoals = user.customGoals.filter(
      (goal) => goal._id.toString() !== goalId
    );

    await user.save();
    res.status(200).json(user.customGoals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserRoutine,
  addRoutineSlot,
  updateRoutineSlot,
  deleteRoutineSlot,
  addCustomGoal,
  deleteCustomGoal
};