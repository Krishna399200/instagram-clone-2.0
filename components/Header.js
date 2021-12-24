import Image from "next/image"
import instagram from '../assets/logo.png'
import instagram2 from '../assets/logo2.png'
import avatar from '../assets/avatar.jpg'
import {SearchIcon
,MenuIcon,
PaperAirplaneIcon,
PlusCircleIcon,
UserGroupIcon,
HeartIcon
} from '@heroicons/react/outline'
import {HomeIcon} from '@heroicons/react/solid'
import { signOut, useSession ,signIn} from "next-auth/react"
import {useRecoilState} from 'recoil'
import {modalState} from '../atoms/ModalAtom'
import {useRouter} from 'next/router'


function Header() {

    const {data:session} = useSession()
    const router = useRouter();
    const [open , setOpen] = useRecoilState(modalState)

    console.log(session)
    return (
        <div className="shadow-sm bg-white border-b sticky top-0 z-50">
            <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">

            <div onClick={() => router.push("/")} className="relative hidden lg:inline-grid w-24  cursor-pointer" >

                <Image   src={instagram} layout="fill"  objectFit="contain" />
            </div>
            <div  onClick={() => router.push("/")} className="relative  lg:hidden flex-shrink-0 w-8  cursor-pointer" >

                <Image   src={instagram2} layout="fill"  objectFit="contain" />
            </div>

            
    

       {/* Middle */}
        <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-1 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-500"/>
            </div>
            <input type="search" placeholder="Search" className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray
             focus:ring-black focus:border-black rounded-md" />
        </div>

       {/* Rigjht */}
       {session?.user ? (
           <div className="flex items-center justify-end space-x-4">

           <HomeIcon  onClick={() => router.push("/")} className="navBtn w-10 "/>
           <MenuIcon className="h-6 md:hidden cursor-pointer "/>
            <div className="relative navBtn">
    
           <PaperAirplaneIcon className=" navBtn  rotate-45 "/>
           <div className="absolute -top-2 left-3 text-xs w-6 h-6 bg-red-500 rounded-full 
           flex items-center justify-center animate-pulse">3</div>
            </div>
           <PlusCircleIcon onClick={() => setOpen(true)} className=" navBtn "/>
           <UserGroupIcon className=" navBtn "/>
           <HeartIcon className=" navBtn "/>
    
           <div className="relative w-10 h-10  cursor-pointer" >
    
                <img className="rounded-full"  src={session?.user.image} onClick={signOut} layout="fill"  objectFit="contain" />
            </div>
           </div>
       ): (
           <button onClick={signIn}>Sign In</button>
       )}
       

       {/* <button  >Register</button>
       <button     >
          Login
        </button> */}
            </div>
     </div>
    )
}

export default Header
