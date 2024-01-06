import { useState } from "react";
function SayHello() {
    const [isFollowing, setIsFollowing] = useState(1)
    return (
        <>
            <button onClick={() => {
                setIsFollowing(isFollowing + 1);
            }}>click to add counter </button>
            <span>{isFollowing}</span>
        </>
    )
}
export default SayHello;