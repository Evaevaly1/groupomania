import React, {useState, useEffect} from "react";
import Header from "../../components/header/header";
import {useNavigate, useParams} from "react-router-dom";
import {useCustomMutationUpdate, useCustomQuery} from "../../utils/customApiHook";

function ModifPost() {
    const [title, setTitle] = useState("");
    const [describe, setDescribe] = useState("");
    const [posts, setPosts] = useState([]);
    const {id} = useParams();
    const [postImage, setPostImage] = useState({myFile: " ",});
    const [isLoading, setIsLoading] = useState(false);
    const [queryTool, {response, loading}] = useCustomQuery();
    const [updateTool, {responseD, loadingD}] = useCustomMutationUpdate();
    const navigate = useNavigate()

    const getData = async () => {
        try {
            setIsLoading(true);
            const response = await queryTool('post/' + id);
            if (!response.error) {
                setPosts(response);
                setTitle(response.name);
                setDescribe(response.description);
                setPostImage({...postImage, myFile: response.imageUrl});
            }
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        try {
            getData();
        }catch (e) {
            console.log(e)
        }
    },[]);

    const handleMessageChange = event => {
        setDescribe(event.target.value);
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            if (file) {
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    resolve(fileReader.result);
                };
                fileReader.onerror = (error) => {
                    reject(error);
                };
            } else {
                console.log('here');
                resolve(' ');
            }
        });
    };

    const handleChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostImage({...postImage, myFile: base64});
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await updateTool('post/'+id,{
                name: title,
                description: describe,
                imageUrl: postImage.myFile
            });
            if (!response.error){
                window.location.href = '/home';
            }
        }catch (e) {
            setIsLoading(false);
            console.log(e);
        }
    };

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
                                        <input type="text" placeholder='Titre' data-testid="titre-input" defaultValue={posts.name} onChange={(e) => setTitle(e.target.value)}/>
                                    </label>
                                </div>
                                <div style={Styles.formGroup}>
                                    <label style={Styles.labelControl}>
                                        <textarea placeholder='Entrer votre texte ici' style={{height: '150px'}} defaultValue={posts.description} onChange={handleMessageChange}/>
                                    </label>
                                </div>
                                <div>
                                    {/*  {
                                        posts.imageUrl !==" " &&
                                        <img width='100' height='100' src={`${posts.imageUrl}`} alt=""/>
                                    }*/}
                                    {
                                        postImage.myFile !==" " &&
                                        <img width='100' height='100' src={`${postImage.myFile}`} alt=""/>
                                    }
                                </div>
                                <div style={Styles.formGroup}>
                                    <label style={Styles.labelControl}>
                                        <input type="file" accept="image/png, image/jpg, image/gif, image/jpeg" onChange={handleChange}/>
                                    </label>
                                    {
                                        postImage.myFile !==" " &&
                                        <label style={Styles.labelControl}>
                                            <button type='button' onClick={() => {setPostImage({myFile: " ",})}}>Supprimer Image</button>
                                        </label>
                                    }


                                </div>
                                <button style={{marginTop: '1em'}} type="submit" className='btn btn-primary btn-block'>Modifier</button>
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

export default ModifPost;