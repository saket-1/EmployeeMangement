import React,{useState,useEffect} from 'react'
import {useNavigate, Link, useParams} from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const AddEmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();
    console.log(id);
    console.log(useParams());
 
    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        const employee = {firstName, lastName, emailId}

        if(id){
               EmployeeService.updateEmployee(id,employee).then((response)=>{
                setMessage("Data Succesfully updated");
                setTimeout(() => {
                    navigate('/employees')
                  }, 3000);

                   
               }).catch(error => {
                console.log(error);
               })
        } else{
            EmployeeService.createEmployee(employee).then((response) =>{
                setMessage("Data Succesfully saved");
                setTimeout(() => {
                    navigate('/employees')
                  }, 3000);
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
        }
        
        
    }

    

    useEffect(() => {
      EmployeeService.getEmployeeById(id).then((response) =>{
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setEmailId(response.data.emailId)
      }).catch(error => {
        console.log(error)
      })
    }, [])

   const title = () =>{
        if(id){
            return <h2 className='text-center' >Update Employee</h2>
        } else{
            return <h2 className='text-center' >Add Employee</h2>
        }
    }
    
  return (
    <div>
        <br/><br/>
        <div className='container'>
            <div className='row'>
                <div className='card col-mid-6'>
                    {
                        title()
                    }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name :</label>
                                <input type = 'text'
                                        placeholder='Enter First Name' 
                                        name = 'firstName' 
                                        className='form-control' 
                                        value={firstName}
                                        onChange = {(e) => setFirstName(e.target.value)}
                                        >
                                </input>
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name :</label>
                                <input type = 'text'
                                        placeholder='Enter last Name' 
                                        name = 'lastName' 
                                        className='form-control' 
                                        value={lastName}
                                        onChange = {(e) => setLastName(e.target.value)}
                                        >
                                </input>
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Email Id :</label>
                                <input type = 'email'
                                        pattern="[^ @]*@[^ @]*"
                                        placeholder='Enter email Id' 
                                        name = 'emailId' 
                                        className='form-control' 
                                        value={emailId}
                                        onChange = {(e) => setEmailId(e.target.value)}
                                        >
                                </input>
                            </div>

                            <button className='btn btn-success' onClick={(e) => saveOrUpdateEmployee(e)}>Submit</button>
                            <Link to="/employees" className="btn btn-danger mx-2">Cancel</Link>

                            {message && <p>{message}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddEmployeeComponent