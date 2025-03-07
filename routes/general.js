// 3rd party modules
import express from "express";
import { body } from "express-validator";

// custom modules
import * as generalController from "../controllers/general.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("firstName")
      .trim()
      .isString()
      .withMessage("First name must be a string")
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters"),
    body("lastName")
      .trim()
      .isString()
      .withMessage("Last name must be a string")
      .isLength({ min: 2 })
      .withMessage("Last name must be at least 2 characters"),
    body("studentID")
      .trim()
      .isString()
      .withMessage("Student ID must be a string")
      .isLength({ min: 9 })
      .withMessage("Student ID must be at least 9 characters"),
    body("course")
      .trim()
      .isString()
      .withMessage("Course must be a string")
      .isLength({ min: 2 })
      .withMessage("Course must be at least 2 characters"),
  ],
  generalController.postNewStudent
);

router.put(
  "/update/:studentID",
  [
    body("firstName")
      .trim()
      .custom((value) => {
        if (value) {
          if (typeof value !== "string") {
            throw new Error("First name must be a string");
          }
          if (value.length < 2) {
            throw new Error("First name must be at least 2 characters");
          }
        }
        return true;
      }),
    body("lastName")
      .trim()
      .custom((value) => {
        if (value) {
          if (typeof value !== "string") {
            throw new Error("Last name must be a string");
          }
          if (value.length < 2) {
            throw new Error("Last name must be at least 2 characters");
          }
        }
        return true;
      }),
    body("course")
      .trim()
      .custom((value) => {
        if (value) {
          if (typeof value !== "string") {
            throw new Error("Course must be a string");
          }
          if (value.length < 2) {
            throw new Error("Course must be at least 2 characters");
          }
        }
        return true;
      }),
  ],
  generalController.updateStudent
);

export default router;
