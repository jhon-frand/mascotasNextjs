import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-custom-image w-full bg-center h-screen flex justify-center items-end">
      <form className="w-full flex flex-col gap-2 p-2">
        <input className="bg-[#ffffff8d] rounded-[30px] p-3" type="text" placeholder="Correo electrónico" />
        <input className="bg-[#ffffff8d] rounded-[30px] p-3" type="text"  placeholder="Contraseña"/>
        <button className="bg-[#394b7d] p-3 rounded-[30px] text-white text-xl" >
          <Link href="/pets">Ingresar</Link>
          </button>
      </form>
    </div>
  );
}