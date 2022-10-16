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
            {isAuth ?
                <nav>
                    <div className="nav__logo">
                        <Link to="/">
                            <MdPets />
                            <span>TiNimal</span>
                        </Link>
                    </div>
                    <div className="nav__menu">


                        <Link to="/search">
                            <TbSearch />
                            <span>Поиск</span>
                        </Link>
                        <Link to="/favorites">
                            <TbHeart />
                            <span>Избранное</span>
                        </Link>
                        <Link to="/pet">
                            <TbSquarePlus />
                            <span>Добавить Питомца</span>
                        </Link>
                        <Link to={`/pets/${id}`}>
                            <MdPets />
                            <span>Мои Питомцы</span>
                        </Link>
                        <Link to={`/${id}`}>
                            <TbUser />
                            <span>{name}</span>
                        </Link>


                    </div>
                </nav>
                :
                <></>
            }
        </header>
    )
}

export default Header