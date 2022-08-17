import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext} from "../../auth/authContext"
import { types } from "../../types/types";

const LoginScreen = () => {
  
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    
    const action = {
      type: types.login,
      payload: { name: 'Estanislao' }
    }

    dispatch(action);

    const lastPath = localStorage.getItem('lastPath') || '/marvel';

    navigate(lastPath, {
       replace: true
    });
  }

  return (
    <div className="container mt-5">
        <h1>Iniciar Sesion</h1>
        <hr />

        <form className="form">
          <input 
              type="text"
              className="form-control"
              placeholder="username"
            />

            <input 
              type="password"
              className="form-control my-3"
              placeholder="password"
            />
            
            <button 
              className="btn btn-info text-white w-50"
              onClick={handleLogin}
            >
              Login
            </button>
        </form>
    </div>
  )
}

export default LoginScreen