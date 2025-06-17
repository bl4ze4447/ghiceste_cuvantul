'use client'

import '@/components/account/AccountRelated.css';

import { TextField }    from '@mui/material';
import { useEffect, useState }     from "react";
import Info from '@/components/Info';
import { redirect } from 'next/navigation';
import { authorizedFetch } from '@/utils/authorizedFetch';
import Loading from '@/components/Loading';

const Login = () => {
    useEffect(() => {
        redirect('/'); // remove me
        async function isLoggedIn() {
            const response = await authorizedFetch("http://localhost:5224/api/auth/is-logged-in", {
                method: "GET",
                headers: {
                "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                redirect('/cont');
            }
        }

        isLoggedIn();
    }, []);
    
    async function register() {
        if (username.trim() == '') {
            setError("Numele de utilizator este obligatoriu");
            return;
        }
        if (email.trim() == '') {
            setError("Adresa de mail este obligatorie");
            return;
        }
        if (password.trim() == '') {
            setError("Parola este obligatorie");
            return;
        }       
        const response = await fetch("http://localhost:5224/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: username, emailAddress: email, password: password })
        });

        const data = await response.json();

        if (!response.ok) {
            let errorMessage: string = "Bad Request";
            if (data.message) errorMessage = data.message;
            else if (data.errors) {
                if (data.errors.Username) errorMessage = "Numele de utilizator poate avea maxim 16 caractere";
                else if (data.errors.EmailAddress) errorMessage = "Adresa de mail este invalidă";
                else if (data.errors.Password) errorMessage = "Parola trebuie să aibă minim 8 caractere";
            }

            setError(errorMessage);
            return;
        }

        setError('Succes! Ți-am trimis un mail cu instrucțiuni pentru a-ți verifica contul...');
        setTimeout(() => {
            redirect('/cont/login');
        }, 3500);
    }

    const [username, setUsername]   = useState('');
    const [email,    setEmail]      = useState('');
    const [password, setPassword]   = useState('');
    const [error,    setError]      = useState('Eu îți spun dacă este vreo problemă!');
    const [loading, setLoading] = useState(true);

    return (
        <>
        {loading === false ? (
            <section className="account-wrapper">
                <div className="create-account">
                    <h2 style={{marginBottom: '20px', marginTop: '30px'}}>Creează un cont</h2>
                    <div className="ml-20 mr-20">
                        <TextField
                            className="google-inputs"
                            label="Nume de utilizator"
                            type="text"
                            variant="outlined"
                            value={username}
                            onChange={(ev) => setUsername(ev.target.value)}
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

                    <div className="ml-20 mr-20 mt-8">
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
                    <input type="button" value="Creează contul" className="connect-button" onClick={register}/>
                    <div className='mt-8 mb-16'>
                        <Info message={error} hide={false} hideText={false} important=''/>
                    </div>
                </div>
            </section>
        ) : (
            <Loading topMessage='Pregătim pagina' bottomMessage='pentru tine' />   
        )}
        </>
    )
}

export default Login;