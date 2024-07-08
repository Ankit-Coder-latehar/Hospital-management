const express = require("express")
const router = express.Router()

const appointment = require("../models/Appointment")


//Get all appointments
router.route("/").get((req,res)=>{
    appointment.find().then(appointments => res.json(appointments)).catch(err => res.status(400).json('Error' + err));
});


//Add new appointment 
router.route("/add").post((req,res)=>{
    const {patientName , doctorName , date } = req.body;

    const newAppointment =  new appointment({patientName , doctorName , date});

    newAppointment.save().then(savedAppointment => res.json(savedAppointment)).catch(err => res.status(400).json('Error:' + err));
})


//update appointment data

router.route('/update/:id').post((req,res)=>{
    appointment.findById(req.params.id).then(appointment =>{
       appointment.patientName = 
       req.body.patientName;
       appointment.doctorName = req.body.doctorName;
       appointment.date = req.body.date;

       appointment.save().then(()=>
        res.json(`Appointment updated!`)
       ).catch(err => res.status(400).json("Error: " + err));
    }).catch(err => res.status(400).json('Error:' + err));
});

//Delete Appointment
router.route('/delete/:id').delete((req,res)=> {
    appointment.findByIdAndDelete(req.params.id).then(()=> res.json('Appointment deleted.'))
    .catch((err)=> res.status(400).json('Error:' + err));
        
})


module.exports = router;