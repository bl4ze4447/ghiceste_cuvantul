'use client';

import './style.css';
import BackButton from '@/components/BackButton/component';
import Notification from '@/components/Notification/component';
import { TextField } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { passwordChange, requestPasswordChange } from '@/utils/backendUtils';

function ResetPassword() {
    const [isRequesting, setIsRequesting] = useState(true);
    const searchParams = useSearchParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [requestSent, setRequestSent] = useState(false);
    const [code, setCode] = useState<string | null>(null);

    useEffect(() => {
        const paramCode = searchParams.get('code');
        setCode(paramCode);
        if (paramCode === null || paramCode.trim().length === 0) {
            setIsRequesting(true);
        } else {
            setIsRequesting(false);
        }
    }, [searchParams]);

    const requestChecked = async () => {
        if (requestSent) return;

        const phoneNumber = (
            document.querySelector('input[name="phone_number"]') as HTMLInputElement
        )?.value;

        if (phoneNumber && phoneNumber.trim() !== '') {
            setTitle('Avertisment');
            setDescription('Spam detectat!');
            setShowNotification(true);
            setRequestSent(false);
            return;
        }

        const result = await requestPasswordChange(email, phoneNumber);
        if (result.ok === true) setTitle('Succes');
        else if (result.ok === false) setTitle('Avertisment');
        else setTitle('Problemă internă');

        setDescription(result.message);
        if (result.ok) setRequestSent(true);
        setShowNotification(true);
    };

    const resetChecked = async () => {
        if (code === null || requestSent) return;

        const phoneNumber = (
            document.querySelector('input[name="phone_number"]') as HTMLInputElement
        )?.value;

        if (phoneNumber && phoneNumber.trim() !== '') {
            setTitle('Avertisment');
            setDescription('Spam detectat!');
            setShowNotification(true);
            setRequestSent(false);
            return;
        }

        if (password !== password2) {
            setShowNotification(true);
            setDescription('Parola introdusă trebuie să coincidă cu confirmă parola!');
            setTitle('Avertisment');
            return;
        }

        const result = await passwordChange(code, password, phoneNumber);
        if (result.ok === true) setTitle('Succes');
        else if (result.ok === false) setTitle('Avertisment');
        else setTitle('Problemă internă');

        setDescription(result.message);
        if (result.ok) setRequestSent(true);
        setShowNotification(true);
    };

    return (
        <main className="main-container-reset">
            <input
                type="text"
                name="phone_number"
                style={{ display: 'none' }}
                autoComplete="off"
                tabIndex={-1}
            />
            <BackButton />
            <h2 style={{ marginBottom: '20px' }}>SCHIMBARE PAROLĂ</h2>
            {isRequesting === true ? (
                <>
                    <p className="register-info-normal">
                        Introdu adresa de email cu care ai creat contul:
                    </p>
                    <div className="text-field-confirm-email-container">
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
                    <button type="button" className="connect-button" onClick={requestChecked}>
                        {!requestSent ? 'Trimite' : 'Cerere trimisă'}
                    </button>
                    <Notification
                        title={title}
                        onClose={() => {
                            setShowNotification(false);
                        }}
                        description={description}
                        visible={showNotification}
                    />
                </>
            ) : (
                <>
                    <p className="register-info-normal">Introdu o nouă parolă sigură:</p>
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
                    <button type="button" className="connect-button" onClick={resetChecked}>
                        {!requestSent ? 'Schimbă parola' : 'Parolă schimbată'}
                    </button>
                    <Notification
                        title={title}
                        onClose={() => {
                            setShowNotification(false);
                        }}
                        description={description}
                        visible={showNotification}
                    />
                </>
            )}
        </main>
    );
}

export default ResetPassword;
