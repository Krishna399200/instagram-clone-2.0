import { signOut, useSession } from 'next-auth/react'
import avatar from  '../assets/avatar.jpg'

function MiniProfile() {
    const {data:session} = useSession()
    console.log(session)
    return (
        <div className='flex items-center  mt-14 ml-10'>
            <img src={session?.user.image} alt=""
             className='w-16 h-16 rounded-full border p-[2px]  object-contain' />
            
            <div>
            <p className='font-semibold mr-2'>{session?.user.username}</p>
            <p className='text-xs'>Welcome to Instagram</p>
            </div>

            <button className='text-blue-400 font-bold mr-3' onClick={signOut}>Sign Out</button>
        </div>
    )
}

export default MiniProfile
