import React, {useContext, useEffect, useState} from "react";
import './SignIn.css';
import {Link, useNavigate} from "react-router-dom";
import {useCustomMutation} from "../../utils/customApiHook";
import {AuthActionTypes, AuthContext} from "../../utils/AuthContext";
import {UserActionTypes, UserContext} from "../../utils/UserContext";
// Fonction et page pour la connexion
function SignIn() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [mutationTool, {response, loading}] = useCustomMutation();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const logo = require('./../../assets/logo/icon-left-font.png');
    const authContext = useContext(AuthContext);
    const userContext = useContext(UserContext);

    const login = async (e) => {
        try {
            setIsLoading(true);
            e.preventDefault();

            const response = await mutationTool('auth/login', {
                email: email,
                password: password
            });
            if (response.error) {
                setIsLoading(false);
                setError('Email ou mot de passe incorrecte');
                setPassword('');
            }
            else {
                setIsLoading(false);
                setError(undefined);
                const {dispatchUser} = userContext;
                dispatchUser({type: UserActionTypes.SetUserId, value: response.userId});
                dispatchUser({type: UserActionTypes.SetToken, value: response.token});
                dispatchUser({type: UserActionTypes.SetUserType, value: response.userType});
                console.log(userContext);
                const {dispatch} = authContext;
                dispatch({type: AuthActionTypes.SetIsLogged, value: true});
                navigate('/home');
            }
        } catch (e) {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home');
        }
    }, []);
    return (
        <div className='content content-signin'>
             <div className='card'>
                 <form onSubmit={login}>
                    <img src={logo} alt="" style={{width: '100%', marginBottom: '1.5em'}}/>
                    <label>
                        Adresse Email :
                        <input type="email" data-testid="email-input" value={email || ''} onChange={(event => {setEmail(event.target.value)})}/>
                    </label>
                    {
                        isLoading &&
                        <div className="loading-spinner"></div>
                    }
                    <label>
                        Mot de passe :
                        <input type="password" data-testid="password-input" name="password" value={password || ''} onChange={(event => {setPassword(event.target.value)})} />
                    </label>
                     {error && (
                         <div className="alert alert-danger" data-testid="error-msg" role="alert">
                             {error}
                         </div>
                     )}
                    <button style={{marginTop: '1em'}} data-testid="Button-valid" type="submit" className='btn btn-primary btn-block'>se connecter</button>
                </form>
                <p>Vous n'avez pas de compte ? <Link to='signup'> S'enregistrer ici</Link></p>
            </div>
        </div>
    );
}
export default SignIn;
