import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { unsetUser } from '../../store/features/user/userSlice';

import { useAuth } from "../hooks/use-auth";

import Heart from "../../assets/images/icons/heart.svg";
import Search from "../../assets/images/icons/search.svg";
import Pages from "../../assets/images/icons/pages.svg";
import Home from "../../assets/images/icons/home.svg";
import Logo from "../../assets/images/icons/logotype.svg";

const Header = () => {

    const dispatch = useDispatch();
    const { isAuth, id } = useAuth();

    return (
        <header>
            <div>
                <img src={Logo} alt="Logo" />
                TiNimal
            </div>
            <div>

            </div>
        </header>
    )
}

export default Header


// {isAuth ?
//     <>
//         <Link to="/">
//             <img src={Home} alt="Your SVG" />
//             Home
//         </Link>
//         <Link to={`/${id}`}>
//             Profile
//         </Link>
//         {/* <Link to="/create/cat">Create Cat</Link> */}
//         <button onClick={() => dispatch(unsetUser())}>
//             Log out {id}</button>


//     </>
//     :
//     <>
//         <Link to="/signup">Sign up</Link>
//         <Link to="/login">Login</Link>
//     </>
// }