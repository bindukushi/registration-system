import Employee from "../models/employeeModel.js";

// Register Employee
export const addEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();

    res.json({
      success: true,
      message: "Employee Registered Successfully",
      employee,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      employees,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Employee
export const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Employee Deleted Successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};