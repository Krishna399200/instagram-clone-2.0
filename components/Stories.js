import faker from 'faker'
import { useEffect, useState } from 'react'
import Story from './Story'
import people from '../assets/people.jpg'
import Image from 'next/image';
import { useSession } from 'next-auth/react';

function Stories() {

    const [suggestionList, setSuggestionList] = useState([]);

    const suggestions =  [...Array(20)].map((_,i) => ({
        ...faker.helpers.contextualCard(),
        id:i,
    }));
    useEffect(() => {
        
        console.log(suggestions);
        setSuggestionList(suggestions);
        console.log(suggestionList);
    }, [])

    const {data:session} = useSession()

    return (
        <div className='flex space-x-2 p-8 bg-white mt-2 border-gray-200 rounded-sm overflow-x-scroll ease-out
        scrollbar-thin scrollbar-thumb-black '>
            {session && (
                <Story img={session.user.image} username={session.user.name}/>
            )}

            {suggestionList.map(profile => (
                <Story key={profile.id} img={profile.avatar} username={profile.username} />
                // <h1>{profile.username}</h1>
            ))}
        </div>
    )
}

export default Stories
