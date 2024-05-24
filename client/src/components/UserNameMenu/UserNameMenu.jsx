import { useAuth0 } from "@auth0/auth0-react";
import './userNameMenu.css';
import { Link } from "react-router-dom";

const UserNameMenu = () => {

    const { user, logout } = useAuth0();

  return (
    <div className="user__wrapp">
        <div>{user?.email}</div>
        <div>{user?.name}</div>
        <button onClick={() => logout()}>Выйти</button>
    </div>
  )
}

export default UserNameMenu;
