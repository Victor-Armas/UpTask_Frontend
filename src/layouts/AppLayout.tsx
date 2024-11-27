import { Link, Navigate, Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Logo from "@/components/Logo"
import NavMenu from "@/components/NavMenu"
import { useAuth } from "@/hooks/useAuth"

export default function AppLayout() {
    const { data, isError, isLoading} = useAuth()

    
    if(isLoading) return 'Cargando...'
    if(isError){
        return <Navigate to='/auth/login'/>
    }



  if(data) return (
    <>
        <header className="bg-gradient-to-b from-blue-600 to-blue-800 py-5" >
            <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                <div className="w-64">
                    <Link to={'/'}>
                        <Logo />
                    </Link>
                </div>

                <NavMenu
                    name={data.name}
                    //rol={data.rol}
                />
            </div>
        </header>

        <section className="max-w-screen-2xl mx-auto mt-10 p-5">
            <Outlet/>
        </section>

        <footer className=" py-5  w-full flex justify-around mt-14 text-gray-500">
            <p className="text-center">
                Todos los derechos reservados {new Date().getFullYear()}
            </p>

            <p className="text-center ">
                Desarrollador: Victor Jesús Garzón Armas
            </p>
        </footer>

        <ToastContainer
            pauseOnHover={false}
            pauseOnFocusLoss={false}
        />

    </>
  )
}
