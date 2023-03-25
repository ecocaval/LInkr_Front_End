import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ButtonFollow from "../../components/ButtonFollow"
import Header from "../../components/Header"
import Loader from "../../components/Loader"
import TrendingHashtags from "../../components/TrendingHashtags"
import UserPost from "../../components/UserPost"
import { MobileSearchContext } from "../../contexts/MobileProvider"
import { UserContext } from "../../contexts/UserProvider"
import { NoPostText, PostsWrapper, Title, TrendingWrapper, UserArea } from "./styles"
import getUserPosts from "./utils/getUserPosts"
import getPageUser from "./utils/getPageUser"

export default function UserPage() {
    const { id } = useParams()

    const { myUser } = useContext(UserContext)
    const { userSelected, setUserSelected } = useContext(UserContext)
    const { showMobileSearchInput } = useContext(MobileSearchContext)

    const [userPosts, setUserPosts] = useState([])
    const [gotPosts, setGotPosts] = useState(false)

    async function handleUserPosts() {
        const posts = await getUserPosts(id)
        if(posts) {
            setUserPosts(posts)
            setGotPosts(true)
        }
    }

    useEffect(() => {
        if (!userSelected) {
            getPageUser(setUserSelected, id)
        }
        handleUserPosts()
        // eslint-disable-next-line
    }, [id, userSelected])

    return (
        <>
            <Header />
            <UserArea showMobileSearchInput={showMobileSearchInput}>
                <PostsWrapper>
                    <div>
                        <img
                            src={userSelected?.image}
                            style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "25px",
                            }}
                            alt="User img"
                            data-test="avatar"
                        />
                        <Title>{`${userSelected?.name}'s posts`}</Title>
                    </div>
                    {
                        userPosts[0] ? userPosts.map((post, index) => <UserPost key={index} post={post} />) :
                            (gotPosts ? <NoPostText data-test="message">There are no posts yet</NoPostText> : <Loader />)
                    }
                    <TrendingWrapper>
                        <TrendingHashtags />
                    </TrendingWrapper>
                    {myUser.id !== Number(id) && <ButtonFollow/>}
                </PostsWrapper>
            </UserArea>
        </>
    )
}