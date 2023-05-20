type PostProps = {
    id: number;
    name: string,
    username: string,
    userimg: string,
    img: string,
    text: string,
    timestamp: string
}

// For some reason, passing in the entire post object causes an error to occur  
// I couldn't debug it so I'll pass in each prop for now
export default function Post({ id, name, username, userimg, img, text, timestamp }: PostProps) {
    return (
        <>
            <div>{id}</div>
            <div>{name}</div>
            <div>{username}</div>
            <div>{userimg}</div>
            <div>{img}</div>
            <div>{text}</div>
            <div>{timestamp}</div>
        </>
    )
}
