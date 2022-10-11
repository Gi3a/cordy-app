import { Link } from 'react-router-dom'

import { useAuth } from "../hooks/useAuth";

// import Heart from "../../assets/images/icons/heart.svg";

import Paws from "../../assets/images/icons/paws.svg";
import { TbSearch, TbUser, TbHeart, TbSquarePlus } from "react-icons/tb";
import { MdPets, MdLogin } from "react-icons/md";

const Header = () => {

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