
"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import camera from "../img/photo-lg-0.svg"
import iconCamera from "../img/icon-camera.svg"
import btnSave from "../img/btn-save.svg"
import arrows from "../img/arrows.svg"
import btnClose from "../img/btn-close.svg"
import btnBack from "../img/btn-back.svg"
import Image from 'next/image'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Close from "../components/Close"
import { protectRoutes } from "../components/Protect"

function page() {

  const router = useRouter()

  const [razas, setRazas] = useState([])
  const [category, setCategory] = useState([])
  const [genders, setGenders] = useState([])
  const [file, setFile] = useState(null)

  const [pet, setPet] = useState({
    name: "",
    race_id: "",
    category_id: "",
    gender_id: "",
  })

  const getRazas = async () => {
    try {
      const razas = await axios.get("http://localhost:3000/api/razas");
      const respuesta = razas.data.datos;
      setRazas(respuesta)
    } catch (error) {
      console.log(error);
    }
  }
  const getCategory = async () => {
    try {
      const razas = await axios.get("http://localhost:3000/api/categorias");
      const respuesta = razas.data.datos;
      setCategory(respuesta)
    } catch (error) {
      console.log(error);
    }
  }
  const getGenders = async () => {
    try {
      const razas = await axios.get("http://localhost:3000/api/generos");
      const respuesta = razas.data.datos;
      setGenders(respuesta)
    } catch (error) {
      console.log(error);
    }
  }

  const inputValue = (event) => {
    setPet({
      ...pet,
      [event.target.name]: event.target.value
    })
  }

  const postMascota = async (event) => {
    event.preventDefault();
    try {
      const datos = new FormData();
      datos.append('name', pet.name);
      datos.append('race_id', parseInt(pet.race_id, 10));
      datos.append('category_id', parseInt(pet.category_id, 10));
      datos.append('gender_id', parseInt(pet.gender_id, 10));
      datos.append('photo', file);

      console.log("FormData before send:", Array.from(datos.entries()));

      const registro = await axios.post("http://localhost:3000/api/mascotas", datos, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (registro.status === 200) {
        alert("registro exitoso");
      }
      router.push("/pets");
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getRazas();
    getCategory();
    getGenders();
  }, [])


  return (
    <div className='flex justify-center items-center'>
      <div className='bg-back-image bg-auto bg-center md:w-1/4 w-full h-screen flex flex-col p-3 gap-3 '>
        <div className='flex h-12 w-full justify-center items-center gap-4' >
          <Link href="/pets">
            <Image
              src={btnBack}
              alt='btn-back'
            />
          </Link>
          <h1 className='text-white text-center w-full'>Adicionar mascotas</h1>
          <Close/>
        </div>
        <div className='h-64 flex justify-center items-center'>
          <div className='rounded-full w-32 h-32 bg-green-100 border-2 border-gray-500 flex justify-center items-center'>
            {
              file && file ? (
                <Image
                  className="h-full w-full object-cover rounded-full"
                  src={URL.createObjectURL(file)}
                  alt='img'
                  width={100}
                  height={100}
                />
              ) :
                <Image
                  src={camera}
                  alt='camera'
                />
            }
          </div>

        </div>
          <form className='flex flex-col items-center gap-3' onSubmit={postMascota}>
            <input name='name' onChange={inputValue}
              className='p-3 w-full bg-[#ffffffa5] outline-none placeholder:text-[#252f7c] rounded-[30px]'
              type="text" placeholder='Nombre' />
            <div className="p-2 w-full bg-[#ffffffa5] outline-none flex justify-between rounded-[30px]">
            <select name='race_id' onChange={inputValue}
              className='w-full bg-transparent p-1 outline-none '>
              <option value="">Seleccione Raza...</option>
              {
                razas.map(raza => (
                  <option key={raza.id} value={raza.id}>
                    {raza.name}
                  </option>
                ))
              }
            </select>
            </div>
            
           <div className='p-2 w-full bg-[#ffffffa5] outline-none flex justify-between rounded-[30px]'>
           <select name='category_id' onChange={inputValue}
              className='w-full bg-transparent p-1 outline-none'>
              <option value="">Seleccione Categoría...</option>
              {
                category.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              }
            </select>
           </div>
            <div className="p-3 w-full bg-[#ffffffa5] outline-none flex justify-between rounded-[30px]">
              <input
                name="photo"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                className="absolute opacity-0 w-full"
                type="file"
                accept="image/*"
              />
              <span className="outline-none cursor-pointer">
                Subir Foto
              </span>
              <Image
                  src={iconCamera}
                  alt='camera'
                />
            </div>

            <div className='p-2 w-full bg-[#ffffffa5] outline-none flex justify-between rounded-[30px]'>
            <select name='gender_id' onChange={inputValue}
              className='w-full bg-transparent p-1 outline-none'>
              <option value="">Seleccione Género...</option>
              {
                genders.map(gender => (
                  <option key={gender.id} value={gender.id}>
                    {gender.name}
                  </option>
                ))
              }
            </select>
            </div>
            <div>
              <button type='submit'>
                <Image src={btnSave}
                  alt='btn close' />
              </button>
            </div>
          </form>
      </div>
    </div>
  )
}

export default protectRoutes(page);