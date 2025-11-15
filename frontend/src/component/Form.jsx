import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const Form = () => {

        const [name , setName] = useState("")
        const [password , setPassword] = useState("")
        const [role , setRole] = useState("")
        const [position , setPosition] = useState("")
        const [ edit , setEdit] = useState(null)
        const [ data , setData] = useState(()=>{
            const saved = localStorage.getItem("todos")
            try {
                 return saved ? JSON.parse(saved) : [] 
            } catch (error) {
                console.error("failed to parse from localstrogage",error)
                return []
            }
            
          
        })

        useEffect(()=>{
            localStorage.setItem("todos" , JSON.stringify(data))
        },[data])


    useEffect(()=>{
        axios.get('http://localhost:5000/employ')
        .then((res)=>setData(res.data.allEmployee))
        .catch((err)=>console.error('there was an error fetching employee data!',err))
    },[])


          function handleADD(e){
           
              if(!name.trim()) return alert("can't empty feilds")
            e.preventDefault()


               let employeeData = {
                    name,
                    password,
                    role,
                    position
               }

                if(edit !== null){
                    axios.patch(`http://localhost:5000/employ/${data[edit]._id}`,employeeData)
                    .then((res)=>{
                        const updatedData = [...data];
                        updatedData[edit] = res.data.existingEmploy;
                        setData(updatedData)
                        setEdit(null)
                        clearForm()
                    })
                    .catch((err)=>console.error('there was an error updating the employee',err))
                }else{
                    axios.post('http://localhost:5000/employ/add',employeeData)
                    .then((res)=>{
                        setData([...data , res.data.saveData])
                        clearForm()
                    })
                    .catch((error)=>console.error('there was an error adding the employee',error))
                }

           }


function clearForm(){
    setName("")
     setPassword("")
     setRole("")
     setPosition("")
}


function handleDel(id){

    axios.delete(`http://localhost:5000/employ/${id}`)
    .then((res)=>{
        const newData = data.filter((employee)=>employee._id !== id)
        setData(newData)
    })
    .catch((err)=>console.error('there was an error deleteing employee',err))
}

useEffect(()=>{
     axios.get(`http://localhost:5000/employ/allEmployee`)
    .then((res)=> setData(res.data.allEmployee))
    .catch((err)=>console.error("there was not a any employe in there",err))
})



function handleEdit(index){

    setEdit(index)
    setName(data[index].name)
    setPassword(data[index].password)
    setRole(data[index].role)
    setPosition(data[index].position)


}

  return (
   <>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Employee Form</h1>

        <form onSubmit={handleADD} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300"
          >
            {edit !== null ? 'Update Employee' : 'Add Employee'}
          </button>
        </form>
      </div>

      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Employee Information</h2>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Role</th>
                <th className="px-6 py-4 text-left">Position</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((employee, index) => (
                <tr key={employee._id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-4">{employee.name}</td>
                  <td className="px-6 py-4">{employee.role}</td>
                  <td className="px-6 py-4">{employee.position}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDel(employee._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
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
    </>

  )
}

export default Form