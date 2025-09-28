'use client';

import './style.css';

import { TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Notification from '@/components/Notification/component';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading/component';
import { register, isLogged } from '@/utils/backendUtils';
import TermsCheckbox from '@/components/TermsCheckbox/component';
import BackButton from '@/components/BackButton/component';

const Login = () => {
    const router = useRouter();
    const timeouts = useRef<NodeJS.Timeout[]>([]);

    useEffect(() => {
        return () => {
            timeouts.current.forEach(clearTimeout);
            timeouts.current = [];
        };
    }, []);

    useEffect(() => {
        return () => {
            timeouts.current.forEach(clearTimeout);
        };
    }, []);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [accepted, setAccepted] = useState(false);

    useEffect(() => {
        isLogged().then((result) => {
            if (result.ok === null || result.ok === true) {
                if (result.ok === null) {
                    setDescription(result.message);
                    setTitle('Problemă internă');
                } else {
                    setDescription(
                        'Deja ești autentificat, vei fi redirecționat către contul tău!'
                    );
                    setTitle('Informație');
                    setShowNotification(true);
                    timeouts.current.push(
                        setTimeout(() => {
                            router.push('/cont');
                        }, 1000)
                    );
                    return;
                }

                setShowNotification(true);
                setIsLoading(false);
                return;
            }

            setShowNotification(false);
            setIsLoading(false);
        });
    }, [router]);

    const registerChecked = async () => {
        const phoneNumber = (
            document.querySelector('input[name="phone_number"]') as HTMLInputElement
        )?.value;

        if (phoneNumber && phoneNumber.trim() !== '') {
            setTitle('Avertisment');
            setDescription('Spam detectat!');
            setShowNotification(true);
            setIsLoading(false);
            return;
        }

        if (!accepted) {
            setShowNotification(true);
            setDescription(
                'Contul poate fi creat doar dacă sunteți de acord cu termenii și condițiile!'
            );
            setTitle('Avertisment');
            return;
        }
        if (password !== password2) {
            setShowNotification(true);
            setDescription('Parola introdusă trebuie să coincidă cu confirmă parola!');
            setTitle('Avertisment');
            return;
        }
        const result = await register(username, email, password, phoneNumber);
        if (result.ok === null || result.ok === false) {
            if (result.ok === null) {
                setDescription(result.message);
                setTitle('Problemă internă');
            } else {
                setDescription(result.message);
                setTitle('Avertisment');
            }

            setShowNotification(true);
            setIsLoading(false);
            return;
        }

        setShowNotification(true);
        setDescription(
            'A fost trimis un mail către adresa dvs. cu instrucțiuni pentru a vă verifica contul! Veți fi redirecționat să vă logați!'
        );
        setTitle('Succes!');
        setIsLoading(false);
        timeouts.current.push(
            setTimeout(() => {
                router.push('/cont/login');
            }, 5200)
        );
    };

    return (
        <>
            {isLoading === false ? (
                <section className="account-wrapper">
                    <BackButton />
                    <div className="create-account">
                        <h1 className="register-title">Creează un cont</h1>
                        <div className="text-field-username-container">
                            <p className="register-info">
                                Numele de utilizator poate conține doar litere, cifre și underline{' '}
                                {'( _ )'}
                            </p>
                            <TextField
                                className="text-field"
                                label="Nume de utilizator"
                                type="text"
                                variant="outlined"
                                value={username}
                                onChange={(ev) => setUsername(ev.target.value)}
                                sx={{
                                    width: '30ch',
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

                        <div className="text-field-email-container">
                            <TextField
                                className="text-field"
                                label="Email"
                                type="email"
                                variant="outlined"
                                value={email}
                                onChange={(ev) => setEmail(ev.target.value)}
                                sx={{
                                    width: '30ch',
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

                        <div className="text-field-password-container">
                            <p className="register-info">
                                Parola trebuie să conțină cel puțin o literă mică, o literă mare, o
                                cifră, și un minim de 8 caractere
                            </p>
                            <TextField
                                className="text-field"
                                label="Parolă"
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={(ev) => setPassword(ev.target.value)}
                                sx={{
                                    width: '30ch',
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

                        <div className="text-field-confirm-password-container">
                            <TextField
                                className="text-field"
                                label="Confirm parolă"
                                type="password"
                                variant="outlined"
                                value={password2}
                                onChange={(ev) => setPassword2(ev.target.value)}
                                sx={{
                                    width: '30ch',
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

                        <input
                            type="text"
                            name="phone_number"
                            style={{ display: 'none' }}
                            autoComplete="off"
                            tabIndex={-1}
                        />

                        <TermsCheckbox checked={accepted} onChange={setAccepted} />

                        <button type="button" className="connect-button" onClick={registerChecked}>
                            Creează contul
                        </button>
                    </div>
                    <Notification
                        title={title}
                        description={description}
                        onClose={() => {
                            setShowNotification(false);
                        }}
                        visible={showNotification}
                    />
                </section>
            ) : (
                <>
                    <BackButton />
                    <Loading topMessage="Pregătim pagina" bottomMessage="pentru tine" />
                </>
            )}
        </>
    );
};

export default Login;
