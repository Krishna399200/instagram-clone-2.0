import React, { useEffect, useState } from "react"
import {DotsHorizontalIcon
    ,HeartIcon,
    ChatIcon,
    PaperAirplaneIcon,
    BookmarkIcon,
    EmojiHappyIcon,

    } from '@heroicons/react/outline'
    import { HeartIcon as HeartSolid } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { async } from "@firebase/util";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import Moment from 'react-moment'

function Post({id,username,img,userImg,caption,}) {

    const [comment , setComment] = useState("");
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState([])
    const [hasLiked, setHasLiked] = useState(false)

    const {data:session} = useSession();

    const sendComment = async (e) => {
        e.preventDefault()

        const commentToSend = comment;
        setComment('')

        await addDoc(collection(db , 'posts' , id , 'comments') , {
            comment:commentToSend,
            username:session.user.username,
            userImage:session.user.image,
            timestamp: serverTimestamp(),
        });
    };

    

    useEffect(
        () => 
     onSnapshot(query(collection(db , 'posts' , id ,'comments') , orderBy("timestamp" , 'desc')) , 
        (snapshot) => {
            setComments(snapshot.docs);
        }
        
        )
        

        // Coventional Way
    //    const unsubscribe = onSnapshot(query(collection(db , 'posts') , orderBy("timestamp" , 'desc')) , 
    //     (snapshot) => {
    //         setPosts(snapshot.docs);
    //     })

    //     return unsubscribe;
     , [db,id]
     );

     useEffect( () => 
     onSnapshot(collection(db , 'posts' , id ,'likes')  , 
        (snapshot) => 
            setLikes(snapshot.docs)
        
        
        ), [db,id]);

    useEffect(() => {
        
        setHasLiked(
            likes.findIndex((like) => (like.id === session?.user?.uid)) !== -1
        );
        
    }, [likes])

        const handleLikes = async () => {
            if(hasLiked){
                await deleteDoc(doc(db , 'posts' ,id , 'likes' , session.user.uid))
            } else {
                await setDoc(doc(db, 'posts' , id , 'likes' , session.user.uid) , {
                    username : session.user.username,
                });
            }
       
        };

     console.log(likes)

    return (
        <div className="bg-white border-rounded-sm my-7 ">
           {/* Header */}
        <div className="flex items-center p-5">

            <img src={userImg} className="rounded-full h-12 w-12 object-contain border p-1 mr-3" alt="" />
            <p className="flex-1 font-bold">{username}</p>
            <DotsHorizontalIcon className="h-5 justify-end cursor-pointer"/>
        </div>
           {/* image */}

            <img src={img} alt="" className="object-cover w-full" />

           {/* buttons */}
        <div className="flex justify-between px-4 pt-4">
            <div className="flex space-x-3">
                {hasLiked ? (
                    <HeartSolid onClick={handleLikes}
                    className="btn text-red-400"/>
                ): (

                <HeartIcon 
                onClick={handleLikes}
                className="btn"/>
                 )}
                <ChatIcon className="btn"/>
                <PaperAirplaneIcon className="btn"/>
            </div>
            <BookmarkIcon className="btn"/>
        </div>

            
           {/* caption */}
        <div className="p-5 truncate">
            {likes.length > 0 && (
                <p className="font-bold mb-1 text-sm">{`${likes.length} likes`}</p>
            )}
            <p><span className="font-bold mr-3">{username}</span>{caption}</p>
        </div>
           {/* comments */}
        {comments.length > 0 && (

           <div>
        {comments.map(comment => (
            <div key={comment.id} className="flex items-center px-5 mb-3">
                <img className="h-8 w-8 rounded-full object-contain" src={comment.data().userImage} alt="" />
                 <p className="font-bold mr-3">{comment.data().username}</p>
                <p className="text-sm flex-1">{comment.data().comment}</p>
           
            <Moment fromNow className="pr-2 text-xs">
                {comment.data().timestamp?.toDate()}
            </Moment>
            </div>
        ))}
           </div>
        )}
           {/* input */}
            <form className="flex items-center p-3" >
            <EmojiHappyIcon className="btn"/>
            <input type="text" 
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 border-none focus:ring-0 outline-none"/>
            <button 
            type="submit"
            onClick={sendComment}
            className="font-semibold text-blue-500">Post</button>
            </form>
        </div>
    )
}

export default Post
