import faker from 'faker'
import { useEffect, useState } from 'react';

function Suggestions() {

    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        
        const suggestion = [...Array(5)].map((_,i) => ({
            ...faker.helpers.contextualCard(),
            id:i
        }))

        setSuggestions(suggestion);
        console.log(suggestions)
    }, [])

    const imagesPeople = [
        {avatar:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80'},
        {avatar:'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'},
        {avatar:'https://images.unsplash.com/photo-1488161628813-04466f872be2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80'},
        {avatar:'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'},
        {avatar:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'}
    ]

    return (
        <div className='mt-4 ml-10'>
            <div className='flex justify-between text-sm mb-5'>

            <div>
                <h3 className='text-sm font-bold text-gray-400'>Suggestions for you</h3>
            </div>
            <button className='mr-3 text-gray-600 font-semibold'>See All</button>
            </div>
            
           {suggestions.map( (profile) => (
               <div key={profile.id} className='flex items-center justify-between mt-4'>
                   <img className='h-12 w-12 rounded-full border p=[2px] object-contain' 
                   src={profile.avatar} alt="" />
                   {/* {imagesPeople.map((img) => (img.avatar))} */}
                   <div className='flex-1 ml-4'>
                   <p className="text-sm font-bold">{profile.username}</p>
                   <p className="text-xs text-gray-400 mr-2">{profile.company.name}</p>
                   </div>
                   <button className='text-sm text-blue-400 font-bold'>Follow</button>
               </div>
           ))}

        </div>

    )
}

export default Suggestions
