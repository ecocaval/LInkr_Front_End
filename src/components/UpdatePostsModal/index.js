import { useContext } from "react";
import { IoReload } from "react-icons/io5";
import { PostsContext } from "../../contexts/PostsProvider";
import { StyledModal } from "./styles";

export default function UpdatePostsModal() {

    const {
        postsToUpdate,
        setPosts,
        updatedPosts,
        setPostsToUpdate
    } = useContext(PostsContext)

    return (
        <StyledModal
            onClick={() => {
                setPosts(updatedPosts)
                setPostsToUpdate(0)
            }}
        >
            <p>{String(postsToUpdate)} new posts, load more!</p>
            <IoReload
                style={{
                    color: "#FFFFFF"
                }}
            />
        </StyledModal>
    )
}
