import React, { useEffect, useState } from "react";
import axios from "axios";

const Form = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [position, setPosition] = useState("");
  const [edit, setEdit] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/employ/allEmployee")
      .then((res) => setData(res.data.allEmployee))
      .catch((err) => console.error(err));
  }, []);

  function clearForm() {
    setName("");
    setPassword("");
    setRole("");
    setPosition("");
    setEdit(null);
  }

  function handleADD(e) {
    e.preventDefault();
    if (!name.trim()) return alert("Fields cannot be empty");

    const employeeData = { name, password, role, position };

    if (edit !== null) {
      axios
        .patch(
          `http://localhost:5000/employ/${data[edit]._id}`,
          employeeData
        )
        .then((res) => {
          const updated = [...data];
          updated[edit] = res.data.existingEmploy;
          setData(updated);
          clearForm();
        });
    } else {
      axios
        .post("http://localhost:5000/employ/add", employeeData)
        .then((res) => {
          setData([...data, res.data.saveData]);
          clearForm();
        });
    }
  }

  function handleEdit(index) {
    setEdit(index);
    setName(data[index].name);
    setPassword(data[index].password);
    setRole(data[index].role);
    setPosition(data[index].position);
  }

  function handleDel(id) {
    axios.delete(`http://localhost:5000/employ/${id}`).then(() => {
      setData(data.filter((emp) => emp._id !== id));
    });
  }

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-gray-200 px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <h1 className="text-4xl font-bold text-center mb-10 text-indigo-400">
          Employee Control Panel
        </h1>

        {/* FORM */}
        <div className="bg-[#111827] border border-gray-700 rounded-xl p-8 mb-14 shadow-xl">
          <h2 className="text-xl font-semibold mb-6 text-gray-300">
            Employee Information
          </h2>

          <form
            onSubmit={handleADD}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* INPUT */}
            <div className="floating-input">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label>Full Name</label>
            </div>

            <div className="floating-input">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Password</label>
            </div>

            <div className="floating-input">
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
              <label>Role</label>
            </div>

            <div className="floating-input">
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
              />
              <label>Position</label>
            </div>

            <button
              type="submit"
              className="md:col-span-2 mt-4 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-semibold"
            >
              {edit !== null ? "Update Employee" : "Add Employee"}
            </button>
          </form>
        </div>

        {/* TABLE */}
        <div className="bg-[#111827] border border-gray-700 rounded-xl overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-gray-700 font-semibold text-gray-300">
            Employee List
          </div>

          <table className="w-full">
            <thead className="bg-[#0f172a] text-gray-400 text-sm">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Role</th>
                <th className="px-6 py-4 text-left">Position</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((employee, index) => (
                <tr
                  key={employee._id}
                  className="border-t border-gray-700 hover:bg-[#0f172a]"
                >
                  <td className="px-6 py-4">{employee.name}</td>
                  <td className="px-6 py-4">{employee.role}</td>
                  <td className="px-6 py-4">{employee.position}</td>
                  <td className="px-6 py-4 flex justify-center gap-4">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-indigo-400 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDel(employee._id)}
                      className="text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Form;
