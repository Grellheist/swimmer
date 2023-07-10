import Post from "@/components/Post";
import { Providers } from "@/utils/providers"

export default function Explore() {
    const posts = [
        {
            id: "1",
            name: "Grellheist",
            username: "grellheist",
            userImg: "https://preview.redd.it/wk01okjvpar61.jpg?width=960&crop=smart&auto=webp&s=12cc4ee8093e75a6e0e69f24beefae50cfbfa2e2",
            imgUrl: "",
            content: "This social network is great! Wanna give it a shot? Sign in to start!",
            createdAt: "2023-06-06T03:01:17.303Z",
            authorId: "1",
            likeCount: 307,
            commentCount: 0
        },
        {
            id: "2",
            name: "Carmen K Huff",
            username: "tre_collie9",
            userImg: "https://www.fakepersongenerator.com/Face/female/female1021978351898.jpg",
            imgUrl: "",
            content: "gurrlll this is better than twitter fr fr ",
            createdAt: "2023-06-06T03:01:17.303Z",
            authorId: "2",
            likeCount: 15,
            commentCount: 0
        },
        {
            id: "3",
            name: "Richard T Ramirez",
            username: "tanner2015",
            userImg: "https://www.fakepersongenerator.com/Face/male/male1084136633667.jpg",
            imgUrl: "",
            content: "tired of reading statuses about octopus Paul. Bake him already!",
            createdAt: "2023-06-06T03:01:17.303Z",
            authorId: "3",
            likeCount: 1,
            commentCount: 0
        },
        {
            id: "4",
            name: "Danielle Merkel",
            username: "iisite",
            userImg: "https://www.fakepersongenerator.com/Face/female/female20161025006978424.jpg",
            imgUrl: "",
            content: "Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science.",
            createdAt: "2023-06-06T03:01:17.303Z",
            authorId: "4",
            likeCount: 0,
            commentCount: 0
        },
        {
            id: "5",
            name: "Heidi 😎",
            username: "theorook",
            userImg: "https://www.fakepersongenerator.com/Face/female/female20151024274203888.jpg",
            imgUrl: "https://images.unsplash.com/photo-1684410009281-160c97782efd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=770&q=80",
            content: "'Going commando' can refer to not wearing underpants, rescuing Alyssa Milano from terrorists, or preferably both at once.",
            createdAt: "2023-06-06T03:01:17.303Z",
            authorId: "5",
            likeCount: 3,
            commentCount: 0
        },
    ];
    return (
        <>
            <Providers>
                {posts.map((post) => (
                    <Post post={post} key={post.id} />
                ))}
            </Providers>
        </>
    )
}
