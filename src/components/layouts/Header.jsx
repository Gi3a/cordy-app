import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { unsetUser } from '../../store/features/user/userSlice';

import { useAuth } from "../hooks/use-auth"

const Header = () => {

    const dispatch = useDispatch();
    const { isAuth, id } = useAuth();

    return (
        <header>
            <Link to="/">Home</Link>
            {isAuth ?
                <>
                    <button onClick={() => dispatch(unsetUser())}>
                        Log out {id}</button>
                </>
                :
                <>
                    <Link to="/signup">Sign up</Link>
                    <Link to="/login">Login</Link>
                </>
            }
        </header>
    )
}

export default Header