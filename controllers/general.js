// 3rd party modules
import { validationResult } from "express-validator";

// custom modules
import Student from "../models/student.js";

export async function postNewStudent(req, res, next) {
  try {
    const { firstName, lastName, studentID, course } = req.body;

    // check if there are validation errors
    const { errors } = validationResult(req);

    if (errors.length > 0) {
      return res.status(400).json({ message: errors[0].msg, statusCode: 400 });
    }

    // check if studentID already exists
    const studentExists = await Student.findOne({ studentID: studentID });

    if (studentExists) {
      return res
        .status(400)
        .json({ message: "Student already exists", statusCode: 400 });
    }

    const newStudent = new Student({
      firstName,
      lastName,
      studentID,
      course,
    });

    const student = await newStudent.save();
    return res.status(201).json({ student, statusCode: 201 });
  } catch (error) {
    next(error);
  }
}
