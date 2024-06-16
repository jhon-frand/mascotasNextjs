"use client";

import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import btnAdd from "../img/btn-add.svg";
import btnDelete from "../img/btn-delete.svg";
import btnEdit from "../img/btn-edit.svg";
import btnShow from "../img/btn-show.svg";
import btnBack from "../img/btn-back.svg"
import Image from 'next/image';
import Close from "../components/Close"
import { protectRoutes } from "../components/Protect"

function page() {


  const [mascotas, setMascotas] = useState([])

  const getMascotas = async () => {
    const respuesta = await axios.get("http://localhost:3000/api/mascotas")
    const data = respuesta.data.datos;
    setMascotas(data)
  }

  const deleteMascota = async (id) => {
    await axios.delete(`http://localhost:3000/api/mascotas/${id}`)
    getMascotas();
    return alert("mascota eliminada")
  }


  useEffect (() => {
    getMascotas()
  },[])


  return (
   <div className='flex justify-center items-center'>
     <div className='bg-back-image bg-cover bg-center md:w-1/4 w-full h-screen flex  flex-col p-3 gap-3'>
       <div className='flex h-12 w-full justify-center items-center gap-4 ' >
       <h1 className='text-white text-center w-full'>Administrar mascotas</h1>
           
           <Close/>
           
       </div>
       <div>
        <Link href="/registrar">
          <Image
          src={btnAdd}
          alt='btn-register'
          />
        </Link>
       </div>
      <div className='h-4/5 overflow-y-auto overflow-x-hidden'>
      {
        mascotas.map(mascota => (
          <div key={mascota.id} className='bg-[#ffffff81] rounded-[25px] p-3 flex mb-3 '>
          <div  className='flex w-2/3 justify-center items-center gap-2'>
            <div className='h-20 w-20 bg-white border-[#1f204db4] border-[2px] rounded-full flex justify-center items-center'>
            <img 
            src={`/img/${mascota.photo}`} 
            alt={mascota.name} 
            className="h-full w-full object-cover rounded-full" />
              </div>
            <div className="flex flex-col w-1/3">
              <h1 className='font-bold text-[#10103577]'>{mascota.name}</h1> 
              <h2 className='text-gray-700'>{mascota.race}</h2>
              </div>
          </div>
          <div className='flex w-1/3 justify-center items-center gap-2'>
            <div className='cursor-pointer flex justify-center items-center'>
              <Link href={`/mostrar/${mascota.id}`}>
              <Image 
              src={btnShow}
              alt='mostrar'
              />
              </Link>
            </div>
            <div className='cursor-pointe flex justify-center items-center '>
            <Link href={`/update/${mascota.id}`}>
            <Image 
              src={btnEdit}
              alt='editar'
              />
            </Link>
            </div>
            <div
            onClick={() => deleteMascota(mascota.id)}
            className='cursor-pointerflex justify-center items-center'>
              <Image 
              src={btnDelete}
              alt='eliminar'
              />
            </div>
          </div>
       </div>
        ))
       
        }
      </div>
    </div>
   </div>
  )
}

export default protectRoutes(page)