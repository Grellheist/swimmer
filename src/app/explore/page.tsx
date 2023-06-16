import Post from "@/components/Post";

export default function Explore() {
    const posts = [
        {
            id: "1",
            name: "Grellheist",
            username: "grellheist",
            userImg: "https://preview.redd.it/wk01okjvpar61.jpg?width=960&crop=smart&auto=webp&s=12cc4ee8093e75a6e0e69f24beefae50cfbfa2e2",
            imgUrl: "https://images.unsplash.com/photo-1682685796063-d2604827f7b3?ixlib=rb-4.0.3&ixid=m3wxmja3fdf8mhxwag90by1wywdlfhx8fgvufdb8fhx8fa%3d%3d&auto=format&fit=crop&w=1170&q=80",
            content: "wow look at this picture I took!",
            createdAt: "2023-06-06T03:01:17.303Z",
            authorId: "1"
        },
        {
            id: "2",
            name: "Grellheist",
            username: "grellheist",
            userImg: "https://preview.redd.it/wk01okjvpar61.jpg?width=960&crop=smart&auto=webp&s=12cc4ee8093e75a6e0e69f24beefae50cfbfa2e2",
            imgUrl: "https://plus.unsplash.com/premium_photo-1667760701840-6d2e8ab46af0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=694&q=80",
            content: "very nice",
            createdAt: "2023-06-06T03:01:17.303Z",
            authorId: "1"
        },
        {
            id: "3",
            name: "Grellheist",
            username: "grellheist",
            userImg: "https://preview.redd.it/wk01okjvpar61.jpg?width=960&crop=smart&auto=webp&s=12cc4ee8093e75a6e0e69f24beefae50cfbfa2e2",
            imgUrl: "",
            content: "hello guys",
            createdAt: "2023-06-06T03:01:17.303Z",
            authorId: "1"
        },
        {
            id: "4",
            name: "Grellheist",
            username: "grellheist",
            userImg: "https://preview.redd.it/wk01okjvpar61.jpg?width=960&crop=smart&auto=webp&s=12cc4ee8093e75a6e0e69f24beefae50cfbfa2e2",
            imgUrl: "",
            content: "Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science.",
            createdAt: "2023-06-06T03:01:17.303Z",
            authorId: "1"
        },
        {
            id: "5",
            name: "Grellheist",
            username: "grellheist",
            userImg: "https://preview.redd.it/wk01okjvpar61.jpg?width=960&crop=smart&auto=webp&s=12cc4ee8093e75a6e0e69f24beefae50cfbfa2e2",
            imgUrl: "https://images.unsplash.com/photo-1684410009281-160c97782efd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=770&q=80",
            content: "What the fuck did you just fucking say about me, you little bitch? I’ll have you know I graduated top of my class in the Navy Seals, and I’ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills.  I am trained in gorilla warfare and I’m the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words.  You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You’re fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that’s just with my bare hands.  Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little “clever” comment was about to bring down upon you, maybe you would have held your fucking tongue.  But you couldn’t, you didn’t, and now you’re paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it.  You’re fucking dead, kiddo.",
            createdAt: "2023-06-06T03:01:17.303Z",
            authorId: "1"
        },
    ];
    return (
        <>
            {posts.map((post) => (
                <Post
                    post={post}
                    key={post.id}
                    
                />
            ))}
        </>
    )
}
