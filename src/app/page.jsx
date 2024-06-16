
"use client"

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation"

export default function Home() {
  
  const router = useRouter()

  const [data, setData] = useState({
    email: "",
    password: ""
  })

    const inputValue = (event) => {
      setData({
        ...data,
        [event.target.name] : event.target.value
      })
    }

  const postData  = async (event) => {
    event.preventDefault();
    try {
  
      const respuesta = await axios.post("http://localhost:3000/api/validator", data);
      
      const { token } = respuesta.data 

      if (respuesta.status === 201) {
        
        localStorage.setItem("token", token)
        alert("Bienvenido")
        router.push('/pets')
        return console.log("usuario encontrado", respuesta.data);
      } 

    } catch (error) {
      alert("usuario no encontrado")
      console.log(error.response.data)
    }
  }

  return (
    <div className="flex justify-center items-center">
      <div className="bg-custom-image bg-cover bg-center md:w-1/4 w-full  h-screen flex justify-center items-end">
      <form onSubmit={postData}
       className="w-full flex flex-col gap-2 p-2">
        <input
         name="email" value={data.email} onChange={inputValue}
         className="bg-[#ffffff8d] rounded-[30px] p-3"
          type="text" placeholder="Correo electrónico" required/>

        <input 
        name="password" value={data.password} onChange={inputValue} 
        className="bg-[#ffffff8d] rounded-[30px] p-3" 
        type="password"  placeholder="Contraseña" required/>

        <button type="submit"
         className="bg-[#394b7d] p-3 rounded-[30px] text-white text-xl" >
          Ingresar
          </button>
      </form>
    </div>
    </div>
  );
}
