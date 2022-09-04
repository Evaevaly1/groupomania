import React, {useContext} from "react";
import './header.css'
import {Link, useNavigate} from "react-router-dom";
import {AuthActionTypes, AuthContext} from "../../utils/AuthContext";
import {faClock, faEdit, faThumbsUp, faThumbsDown, faTrash} from'@fortawesome/free-solid-svg-icons'
import {UserActionTypes, UserContext} from "../../utils/UserContext";

function Header() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const userContext = useContext(UserContext);
     const signout = () => {
        const {dispatch} = authContext;
        const {dispatchUser} = userContext;
        dispatchUser({type: UserActionTypes.Reset});
        dispatch({type: AuthActionTypes.SetIsLogged, value: false});
        navigate('/');
    }
    return (
        <div className='headernav'>
            <div className='container' style={{display: 'flex',height: '100%',flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Link to={'/home'}><img src={require('./../../assets/logo/icon-left-font.png')} alt="" style={{width: '200px'}}/></Link>
                <Link to={'/new-post'} className='btn btn-secondary'>Nouveau Post</Link>
                <button className='btn btn-primary' onClick={signout}>Se deconnecter </button>
            </div>
        </div>
    );
}
export default Header;
