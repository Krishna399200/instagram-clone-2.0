import React, { useEffect, useState } from 'react'
import Post from './Post'
import profImg from '../assets/people.jpg'
import postIMg from '../assets/post.jpg' 
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from './firebase'

function Posts() {
    

    const [posts , setPosts] = useState([])

    useEffect(
        () => 
     onSnapshot(query(collection(db , 'posts') , orderBy("timestamp" , 'desc')) , 
        (snapshot) => {
            setPosts(snapshot.docs);
        }
        
        )
        

        // Coventional Way
    //    const unsubscribe = onSnapshot(query(collection(db , 'posts') , orderBy("timestamp" , 'desc')) , 
    //     (snapshot) => {
    //         setPosts(snapshot.docs);
    //     })

    //     return unsubscribe;
     , [db]
     );

console.log(posts)
    return (
        <div>
        {posts.map(post => (
            <Post
             key={post.id}
             id={post.id}
              username={post.data().username} 
              userImg={post.data().profileImg} 
              img={post.data().image} 
              caption={post.data().caption}/>
        ))}
        </div>
    )
}

export default Posts
