const Workout =require("../models/workoutModel") 


// Get All Data

const getWorkouts = async (req,res)=>{
    try {
        const workoutData =await Workout.find().sort({createdAt:-1})
        res.status(200).json(workoutData);
    } catch (err) {
        res.status(400).json({error:err.message})
    }
}

// Get a Single Data
const getWorkout = async (req,res)=>{
    try {
        const id = req.params.id
        const workoutData =await Workout.findById({_id:id})
        res.status(200).json(workoutData);
    } catch (err) {
        res.status(400).json({error:err.message})
    }
}

// Create a Workout
const createWorkout = async (req,res)=>{
    try {
        const newWorkout =new  Workout(req.body)
        const workout = await newWorkout.save()
        res.status(201).json(workout)
    } catch (err) {
        res.status(400).json({error:err.message})
    }
}

// update a Workout
const editWorkout = async (req,res)=>{
    try {
        const id = req.params.id
        const workoutData =await  Workout.findByIdAndUpdate({_id:id} , req.body, {new:true})
        res.status(200).json({data:workoutData,success:true, message:"Successfully Updated!"})
    } catch (err) {
        res.status(400).json({error:err.message})
    }
}

// Delete a Workout
const deleteWorkout = async (req,res)=>{
    try {
        const id = req.params.id
        const workoutData =await  Workout.findByIdAndDelete({_id:id})
        res.status(200).json({data:workoutData,success:true, message:"Successfully Deleted!"})
    } catch (err) {
        res.status(400).json({error:err.message})
    }
}


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    editWorkout,
    deleteWorkout
}