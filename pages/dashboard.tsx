import React, {useState, useEffect} from 'react'
import axios from 'axios';
import router, { useRouter } from 'next/router'
import Link from "next/link"
import { User } from '../models/user';

function dashboard() {
    const [redirect, setRedirect] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    useEffect(() => {
        (
         async () =>{
             try {
                const {data} = await axios.get('http://localhost:8000/dashboard/me', {withCredentials: true});
                setUser(data)
             } catch (e) {
                setRedirect(true)
             }
             
         }   
        )()
    }, [])
    if(redirect) {
        router.push('/login')
    }

   const logout = async () => {
    await axios.post('http://localhost:8000/dashboard/logout', {}, {withCredentials: true})
   }
    return (
        <div>
            <h1>Hello you are in dashboard: {user?.first_name} {user?.last_name}</h1>
            <Link href="/login"><a onClick={logout}>ejfehjfkhefkjh</a></Link>
        </div>
    )
}

export default dashboard
