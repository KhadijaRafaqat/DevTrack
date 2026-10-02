import React, { useState, useEffect, useContext } from 'react';
import { Calendar, Plus, Trash2, Target, CheckCircle2 } from 'lucide-react';
import { 
  fetchUserRoutine, 
  addRoutineSlotAPI, 
  deleteRoutineSlotAPI, 
  addCustomGoalAPI, 
  deleteCustomGoalAPI 
} from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  // States
  const [routineSlots, setRoutineSlots] = useState([]);
  const [customGoals, setCustomGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form States for Routine
  const [newSlot, setNewSlot] = useState({ title: '', startTime: '', endTime: '', category: 'Work' });
  
  // Form States for Custom Goal
  const [newGoal, setNewGoal] = useState({ title: '', target: '', unit: '' });

  // Load User Data from Backend
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchUserRoutine();
        if (data.routineSlots) setRoutineSlots(data.routineSlots);
        if (data.customGoals) setCustomGoals(data.customGoals);
      } catch (err) {
        console.error("Failed to load user routine:", err);
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, []);

  // Add Routine Slot Handler
  const handleAddSlot = async (e) => {
    e.preventDefault();
    if (!newSlot.title || !newSlot.startTime || !newSlot.endTime) return;

    try {
      const updatedSlots = await addRoutineSlotAPI(newSlot);
      setRoutineSlots(updatedSlots);
      setNewSlot({ title: '', startTime: '', endTime: '', category: 'Work' });
    } catch (err) {
      console.error("Error adding routine slot:", err);
    }
  };

  // Delete Routine Slot Handler
  const handleDeleteSlot = async (slotId) => {
    try {
      const updatedSlots = await deleteRoutineSlotAPI(slotId);
      setRoutineSlots(updatedSlots);
    } catch (err) {
      console.error("Error deleting routine slot:", err);
    }
  };

  // Add Custom Goal Handler
  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!newGoal.title || !newGoal.target) return;

    try {
      const updatedGoals = await addCustomGoalAPI(newGoal);
      setCustomGoals(updatedGoals);
      setNewGoal({ title: '', target: '', unit: '' });
    } catch (err) {
      console.error("Error adding goal:", err);
    }
  };

  // Delete Goal Handler
  const handleDeleteGoal = async (goalId) => {
    try {
      const updatedGoals = await deleteCustomGoalAPI(goalId);
      setCustomGoals(updatedGoals);
    } catch (err) {
      console.error("Error deleting goal:", err);
    }
  };

  if (loading) return <div className="dashboard-container">Loading your SaaS workspace...</div>;

  return (
    <div className="dashboard-container">
      <h2>Welcome back, {user?.name || 'Developer'} 👋</h2>

      <div className="dashboard-grid">
        {/* Left Column: Dynamic Timetable Manager */}
        <div className="left-column">
          <div className="dashboard-card">
            <div className="card-title">
              <Calendar color="#6366f1" /> Your Daily Schedule
            </div>

            {/* Add New Routine Form */}
            <form onSubmit={handleAddSlot} className="steps-input-group" style={{ marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <input 
                type="text" 
                placeholder="Task Title (e.g. Webflow Practice)" 
                value={newSlot.title}
                onChange={(e) => setNewSlot({ ...newSlot, title: e.target.value })}
                className="custom-input"
                style={{ flex: '2 1 180px' }}
                required
              />
              <input 
                type="time" 
                value={newSlot.startTime}
                onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                className="custom-input"
                style={{ flex: '1 1 100px' }}
                required
              />
              <input 
                type="time" 
                value={newSlot.endTime}
                onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                className="custom-input"
                style={{ flex: '1 1 100px' }}
                required
              />
              <button type="submit" className="custom-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                <Plus size={18} /> Add Task
              </button>
            </form>

            {/* Display Routine Slots */}
            <div className="routine-list">
              {routineSlots.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No routine slots added yet. Add your first task above!</p>
              ) : (
                routineSlots.map((slot) => (
                  <div key={slot._id} className="routine-item">
                    <div>
                      <div className="routine-task">{slot.title}</div>
                      <div className="routine-time">{slot.startTime} – {slot.endTime}</div>
                    </div>
                    <button 
                      onClick={() => handleDeleteSlot(slot._id)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Custom Goals */}
        <div className="right-column">
          <div className="dashboard-card">
            <div className="card-title">
              <Target color="#10b981" /> Dynamic Goals
            </div>

            {/* Add Goal Form */}
            <form onSubmit={handleAddGoal} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <input 
                type="text" 
                placeholder="Goal Title (e.g. Read Book)" 
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                className="custom-input"
                required
              />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  placeholder="Target (e.g. 20)" 
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                  className="custom-input"
                  required
                />
                <input 
                  type="text" 
                  placeholder="Unit (e.g. pages)" 
                  value={newGoal.unit}
                  onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                  className="custom-input"
                />
              </div>
              <button type="submit" className="custom-btn" style={{ marginTop: '0.2rem' }}>Add Goal</button>
            </form>

            {/* Goals List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {customGoals.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No custom goals defined.</p>
              ) : (
                customGoals.map((goal) => (
                  <div key={goal._id} className="routine-item" style={{ borderLeftColor: '#10b981' }}>
                    <div>
                      <div className="routine-task" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <CheckCircle2 size={16} color="#10b981" /> {goal.title}
                      </div>
                      <div className="routine-time">Target: {goal.target} {goal.unit}</div>
                    </div>
                    <button 
                      onClick={() => handleDeleteGoal(goal._id)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;