import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

type Props = {
  handleLogout: () => void;
}

const Navbar = (props: Props) => {
  const [user, setUser] = useState<{info: string} | null>(null)
  const location = useLocation()
  const [active, setActive ]= useState("")
  const navigate = useNavigate();
    useEffect(()=> {
    const userData: any = sessionStorage.getItem("user")
  try {
    if (userData){
      setUser(JSON.parse(userData))
    }
  }
  catch(error) {
    console.log(error);
    
  }
    console.log(location, "location");
    setActive(location.pathname)
  },[location])

  const handleLogout = () => {
    sessionStorage.removeItem("user")
    setUser(null)
    // navigate('/login')
  }
  return (
<>
<nav className="bg-[#121e31] h-screen  top-0 left-0 min-w-[250px] py-6 px-4 font-[sans-serif] tracking-wide overflow-auto">
  <div className="flex flex-wrap items-center gap-4 cursor-pointer">
    {/* <img
      src="https://readymadeui.com/profile.webp"
      className="w-10 h-10 rounded-full border-2 border-white"
    /> */}
    <div>
      
      <p className="px-4 py-2 bg-white text-sm rounded-full font-bold text-gray-700 border-2 border-[#007bff]">{user?.info}</p>
    </div>
  </div>
  <hr className="my-6 border-gray-400" />
  <ul className="space-y-3">
    <li>
    <NavLink to={'/admin/dashboard'} className={`text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all 
      ${active === '/admin/dashboard'? 'bg-gray-700':''}`}>

     
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-[18px] h-[18px] mr-4"
          viewBox="0 0 512 512"
        >
          <path
            d="M197.332 170.668h-160C16.746 170.668 0 153.922 0 133.332v-96C0 16.746 16.746 0 37.332 0h160c20.59 0 37.336 16.746 37.336 37.332v96c0 20.59-16.746 37.336-37.336 37.336zM37.332 32A5.336 5.336 0 0 0 32 37.332v96a5.337 5.337 0 0 0 5.332 5.336h160a5.338 5.338 0 0 0 5.336-5.336v-96A5.337 5.337 0 0 0 197.332 32zm160 480h-160C16.746 512 0 495.254 0 474.668v-224c0-20.59 16.746-37.336 37.332-37.336h160c20.59 0 37.336 16.746 37.336 37.336v224c0 20.586-16.746 37.332-37.336 37.332zm-160-266.668A5.337 5.337 0 0 0 32 250.668v224A5.336 5.336 0 0 0 37.332 480h160a5.337 5.337 0 0 0 5.336-5.332v-224a5.338 5.338 0 0 0-5.336-5.336zM474.668 512h-160c-20.59 0-37.336-16.746-37.336-37.332v-96c0-20.59 16.746-37.336 37.336-37.336h160c20.586 0 37.332 16.746 37.332 37.336v96C512 495.254 495.254 512 474.668 512zm-160-138.668a5.338 5.338 0 0 0-5.336 5.336v96a5.337 5.337 0 0 0 5.336 5.332h160a5.336 5.336 0 0 0 5.332-5.332v-96a5.337 5.337 0 0 0-5.332-5.336zm160-74.664h-160c-20.59 0-37.336-16.746-37.336-37.336v-224C277.332 16.746 294.078 0 314.668 0h160C495.254 0 512 16.746 512 37.332v224c0 20.59-16.746 37.336-37.332 37.336zM314.668 32a5.337 5.337 0 0 0-5.336 5.332v224a5.338 5.338 0 0 0 5.336 5.336h160a5.337 5.337 0 0 0 5.332-5.336v-224A5.336 5.336 0 0 0 474.668 32zm0 0"
            data-original="#000000"
          />
        </svg>
        <span>Dashboard</span>
      
      </NavLink>
    </li>
    <li>
    <NavLink to={'/admin/addcategory'} className={`text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all
      ${active === '/admin/addcategory'? 'bg-gray-700':''}`}>
      
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-[18px] h-[18px] mr-4"
          viewBox="0 0 511.414 511.414"
        >
          <path
            d="M497.695 108.838a16.002 16.002 0 0 0-9.92-14.8L261.787 1.2a16.003 16.003 0 0 0-12.16 0L23.639 94.038a16 16 0 0 0-9.92 14.8v293.738a16 16 0 0 0 9.92 14.8l225.988 92.838a15.947 15.947 0 0 0 12.14-.001c.193-.064-8.363 3.445 226.008-92.837a16 16 0 0 0 9.92-14.8zm-241.988 76.886-83.268-34.207L352.39 73.016l88.837 36.495zm-209.988-51.67 71.841 29.513v83.264c0 8.836 7.164 16 16 16s16-7.164 16-16v-70.118l90.147 37.033v257.797L45.719 391.851zM255.707 33.297l55.466 22.786-179.951 78.501-61.035-25.074zm16 180.449 193.988-79.692v257.797l-193.988 79.692z"
            data-original="#000000"
          />
        </svg>
        <span>Category</span>
      
      </NavLink>
    </li>

    <li>
    <NavLink to={'/admin/add'} className={`text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all
      ${active === '/admin/add'? 'bg-gray-700':''}`}>
      
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-[18px] h-[18px] mr-4"
          viewBox="0 0 511.414 511.414"
        >
          <path
            d="M497.695 108.838a16.002 16.002 0 0 0-9.92-14.8L261.787 1.2a16.003 16.003 0 0 0-12.16 0L23.639 94.038a16 16 0 0 0-9.92 14.8v293.738a16 16 0 0 0 9.92 14.8l225.988 92.838a15.947 15.947 0 0 0 12.14-.001c.193-.064-8.363 3.445 226.008-92.837a16 16 0 0 0 9.92-14.8zm-241.988 76.886-83.268-34.207L352.39 73.016l88.837 36.495zm-209.988-51.67 71.841 29.513v83.264c0 8.836 7.164 16 16 16s16-7.164 16-16v-70.118l90.147 37.033v257.797L45.719 391.851zM255.707 33.297l55.466 22.786-179.951 78.501-61.035-25.074zm16 180.449 193.988-79.692v257.797l-193.988 79.692z"
            data-original="#000000"
          />
        </svg>
        <span>Product</span>
      
      </NavLink>
    </li>
    
    <li>
    <NavLink to={'/'} className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all">
      
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-[18px] h-[18px] mr-4"
          viewBox="0 0 193.769 193.769"
        >
          <path
            d="m149.203 41.104-9.348 12.009c20.15 15.679 30.201 41.063 26.234 66.253-2.906 18.484-12.838 34.73-27.964 45.748-15.131 11.012-33.64 15.488-52.124 12.567-38.157-6.008-64.32-41.938-58.322-80.098C30.585 79.097 40.52 62.85 55.648 51.835c13.208-9.615 28.991-14.233 45.086-13.317L87.579 52.319l9.759 9.313 20.766-21.801.005.008 9.303-9.769-9.752-9.303-.005.003L95.862 0l-9.31 9.769 14.2 13.525c-19.303-.913-38.21 4.702-54.059 16.242C28.28 52.943 16.19 72.717 12.65 95.221c-7.302 46.445 24.54 90.184 70.985 97.493a86.181 86.181 0 0 0 13.434 1.055c17.89 0 35.273-5.623 50.011-16.356 18.415-13.409 30.503-33.183 34.043-55.682 4.829-30.654-7.403-61.55-31.92-80.627z"
            data-original="#000000"
          />
          <path
            d="M105.24 151.971v-.003h.001v-8.757c10.383-1.159 20.485-7.718 20.485-20.17 0-16.919-15.732-18.859-27.223-20.274-7.347-.878-12.97-1.897-12.97-6.348 0-6.188 8.722-6.855 12.473-6.855 5.567 0 11.507 2.617 13.525 5.957l.586.971 11.542-5.341-.571-1.164c-4.301-8.793-12.009-11.337-17.85-12.364v-7.71H91.723v7.677c-12.582 1.856-20.054 8.839-20.054 18.829 0 16.29 14.791 17.943 25.582 19.153 9.617 1.134 14.094 3.51 14.094 7.469 0 7.563-10.474 8.154-13.685 8.154-7.147 0-14.038-3.566-16.031-8.301l-.495-1.169-12.539 5.316.5 1.169c3.713 8.691 11.725 14.137 22.63 15.425v8.336h13.515z"
            data-original="#000000"
          />
        </svg>
        <span>Home</span>
      </NavLink>
    </li>
    <li>
    <NavLink to={'/login'} className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-[18px] h-[18px] mr-4"
                viewBox="0 0 193.769 193.769"
              >
                <path
                  d="m149.203 41.104-9.348 12.009c20.15 15.679 30.201 41.063 26.234 66.253-2.906 18.484-12.838 34.73-27.964 45.748-15.128 11.023-33.589 15.393-52.073 12.488C58.569 173.697 34.682 152.53 29.3 124.48c-2.273-11.498-1.645-23.287 1.761-34.208l17.081 7.288a57.35 57.35 0 0 0-.139 26.617c7.929 40.092 48.69 42.462 55.426 43.475 30.836 4.843 59.815-16.964 64.658-47.8 4.843-30.834-16.964-59.815-47.8-64.658-14.87-2.333-29.964.635-42.167 8.409l11.637 8.883c8.548-4.667 18.425-6.252 27.904-4.717 7.69 1.207 14.918 4.436 21.027 9.057L108.16 108.14l68.909 24.738-7.507-73.854z"
                  data-original="#000000"
                />
              </svg>
              <button onClick={handleLogout} className="ml-2">Logout</button>
            </NavLink>
    </li>
    
    
  </ul>
</nav>

</>
)
}

export default Navbar