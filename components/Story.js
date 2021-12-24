import Image from 'next/image'
import people from '../assets/people.jpg'

function Story({img,username}) {
    return (
        <div className=''>
            {/* <img src={img} alt="people" /> */}
            <img src={img} alt="people" className='h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 
            object-contain cursor-pointer hover:scale-110 transiton transform duration-200 ease-out'/>
            <p className='text-xs w-14 truncate text-center'>{username}</p>
            {/* <h1></h1> */}
        </div>
    )
}

export default Story
