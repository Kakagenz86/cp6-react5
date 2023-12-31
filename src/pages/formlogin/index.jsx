import { useState } from 'react'
import Navbar from '../../components/Navbar';
import * as requestAPI from '../../api/api'
import { Link, useNavigate } from 'react-router-dom';
import './style.css'

const FormLogin = () => {
    const [name, setUsername] = useState ('')
    const [password, setPassword] = useState ('')
    const [login, setLogin] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleUsername = (e) => {
        setUsername(e.target.value)
        setLogin('')
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
        setLogin('')
    }

    const handleSubmit = async () => {
        const bodyPayLoad = {
            username: name,
            password: password,
        }

        if (!name | !password) {
            setLogin('Username dan Password wajib diisi gaesss');
            return
        }
        // bisa pakai return atau else yang kurung kurawalnya dimasukkan axios di dalamnya

        setLoading(true)

        try {
            const res = await requestAPI.login(bodyPayLoad)
            console.log(res.data.data.token)
            localStorage.setItem("accessToken", res.data.data.token)
            
            setLogin(res.data.message);
            setLoading(false)
            
            setTimeout(() => {
                navigate('/')
            }, 1000);
        } catch (error) {
            console.log(error)
            setLoading(false)
            setLogin(error.response.data.message)
        }
    }

    return ( 
        <div>
            <Navbar/>
            <div className="loginpages">
                {login.length ? (<h1>{login}</h1>) : null}
                <div>
                    <label>Username: </label>
                    <input onChange={handleUsername} type="text" />
                </div>
                <div>
                    <label>Password: </label>
                    <input onChange={handlePassword} type="text" name="" id="" />
                </div>
                <Link className='btn-login' onClick={handleSubmit} disabled={loading}>{loading ? 'Loading...' : 'Login'}</Link>
            </div>
        </div>
    );
}

export default FormLogin;