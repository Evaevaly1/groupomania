import React, {useContext, useEffect, useState} from "react";
import Header from "../../components/header/header";
import {UserContext} from "../../utils/UserContext";
import {useCustomMutation, useCustomQuery} from "../../utils/customApiHook";

function NewPost() {
    const [title, setTitle] = useState("");
    const [describe, setDescribe] = useState("");
    const [postImage, setPostImage] = useState({myFile: " ",});
    const [isLoading, setIsLoading] = useState(false);
    const [erreur, setErreur] = useState();
    const [userId, setUserId] = useState();
    const {userState} = useContext(UserContext);
    const [insertTool, {response, loading}] = useCustomMutation();

    const handleMessageChange = event => {
        setDescribe(event.target.value);
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader .onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostImage({ ...postImage, myFile: base64 });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const post = {
            post:{
                userId:userId,
                name:title,
                manufacturer:" ",
                description:describe,
                mainPepper: " ",
                imageUrl:postImage.myFile,
                heat: 0,
                likes: 0,
                dislikes: 0,
                userLiked: "",
                usersDisliked:""
            }
        }
        setIsLoading(true);
        try {
            const response = await insertTool('post',post);
            if (!response.error){
                console.log(response);
                window.location.href = '/home';
            }
        }catch (e) {
            setIsLoading(false);
            console.log(e);
        }
    };

    const getDataUser = () => {
        try {
            setUserId(userState.userId);
        }catch (e) {
            setIsLoading(false);
        }

    }

    useEffect(()=> {
        getDataUser();
    }, []);

    return (
        <>
            <Header/>
            <div className='content content-home'>
                {
                    !isLoading &&
                    <div className='container' style={{marginTop: '3em'}}>
                        <div className='post' style={Styles.formEspacing}>
                            <form onSubmit={handleSubmit}>
                                <div style={Styles.formGroup}>
                                    <label>
                                        <input type="text" value={title} data-testid="titre-input" placeholder='Titre' onChange={(e) => setTitle(e.target.value)}/>
                                    </label>
                                </div>
                                <div style={Styles.formGroup}>
                                    <label style={Styles.labelControl}>
                                        <textarea placeholder='Entrer votre texte ici' data-testid="description-input" style={{height: '150px'}} value={describe} onChange={handleMessageChange}/>
                                    </label>
                                </div>
                                <div style={Styles.formGroup}>
                                    <label style={Styles.labelControl}>
                                        <input type="file" accept="image/png, image/jpg, image/gif, image/jpeg" data-testid="image-input" onChange={handleChange}/>
                                    </label>
                                </div>
                                {erreur && (
                                    <div className="alert alert-danger" data-testid="error-msg" role="alert">
                                        {erreur}
                                    </div>
                                )}
                                <button style={{marginTop: '1em'}} data-testid="Button-valid" type="submit" className='btn btn-primary btn-block'>Sauvegarder</button>
                            </form>
                        </div>
                    </div>
                }
                {
                    isLoading &&
                    <div className="loading-spinner" style={{marginLeft: "50%", marginTop: "20%"}}></div>
                }
            </div>
        </>
    );
}

const Styles = {
    formEspacing : {
        padding: '3em 4em 3em 4em'
    },
    formGroup: {
        marginBottom: '1em'
    }
}

export default NewPost;
