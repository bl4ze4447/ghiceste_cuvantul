'use client';

import '@/components/account/AccountRelated.css';

import { TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Loading from '@/components/Loading';
import { useRouter } from 'next/navigation';
import { isLogged, login } from '@/utils/backendUtils';
import Notification from '@/components/Notification';
import BackButton from '@/components/BackButton';

const Login = () => {
    const router = useRouter();
    const timeouts = useRef<NodeJS.Timeout[]>([]);

    useEffect(() => {
        return () => {
            timeouts.current.forEach(clearTimeout);
            timeouts.current = [];
        };
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        isLogged().then((result) => {
            if (result.ok === null || result.ok === true) {
                if (result.ok === null) {
                    setDescription(result.message);
                    setTitle('Problemă internă');
                } else {
                    setDescription(
                        'Deja ești autentificat, vei fi redirecționat către contul tău în 5 secunde!'
                    );
                    setTitle('Informație');
                }
            }

            setShowNotification(false);
            setIsLoading(false);
        });
    }, []);

    const loginChecked = async () => {
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

        const result = await login(email, password, phoneNumber);
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
        setDescription('Vei fi redirecționat către pagina contului tău!');
        setTitle('Succes!');
        timeouts.current.push(
            setTimeout(() => {
                router.push('/cont');
            }, 1000)
        );
    };

    return (
        <>
            {isLoading !== true ? (
                <section className="account-wrapper">
                    <BackButton />
                    <div className="create-account">
                        <h2 style={{ marginBottom: '20px' }}>Intră în cont</h2>
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
                        <input
                            type="text"
                            name="phone_number"
                            style={{ display: 'none' }}
                            autoComplete="off"
                            tabIndex={-1}
                        />
                        <button
                            className="connect-button"
                            onClick={loginChecked}
                            style={{ marginTop: '5px' }}
                        >
                            Conectează-te
                        </button>
                        <Link
                            className="p-account"
                            href="/resetare-parola"
                            style={{ marginTop: '5px', color: '#93c5fd' }}
                        >
                            Ai uitat parola?
                        </Link>
                        <p className="p-account" style={{ textDecoration: 'none' }}>
                            Nu ai un cont?{' '}
                            <Link href="/cont/register" style={{ color: '#93c5fd' }}>
                                Creează-ți unul aici
                            </Link>
                        </p>
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
