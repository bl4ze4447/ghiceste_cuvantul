'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AccountLoad, ModalAnswer } from '@/constants/constants';
import Loading from '@/components/Loading/component';
import Notification from '@/components/Notification/component';
import { deleteAccount, isLogged, logout, getStatistics } from '@/utils/backendUtils';
import { StatisticsDto } from '@/dto/statistics';
import BackButton from '@/components/BackButton/component';
import ConfirmModal from '@/components/ConfirmModal/component';
import Statistics from '@/components/Statistics/component';

const Account = () => {
    const router = useRouter();
    const timeouts = useRef<NodeJS.Timeout[]>([]);

    useEffect(() => {
        return () => {
            timeouts.current.forEach(clearTimeout);
            timeouts.current = [];
        };
    }, []);

    useEffect(() => {
        isLogged().then((result) => {
            if (result.ok === null || result.ok === false) {
                if (result.ok === null) {
                    setDescription(result.message);
                    setShowNotification(true);
                    setTitle('Problemă internă');
                } else {
                    setError(result.message);
                    setLoggedIn(AccountLoad.NOT_LOGGED);
                    setBottomMessage('Vei fi redirecționat să te autentifici');
                    timeouts.current.push(
                        setTimeout(() => {
                            router.push('/cont/login');
                        }, 1000)
                    );
                }

                return;
            }

            setShowNotification(false);
            setLoggedIn(AccountLoad.LOGGED);
        });
    }, [router]);

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(AccountLoad.LOADING);
    const [accountDeletionModal, setAccountDeletionModal] = useState<ModalAnswer | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [bottomMessage, setBottomMessage] = useState('');

    const [statistics, setStatistics] = useState<StatisticsDto | null>(null);

    const getStatisticsChecked = async () => {
        const result = await getStatistics();
        if (result.ok === null || result.ok === false) {
            if (result.ok === null) {
                setDescription(result.message);
                setTitle('Problemă internă');
            } else {
                setDescription(result.message);
                setTitle('Avertisment');
            }

            setShowNotification(true);
            return;
        }

        setStatistics(result.statistics);
    };

    useEffect(() => {
        if (loggedIn !== AccountLoad.LOGGED) return;

        getStatisticsChecked();
    }, [loggedIn]);

    const logoutChecked = async () => {
        if (loggedIn !== AccountLoad.LOGGED) return;

        const result = await logout();
        if (result.ok === null || result.ok === false) {
            if (result.ok === null) {
                setDescription(result.message);
                setTitle('Problemă internă');
            } else {
                setDescription(result.message);
                setTitle('Avertisment');
            }

            setShowNotification(true);
            return;
        }

        setShowNotification(false);
        setBottomMessage('Vei fi redirecționat către meniul principal!');
        setError('Ai fost deconectat!');
        setLoggedIn(AccountLoad.NOT_LOGGED);
        timeouts.current.push(
            setTimeout(() => {
                router.push('/');
            }, 1500)
        );
    };

    const deleteChecked = useCallback(async () => {
        if (loggedIn !== AccountLoad.LOGGED) return;

        const phoneNumber = (
            document.querySelector('input[name="phone_number"]') as HTMLInputElement
        )?.value;

        if (phoneNumber && phoneNumber.trim() !== '') {
            setTitle('Avertisment');
            setDescription('Spam detectat!');
            setShowNotification(true);
            return;
        }

        const result = await deleteAccount(email, password, phoneNumber);
        if (result.ok === null || result.ok === false) {
            if (result.ok === null) {
                setDescription(result.message);
                setTitle('Problemă internă');
            } else {
                setDescription(result.message);
                setTitle('Avertisment');
            }

            setShowNotification(true);
            return;
        }

        setShowNotification(false);
        setBottomMessage('Vei fi redirecționat către meniul principal!');
        setError('Contul a fost șters!');
        setLoggedIn(AccountLoad.NOT_LOGGED);
        timeouts.current.push(
            setTimeout(() => {
                router.push('/');
            }, 1500)
        );
    }, [email, loggedIn, password, router]);

    useEffect(() => {
        if (accountDeletionModal === null) return;

        if (accountDeletionModal === ModalAnswer.YES) {
            deleteChecked();
            setAccountDeletionModal(null);
        }
    }, [accountDeletionModal, modalVisible, deleteChecked]);

    return (
        <main className="account-wrapper">
            <BackButton />
            <input
                type="text"
                name="phone_number"
                style={{ display: 'none' }}
                autoComplete="off"
                tabIndex={-1}
            />
            {loggedIn === AccountLoad.LOGGED && statistics ? (
                <div>
                    <Statistics statistics={statistics} />

                    <div className="statistics-container">
                        <button
                            className="logout-button"
                            onClick={async () => {
                                await logoutChecked();
                            }}
                        >
                            Ieși din cont
                        </button>
                        <p className="danger-p">Zonă periculoasă!</p>
                        <button
                            type="button"
                            className="delete-button button-important"
                            onClick={() => {
                                setModalVisible(true);
                            }}
                        >
                            Șterge contul
                        </button>
                    </div>

                    <ConfirmModal
                        visible={modalVisible}
                        setVisible={setModalVisible}
                        action={'Șterge contul'}
                        setModalResult={setAccountDeletionModal}
                        invertColors={true}
                        positiveMessage="Șterge contul"
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                    />
                </div>
            ) : loggedIn === AccountLoad.NOT_LOGGED ? (
                <Loading topMessage={error} bottomMessage={bottomMessage} />
            ) : (
                <Loading topMessage="Pregătim pagina" bottomMessage="pentru tine" />
            )}

            <Notification
                title={title}
                onClose={() => {
                    setShowNotification(false);
                }}
                description={description}
                visible={showNotification}
            />
        </main>
    );
};

export default Account;
