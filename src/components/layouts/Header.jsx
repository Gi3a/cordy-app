import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { unsetUser } from '../../store/features/user/userSlice';

import { useAuth } from "../hooks/use-auth";

// import Heart from "../../assets/images/icons/heart.svg";
// import Search from "../../assets/images/icons/search.svg";
// import Pages from "../../assets/images/icons/pages.svg";
import Paws from "../../assets/images/icons/paws.svg";
// import Home from "../../assets/images/icons/home.svg";
// import Logo from "../../assets/images/icons/logotype.svg";
// import Profile from "../../assets/images/icons/profile.svg";

import { TbSearch, TbUser, TbHeart, TbSquarePlus } from "react-icons/tb";
import { MdPets, MdLogin } from "react-icons/md";

const Header = () => {

    const dispatch = useDispatch();
    const { isAuth, id, name } = useAuth();

    return (
        <header>
            <nav>
                <div className="nav__logo">
                    <Link to="/">
                        <img src={Paws} alt="Paws" />
                        TiNimal
                    </Link>
                </div>
                <div className="nav__menu">
                    {isAuth ?
                        <>
                            <Link to="/search">
                                <TbSearch />
                                Поиск
                            </Link>
                            <Link to="/favorites">
                                <TbHeart />
                                Избранное
                            </Link>
                            <Link to="/pet">
                                <TbSquarePlus />
                                Добавить Питомца
                            </Link>
                            <Link to={`/pets/${id}`}>
                                <MdPets />
                                Мои Питомцы
                            </Link>
                            <Link to={`/${id}`}>
                                <TbUser />
                                {name}
                            </Link>
                        </>
                        :
                        <>
                            <Link to="/signup">
                                <MdPets />
                                Signup
                            </Link>
                            <Link to="/login">
                                <MdLogin />
                                Login
                            </Link>
                        </>
                    }
                </div>
            </nav>
        </header>
    )
}

export default Header

{/*
<Link to="/">
                        <TbUser />
                        Profile
                    </Link>
<Link to="/">
                        <TbSearch />
                        Search
                    </Link>
                    <Link to="/">
                        <TbSettings />
                        Settings
                    </Link>
                    <Link to="/">
                        <TbLogout />
                        Logout
                    </Link> */}
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