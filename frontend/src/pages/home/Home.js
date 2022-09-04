import React, {useContext, useEffect, useState} from "react";
import Header from "../../components/header/header";
import './Home.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClock, faEdit, faThumbsUp, faThumbsDown, faTrash} from'@fortawesome/free-solid-svg-icons'
import Colors from "./../../utils/Colors"
import {Link, useNavigate} from "react-router-dom";
import {useCustomMutation, useCustomMutationDelete, useCustomQuery} from "../../utils/customApiHook";
import {UserContext} from "../../utils/UserContext";

function Home() {
    const [posts, setPosts] = useState([]);
    const [userType, setUserType] = useState('user');
    const [userId, setUserId] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [mutationTool, {response, loading}] = useCustomMutation();
    const [queryTool, {responseQ, loadingQ}] = useCustomQuery();
    const [deleteTool, {responseD, loadingD}] = useCustomMutationDelete();
    const {userState} = useContext(UserContext);
    const [erreur, setErreur] = useState();

    const navigate = useNavigate();

    const like = async (post, index) => {
        try {
            const isInclude = post.usersLiked.includes(userId);
            const isIncludeDislike = post.usersDisliked.includes(userId);
            if (isInclude) {
                posts[index].usersLiked.splice(post.usersLiked.indexOf(userId), 1);
                posts[index].likes--;
                console.log("Moins: ",posts[index].likes);
                mutationTool('post/' + post._id + '/like', {
                    like: isInclude? 0 : 1,
                    userId
                });
            } else {
                posts[index].usersLiked.push(userId);
                posts[index].likes++;
                console.log("Plus: ",posts[index].likes);
                mutationTool('post/' + post._id + '/like', {
                    like: isInclude? 0 : 1,
                    userId
                });
                if(isIncludeDislike){
                    posts[index].usersDisliked.splice(post.usersDisliked.indexOf(userId), 1);
                    posts[index].dislikes--;
                    console.log("Dislike moins: ",posts[index].dislikes);
                    mutationTool('post/' + post._id + '/like', {
                        like: -2,
                        userId
                    });
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
    const dislike = async (post, index) => {
        try {
            const isInclude = post.usersDisliked.includes(userId);
            const isIncludeLike = post.usersLiked.includes(userId);
            if (isInclude) {
                posts[index].usersDisliked.splice(post.usersDisliked.indexOf(userId), 1);
                posts[index].dislikes--;
                console.log("Dislike moins: ",posts[index].dislikes);
                mutationTool('post/' + post._id + '/like', {
                    like: -2,
                    userId
                });
            } else {
                posts[index].usersDisliked.push(userId);
                posts[index].dislikes++;
                console.log("Dislike plus: ",posts[index].dislikes);
                mutationTool('post/' + post._id + '/like', {
                    like: -1,
                    userId
                });
                if (isIncludeLike){
                    posts[index].usersLiked.splice(post.usersLiked.indexOf(userId), 1);
                    posts[index].likes--;
                    console.log("Moins: ",posts[index].likes);
                    mutationTool('post/' + post._id + '/like', {
                        like: 0,
                        userId
                    });
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
    
           
	/**
	 * Display a base64 URL inside an iframe in another window.
	 */
	const openImage = (base64URL) => {
		var win = window.open();
		win.document.write('<iframe src="' + base64URL  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
	}




    const deletePost = (post, index) => {
        try {
            posts.splice(index, 1);
            deleteTool('post', post._id );
        } catch (e) {
            console.log(e)
        }
    }

    const getAllPost = async() => {
        try {
            setIsLoading(true)
            const response = await queryTool('post/');
            if (!response.error) {
                setPosts(response);
            }
            setIsLoading(false);
        } catch (e) {
            setErreur(e)
        }

    }

    const getUserData = () => {
        try {
            setUserId(userState.userId);
            setUserType(userState.userType)
        }catch (e) {
            setErreur(e);
        }
    }
    // Hooks pour vérifier si le token n'est pas encore expiré sinon on le renvoie dans la page SignIn

    useEffect(() => {
        getUserData();
        getAllPost();
    }, []);


    return (
        <>
            <Header/>
            <div className='content content-home'>
                {
                    !isLoading ?
                        <div className='container' style={{marginTop: '3em'}}>
                            {posts.map((post, index) =>
                                <div className='post' key={post._id} data-testid="liste">
                                    <div className="posted" data-testid="posted">
                                        <FontAwesomeIcon icon={faClock}/> Poste par <span style={{fontSize: '0.9em', color: Colors.primary}}>{post?.userId?.name || 'Unamed'} {post?.userId?.lastname}</span> le {new Date(post.createdAt).toLocaleString('fr-FR')}
                                    </div>
                                    <div className='posttext' data-testid="liste">
                                        <h2>{`${post.name}`}</h2>
                                        <p>{`${post.description}`}</p>
                                        {
                                            post.imageUrl !==" " &&

											  <img width='100' height='100' src={`${post.imageUrl}`} alt="" onClick={() => { openImage(post.imageUrl) }}/>

                                        }
                                    </div>
                                    <div className="postinfobot"
                                         style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <div>
                                            <button onClick={async () => {await like(post, index)}} data-testid="like-button" className="up" style={{color: Colors.primary, fontWeight: '700'}}>
                                                {
                                                    post.usersLiked.includes(userId) ?
                                                        <FontAwesomeIcon icon={faThumbsUp} color={Colors.primary} size="lg"/> :
                                                        <FontAwesomeIcon icon={faThumbsUp} color={Colors.secondary} size="lg"/>
                                                }
                                                {`${post.likes}`}
                                            </button>
                                            <button onClick={async () => {await dislike(post, index)}} data-testid="dislike-button" className="down" style={{color: Colors.primary, fontWeight: '700'}}>
                                                {
                                                    post.usersDisliked?.includes(userId) ?
                                                    <FontAwesomeIcon icon={faThumbsDown} color={Colors.tertiaire} size="lg"/> :
                                                    <FontAwesomeIcon icon={faThumbsDown} color={Colors.secondary} size="lg"/>}{`${post.dislikes}`}
                                            </button>



                                        </div>
                                        {((post.userId && post.userId._id == userId) || userType == 'admin') && (
                                            <div style={{float: 'right', marginLeft: '500px'}}>
                                                <Link to={`/modif-post/${post._id}`}>
                                                    <FontAwesomeIcon icon={faEdit} size="lg" color={Colors.tertiaire}></FontAwesomeIcon>
                                                </Link>
                                                <button onClick={() => {
                                                    deletePost(post, index)
                                                }} className="up" data-testid="delete-post" style={{color: Colors.primary, fontWeight: '700'}}>
                                                    <FontAwesomeIcon icon={faTrash} color={Colors.primary}
                                                                     size="lg"></FontAwesomeIcon>
                                                </button>

                                            </div>
                                        ) }
                                        <div></div>
                                    </div>
                                </div>
                            )}

                            {/*<div className='pagination-block'>
                            <ReactPaginate
                                className="pagination"
                                breakLabel="..."
                                nextLabel="Suivant >"
                                onPageChange={() => {}}
                                pageRangeDisplayed={5}
                                pageCount={10}
                                previousLabel="< Precedent"
                                renderOnZeroPageCount={null}
                                />
                            </div>
                        */}
                        </div> :
                        <div className="loading-spinner" style={{marginLeft: "50%", marginTop: "20%"}}></div>
                }
            </div>
        </>);
}
export default Home;
