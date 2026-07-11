import express from "express";
import {
  addEmployee,
  getEmployees,
  deleteEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

router.post("/add", addEmployee);
router.get("/all", getEmployees);
router.delete("/delete/:id", deleteEmployee);

export default router;