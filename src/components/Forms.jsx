import axios  from "axios";
import {useState} from "react";
import {useEffect} from "react";


export const Forms = ()=>{
    const [formData, setFormData] = useState({
        username:"",
        age:"",
        address:"",
        department:"",
        salary:"",
        married:""
    });

    const[alldata,setAlldata] = useState([])

    const handleChange=(e)=>{
       // console.log(e.target.id);
        const {id,value} = e.target;

        setFormData({
            ...formData,
            [id]: value
        })
    };

    useEffect(() => {
      showData();
   //   console.log(formData);
    },[])

    const showData =()=>{
        axios.get("http://localhost:3004/users").then((res)=>{
           // setFormData(res.data);
           setAlldata(res.data)
        })
    };

    const handleSubmit=(e)=>{
       e.preventDefault();
       // console.log(formData,e)
        axios.post("http://localhost:3004/users",formData).then(()=>{
            alert("Success!");
           
        }).then(()=>{
            showData();
        })
    }
  

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <h3 >Form</h3>
            <input id="username" type="text" onChange={handleChange} placeholder="Username" />
            <br /><br />
            <input id="age" type="number" onChange={handleChange} placeholder="enter age" />
            <br /> <br />
            <input id="address" type="text" onChange={handleChange} placeholder="enter address" />
            <br /> <br />
            <select name="" id="department" onChange={handleChange} >
                <option value="depart">select</option>
                <option value="electronics">ec</option>
                <option value="mech">mech</option>
                </select>
                <br /> <br />
                <input id="salary" type="number" onChange={handleChange} placeholder="enter salar" />
                <br /> <br />
                <label>married</label>
                <input type="checkbox" id="married" placeholder="true" onChange={handleChange} ></input>
                <br /> <br />
            <input type="submit" value={"createUser"} />
        </form>

     
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>address</th>
            </tr>
        </thead>
        {alldata.map((el)=>(
        <tbody>
            <tr>
                <td>{el.username}</td>
                <td>{el.address}</td>
                <td></td>
            </tr>
        </tbody>
     ))}
    </table>
        </div>
       
    )
}