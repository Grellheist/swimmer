import Post from "@/components/Post";

export default function Explore() {
        const posts = [
        {
            id: 1,
            name: "Grellheist",
            username: "grellheist",
            userImg: "https://preview.redd.it/wk01okjvpar61.jpg?width=960&crop=smart&auto=webp&s=12cc4ee8093e75a6e0e69f24beefae50cfbfa2e2",
            imgUrl: "https://images.unsplash.com/photo-1682685796063-d2604827f7b3?ixlib=rb-4.0.3&ixid=m3wxmja3fdf8mhxwag90by1wywdlfhx8fgvufdb8fhx8fa%3d%3d&auto=format&fit=crop&w=1170&q=80",
            content: "nice view!",
            createdAt: "2h"
        },
        {
            id: 2,
            name: "Grellheist",
            username: "grellheist",
            userImg: "https://preview.redd.it/wk01okjvpar61.jpg?width=960&crop=smart&auto=webp&s=12cc4ee8093e75a6e0e69f24beefae50cfbfa2e2",
            imgUrl: "https://plus.unsplash.com/premium_photo-1667760701840-6d2e8ab46af0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=694&q=80",
            content: "forsen monkaS",
            createdAt: "4h"
        },
        {
            id: 3,
            name: "Grellheist",
            username: "grellheist",
            userImg: "https://preview.redd.it/wk01okjvpar61.jpg?width=960&crop=smart&auto=webp&s=12cc4ee8093e75a6e0e69f24beefae50cfbfa2e2",
            imgUrl: "",
            content: "Testing a post without an image",
            createdAt: "2m"
        },
        {
            id: 4,
            name: "Grellheist",
            username: "grellheist",
            userImg: "https://preview.redd.it/wk01okjvpar61.jpg?width=960&crop=smart&auto=webp&s=12cc4ee8093e75a6e0e69f24beefae50cfbfa2e2",
            imgUrl: "",
            content: "Testing a post with a huge paragraph and no image: Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
            createdAt: "2m"
        },
        {
            id: 5,
            name: "Grellheist",
            username: "grellheist",
            userImg: "https://preview.redd.it/wk01okjvpar61.jpg?width=960&crop=smart&auto=webp&s=12cc4ee8093e75a6e0e69f24beefae50cfbfa2e2",
            imgUrl: "https://images.unsplash.com/photo-1684410009281-160c97782efd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=770&q=80",
            content: "Testing a post with a huge paragraph and an image: Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
            createdAt: "2m"
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
