import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function App() {
  const [image, setImage] = useState(defaultImage);
  const [text, setText] = useState("random person")
  const [category, setCate] = useState("My name is");
  const [loading, setLoading] = useState("random user");
  const [person, setPerson] = useState({
    name: ``,
    email: ``,
    age: ``,
    accommodation: ``,
    phone: ``,
    password: ``,
   });

  const fetchAPI = async() => {
    try{
      setLoading("LOADING...")
      const res = await fetch(url);
      const ret = await res.json();
      setPerson(

       {
        name: `${ret.results[0].name.title} ${ret.results[0].name.last} ${ret.results[0].name.first}`,
        email: `${ret.results[0].email}`,
        age: `${ret.results[0].dob.age}`,
        accommodation: `${ret.results[0].location.street.number} ${ret.results[0].location.street.name}, ${ret.results[0].location.city}
        ,${ret.results[0].location.state}, ${ret.results[0].location.country}, ${ret.results[0].location.postcode}`,
        phone: `${ret.results[0].phone}`,
        password: `${ret.results[0].login.password}`,
       }
      );
      setImage(ret.results[0].picture.large);
      setText(`${ret.results[0].name.title} ${ret.results[0].name.last} ${ret.results[0].name.first}`);
    }catch(error){
      console.log(error);
    }finally{
      setLoading("random user")
    }
  }
  useEffect(
    () => {
      fetchAPI();
    }
    ,[]);
  
  const reload = () =>{
    fetchAPI();
  }
  const changeCate = (e) => {
    if(e.target.classList.contains('icon')){
      setCate(`My ${e.target.name} is`);
      setText(person[e.target.name]);
    }
  }
  console.log(person);
  return <main>
    <div className='block bcg-black'></div>
    <div className='block'>
      <div className='container'>
        <img src={image} alt="random user" className='user-img'/>
        <p className='user-title'>{category}</p>
        <p className='user-value'>{text}</p>
        <div className='values-list'>
          <button className="icon" onMouseOver={(e) => changeCate(e)} name="name"><FaUser /></button> 
          <button className="icon" onMouseOver={(e) => changeCate(e)} name="email"><FaEnvelopeOpen /></button>
          <button className="icon" onMouseOver={(e) => changeCate(e)} name="age"><FaCalendarTimes /></button>
          <button className="icon" onMouseOver={(e) => changeCate(e)} name="accommodation"><FaMap /></button>
          <button className="icon" onMouseOver={(e) => changeCate(e)} name="phone"><FaPhone /></button>
          <button className="icon" onMouseOver={(e) => changeCate(e)} name="password"><FaLock /></button>
        </div>
        <button onClick={reload} className='btn'>{loading}</button>
      </div>
    </div>
  </main> 
}

export default App
