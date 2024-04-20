import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../utils/consts";

const AuthRegBtn = () => {

    const navigate = useNavigate();

    return (
        <div>
        <button onClick={() => navigate(LOGIN_ROUTE)}>Авторизация/Регистрация</button>
        </div>
    )
}

export default AuthRegBtn;
