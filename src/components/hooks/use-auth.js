import { useSelector } from "react-redux";

export function useAuth() {
    const {
        jwttoken,
        id,
        login,
        name,
        phoneNumber,
        mail,
        address,
        avatar,
        ranking
    } = useSelector(state => state.user);

    return {
        isAuth: !!id,
        id,
        jwttoken,
        login,
        name,
        phoneNumber,
        mail,
        address,
        avatar,
        ranking
    }
}