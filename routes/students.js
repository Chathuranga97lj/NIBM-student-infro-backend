const {Student} = require('../models/student');
const express = require('express');
const router = express.Router();

// get student
router.get(`/get`, async (req, res) => {
    const studentList = await Student.find().populate('regNo', 'name').sort({'dateOrdered':-1});

    if(!studentList) {
        res.status(500).json({success: false});
    }
    res.send(studentList);
});

// add student
router.post(`/add`, async (req, res) => {
   let student = new Student({
       regNo: req.body.regNo,
       name: req.body.name,
       age: req.body.age,
       gender: req.body.gender,
       mobileNo: req.body.mobileNo,
       parentNo: req.body.parentNo
   });

   student = await student.save();
    if(!student){
        return res.status(404).send('The student cannot be created!');
    }

    res.send(student);

});

// update student
router.put(`/update/:id`, async (req, res) => {
    const student = await Student.findByIdAndUpdate(
        req.params.id,
        {
            regNo: req.body.regNo,
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            mobileNo: req.body.mobileNo,
            parentNo: req.body.parentNo
        },
        {new: true}
    )
    if(!student) {
        return res.status(404).send('The student not found !');
    }

    res.send(student);
});


// delete student
router.delete('/delete/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if(student) {
            return res.status(200).json({success: true, message: 'The student was deleted!'})
        } else {
            return res.status(404).json({success: false, message: 'The student is not found!'})
        }
    } catch (err) {
        return res.status(500).json({success: false, error: err.message})
    }
})


module.exports = router;
