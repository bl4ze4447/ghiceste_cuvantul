import './AccountRelated.css';

import { FcGoogle } from 'react-icons/fc';
import { TextField } from '@mui/material';
import { useState } from 'react';
import Recaptcha from '../Recaptcha';
import Link from 'next/link';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [error,    setError]      = useState({message: '', hide: true});

    return (
        <>
            <section className="account-wrapper">
                <div className="create-account">
                    <h2 style={{ marginBottom: '30px' }}>Intră în cont</h2>
                    <button className="google-login" onClick={() => {}}>
                        <FcGoogle className="google-logo" />
                        <span>Continuă cu Google</span>
                    </button>

                    <p
                        className="p-account"
                        style={{ margin: '10px 0 20px 0', fontWeight: '700', fontSize: '1.4rem' }}
                    >
                        sau
                    </p>

                    <div className="ml-20 mr-20">
                        <TextField
                            className="google-inputs"
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={email}
                            onChange={(ev) => setEmail(ev.target.value)}
                            fullWidth
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
                            fullWidth
                        />
                    </div>
                    <input
                        type="button"
                        value="Conectează-te"
                        className="inputs"
                        onClick={() => {}}
                    />

                    <Link className="forgot-pass" href="/creeaza-cont">
                        Ai uitat parola?
                    </Link>
                    <p className="p-account">
                        Nu ai un cont? <Link href="/creeaza-cont">Creează-ți unul aici</Link>
                    </p>
                </div>
            </section>
            <Recaptcha />
        </>
    );
};

export default Login;
