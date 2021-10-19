import React, {SyntheticEvent, useState} from 'react'
import axios from 'axios';
import router, { useRouter } from 'next/router'

function login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        try {
            await axios.post('http://localhost:8000/dashboard/login', {
                email,
                password
            }, { withCredentials: true })
         } catch (ex) {
             if(ex.response && ex.response.status === 422){

                 console.log(ex.response.data.errors);
             }

             if(ex.response && ex.response.status === 401){

                console.log(ex.response.data);
            }
            
         }


        
        setRedirect(true)
    }

    if(redirect) {
       router.push('/dashboard')
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit= {submit}>
                <input type="text" placeholder="email" name="email" onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="password" name="password" onChange={e => setPassword(e.target.value)} />
                <input type="submit" value="login" />

            </form>
        </div>
    )
}

export default login
