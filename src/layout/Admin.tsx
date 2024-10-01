import React from 'react'
import Navbar from '../components/admin/Navbar'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

type Props = {}

const Admin = (props: Props) => {
const navigate  =  useNavigate()
  const handleLogout = () => {
    const mess = window.confirm('ban chắc chắn muốn logout?')
    if(mess){
      try{
        sessionStorage.removeItem('user')
        navigate('/')
      }    catch (error){
        console.log(error);
        
      }
  }
}
  return (
    <>
    <div className='flex justify-between'>
    <Navbar handleLogout={handleLogout}/>
    <Outlet/>
    </div>
    </>
)
}

export default Admin