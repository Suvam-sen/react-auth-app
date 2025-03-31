import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../utils/firebase'

const Dashboard = () => {

  const handleLogout = async () => {
    try {
      await signOut(auth)
      console.log("Logged out succesfully")
    } catch (error) {
      console.log("issue with log out", error);
      
    }
  }

  return (
    <div className='h-screen w-screen bg-gray-500 text-white'>
      <div className='p-8 flex justify-between'>
      <h2>Dashboard pages</h2>
      <div>
        <button
            className="bg-blue-500 text-white p-2 rounded-xl w-40 mx-auto cursor-pointer"
            onClick={handleLogout}
            >
          Logout
        </button>
      </div>
      </div>

    </div>
  )
}

export default Dashboard