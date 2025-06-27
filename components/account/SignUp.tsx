import './AccountRelated.css';

import { FcGoogle } from 'react-icons/fc';
import { TextField } from '@mui/material';

import { useState } from 'react';
import Recaptcha from '../Recaptcha';

const SignUp = () => {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <section className="account-wrapper">
                <div className="create-account">
                    <h2 style={{ marginBottom: '30px' }}>Creează un cont</h2>
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
                            label="Nume de utilizator"
                            type="text"
                            variant="outlined"
                            value={nickname}
                            onChange={(ev) => setNickname(ev.target.value)}
                            fullWidth
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
                        value="Creează contul"
                        className="inputs"
                        onClick={() => {}}
                    />
                </div>
            </section>
            <Recaptcha />
        </>
    );
};

export default SignUp;
