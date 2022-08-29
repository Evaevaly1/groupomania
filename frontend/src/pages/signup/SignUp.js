import React, {useEffect, useState} from "react";
import './SignUp.css'
import {Link} from "react-router-dom";
import {useCustomMutation} from "../../utils/customApiHook";
import { useNavigate } from 'react-router-dom';
// Fonction et page pour s'enregistrer
/**
 *
 * @returns
 */
function SignUp() {
    const [name, setName] = useState();
    const [lastname, setLastname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [mutationTool, {response, loading}] = useCustomMutation();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const registre = async (e) => {
        try {
            setIsLoading(true);
            e.preventDefault();
            const response = await mutationTool('auth/signup', {
                name: name,
                lastname: lastname,
                email: email,
                password: password
            });
            if (response.error) {
                setIsLoading(false);
                setError(response.error.message);
            } else {
                setIsLoading(false);
                setError(undefined);
                navigate('/');
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
        <div className='content content-signup'>
            <div className='card'>
                <form onSubmit={registre}>
                    <img src={require('./../../assets/logo/icon-left-font.png')}  alt="" style={{width: '100%', marginBottom: '0.5em'}}/>
                    <label>
                        Nom :
                        <input type="text" name="name" value={name || ''} data-testid="name-input"  onChange={e => setName(e.target.value)} />
                    </label>
                    <label>
                        Prénom :
                        <input type="text" name="lastname" value={lastname || ''} data-testid="name-input"  onChange={e => setLastname(e.target.value)} />
                    </label>
                    {
                        isLoading &&
                        <div className="loading-spinner"></div>
                    }
                    <label>
                        Email :
                        <input type="email" name="email" value={email || ''} data-testid="email-input" onChange={e => setEmail(e.target.value)} />
                    </label>
                    <label>
                        Mot de passe :
                        <input type="password" name="password"  value={password || ''} data-testid="password-input" onChange={e=>setPassword(e.target.value)}/>
                    </label>
                    {error && (
                        <div className="alert alert-danger" data-testid="error-msg" role="alert">
                            {error}
                        </div>
                    )}
                    <button style={{marginTop: '1em'}} data-testid="Button-valid" type="submit" className='btn btn-primary btn-block'>s'enregistrer</button>
                </form>
                <p>Vous avez un compte? <Link to='/'>Se connecter ici</Link></p>
            </div>
        </div>
    );
}
export default SignUp;
