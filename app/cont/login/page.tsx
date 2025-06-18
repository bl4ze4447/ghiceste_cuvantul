'use client'

import '@/components/account/AccountRelated.css';

import { TextField }    from '@mui/material';
import { useEffect, useState }     from "react";
import Link             from "next/link";
import Info from '@/components/Info';
import { authorizedFetch } from '@/utils/authorizedFetch';
import Loading from '@/components/Loading';
import { useRouter } from "next/navigation";

const Login = () => {
    const router = useRouter();

    useEffect(() => {
        router.replace('/');
        return;
        async function isLoggedIn() {
            const response = await authorizedFetch("http://localhost:5224/api/auth/is-logged-in", {
                method: "GET",
                headers: {
                "Content-Type": "application/json"
                },
                credentials: 'include'
            });

            if (response.ok) {
                router.replace('/cont');
            }

            setIsLoading(false);
        }
    
        isLoggedIn();
    }, []);

    async function login() {
        if (email.trim() == '') {
            setError("Adresa de mail este obligatorie");
            return;
        }
        if (password.trim() == '') {
            setError("Parola este obligatorie");
            return;
        }       

        const response = await fetch("http://localhost:5224/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include", 
            body: JSON.stringify({ username: '-', emailAddress: email, password: password })
        });

        const data = await response.json();

        if (!response.ok) {
            if (response.headers.get("Content-Length") !== '0') {
                let errorMessage: string = "Bad Request";
                if (data.message) errorMessage = data.message;
                else if (data.errors) {
                    if (data.errors.EmailAddress) errorMessage = "Adresa de mail este invalidă";
                    else if (data.errors.Password) errorMessage = "Parola trebuie să aibă minim 8 caractere";
                }

                setError(errorMessage);
            }
            return;
        }

        setError('Credențiale corecte, vei fi redirecționat...');
        localStorage.setItem('accessToken', data.accessToken);

        setTimeout(() => {
            router.replace('/cont');
        }, 500);
    }

    const [email,    setEmail]      = useState('');
    const [password, setPassword]   = useState('');
    const [error,    setError]      = useState('Eu îți spun dacă este vreo problemă!');
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
        {isLoading === false ? (
            <section className="account-wrapper">
                <div className="create-account">
                    <h2 style={{marginBottom: '20px', marginTop: '30px'}}>Intră în cont</h2>

                    <div className="ml-20 mr-20">
                        <TextField
                            className="google-inputs"
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={email}
                            onChange={(ev) => setEmail(ev.target.value)}
                            sx={{
                                width: '25ch',
                                input: { color: 'white' },
                                label: {
                                    color: 'rgba(255,255,255,0.7)',
                                    '&.Mui-focused': {
                                        color: 'white',
                                    },
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'rgba(255,255,255,0.7)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'white',
                                    },
                                },
                            }}
                        />
                    </div>

                    <div className="ml-20 mr-20 mt-8 mb-16">
                        <TextField
                            className="google-inputs"
                            label="Parolă"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(ev) => setPassword(ev.target.value)}
                            sx={{
                                width: '25ch',
                                input: { color: 'white' },
                                label: {
                                    color: 'rgba(255,255,255,0.7)',
                                    '&.Mui-focused': {
                                        color: 'white',
                                    },
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'rgba(255,255,255,0.7)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'white',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'white',
                                    },
                                },
                            }}
                        />
                    </div>
                    <input type="button" value="Conectează-te" className="connect-button" onClick={login}/>
                    <div className='mt-8'>
                        <Info message={error} hide={false} hideText={false} important=''/>
                    </div>
                    <Link className="p-account" href="#" style={{marginTop: '15px'}}>Ai uitat parola?</Link>
                    <p className="p-account" style={{textDecoration: 'none'}}>Nu ai un cont? <Link href="/cont/register">Creează-ți unul aici</Link></p>
                </div>
            </section>
        ) : (
            <Loading topMessage='Pregătim pagina' bottomMessage='pentru tine' />
        )}
    </>
    )
}

export default Login;