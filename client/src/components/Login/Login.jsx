import React, {useState, useEffect} from 'react'

import  './Login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/action';
import { useNavigate, Link } from 'react-router-dom';


export default function Login() {
const dispatch = useDispatch();
const navigate = useNavigate()
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [open, setOpen] = useState("");
const role = useSelector(state => state.role);
const token = useSelector(state => state.token);


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (email && password) {
      const authenticationSuccess = await dispatch(login(email, password));

      if (authenticationSuccess) {
        const roleUser = role
        if (roleUser === "admin") {
          
          console.log("Autenticación exitosa. Redirigiendo a /dashboard");
          navigate("/admin");
        } else if (roleUser === "user") {
          console.log("Autenticación exitosa. Redirigiendo a /dashboard");
          navigate("/dashboard");
        }
      } else {
        console.error("Autenticación fallida");
        setOpen(true);
      }
    } else {
      console.error("Correo electrónico y/o contraseña no proporcionados");
    }
  } catch (error) {
    console.error("Error durante el inicio de sesión", error);
    setOpen(true);
  }
};


  return (
    <>
  
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src={require("../../Logos/logo-1.png")}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Iniciar sesión
          </h2>
          <p className="mt-10 text-center ">
            ¿Aún no tiene una cuenta?
            <Link to="/auth/register">Regístrese</Link>
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Dirección de correo electrónico
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contraseña
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    ¿Has olvidado tu contraseña?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
                Iniciar sesión
              </button>
            </div>
          </form>

          {/*    <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
          </p> */}
        </div>
      </div>
    </>
  );
}
