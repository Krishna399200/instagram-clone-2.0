import { useSession } from "next-auth/react"
import MiniProfile from "./MiniProfile"
import Posts from "./Posts"
import Stories from "./Stories"
import Suggestions from "./Suggestions"

function Feed() {
    const {data:session} = useSession()
    return (
        <main className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl 
        xl:grid-cols-3 xl:max-w-6xl mx-auto ${!session && "!grid-cols-1 !max-w-3xl"}`}>
            {/* Section */}
            <section className="col-span-2">
                {/* Stories */}
                <Stories/>
             
                {/* Feed */}
                {session ? <Posts/> : null }
                
            </section>


            {/* Section */}
            <section className="hidden xl:inline-grid md:col-span-1 ">
                {/* Mini profile */}
                {session ? (
                    <div className="fixed top-20">

                    <MiniProfile/>
    
                    {/* Suggestions */}
                    
                    <Suggestions/>
                    </div>
                ) : null}
                

            </section>
        </main>
    )
}

export default Feed
