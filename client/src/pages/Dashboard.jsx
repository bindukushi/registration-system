import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    employeeId: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
  });

  const getEmployees = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/employee/all"
      );

      if (data.success) {
        setEmployees(data.employees);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        backendUrl + "/api/employee/add",
        form
      );

      if (data.success) {
        alert("Employee Registered");

        setForm({
          fullName: "",
          employeeId: "",
          email: "",
          phone: "",
          department: "",
          designation: "",
        });

        getEmployees();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-8">
        Employee Dashboard
      </h1>

      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded-lg shadow space-y-4"
      >

        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <input
          name="employeeId"
          placeholder="Employee ID"
          value={form.employeeId}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <input
          name="designation"
          placeholder="Designation"
          value={form.designation}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <button
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Register Employee
        </button>

      </form>

      <h2 className="text-2xl font-bold mt-10 mb-4">
        Registered Employees
      </h2>

      <table className="w-full bg-white shadow">

        <thead>

          <tr className="bg-blue-600 text-white">

            <th className="p-3">Name</th>
            <th>Employee ID</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Designation</th>

          </tr>

        </thead>

        <tbody>

          {employees.map((emp) => (

            <tr
              key={emp._id}
              className="border-b text-center"
            >

              <td className="p-3">{emp.fullName}</td>
              <td>{emp.employeeId}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.department}</td>
              <td>{emp.designation}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default Dashboard;