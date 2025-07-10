'use client';

import '@/components/account/AccountRelated.css';

import { SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AccountLoad, ModalAnswer } from '@/constants/constants';
import Card from '@/components/Card';
import Loading from '@/components/Loading';
import Notification from '@/components/Notification';
import { deleteAccount, isLogged, logout, getStatistics } from '@/utils/backendUtils';
import { StatisticsDto } from '@/dto/statistics';
import BackButton from '@/components/BackButton';
import ConfirmModal from '@/components/ConfirmModal';

const Account = () => {
    const router = useRouter();
    const timeouts: NodeJS.Timeout[] = [];
    useEffect(() => {
        return () => {
            timeouts.forEach(clearTimeout);
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
                    timeouts.push(
                        setTimeout(() => {
                            router.push('/cont/login');
                        }, 1000)
                    );
                }

                return;
            }

            setShowNotification(false);
            setLoggedIn(AccountLoad.LOGGED);
            setError('');
            setBottomMessage('');
        });
    }, []);

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(AccountLoad.LOADING);
    const [accountDeletionModal, setAccountDeletionModal] = useState<ModalAnswer | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (accountDeletionModal === null) return;

        if (accountDeletionModal === ModalAnswer.YES) {
            deleteChecked();
            setAccountDeletionModal(null);
        }
    }, [accountDeletionModal, modalVisible]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [bottomMessage, setBottomMessage] = useState('');

    const [statistics, setStatistics] = useState<StatisticsDto | null>(null);
    const [showAccountData, setShowAccountData] = useState(false);

    const getStatisticsChecked = async () => {
        const result = await getStatistics();
        setShowAccountData(true);
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
        timeouts.push(
            setTimeout(() => {
                router.push('/');
            }, 1500)
        );
    };

    const deleteChecked = async () => {
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
        timeouts.push(
            setTimeout(() => {
                router.push('/');
            }, 1500)
        );
    };

    return (
        <section className="account-wrapper">
            <BackButton />
            <input
                type="text"
                name="phone_number"
                style={{ display: 'none' }}
                autoComplete="off"
                tabIndex={-1}
            />
            {loggedIn === AccountLoad.LOGGED && showAccountData ? (
                <div className="create-account">
                    <h2 style={{ marginBottom: '20px' }}>CONTUL TĂU</h2>
                    <div
                        className="ml-20 mr-20"
                        style={{
                            minWidth: '300px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Card>
                            <h4 style={{ marginBottom: '15px', marginTop: '-6px' }}>
                                Informații utilizator
                            </h4>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p
                                        className="p-account"
                                        style={{
                                            margin: 0,
                                            textAlign: 'left',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Poreclă:
                                    </p>
                                    <p
                                        className="exo"
                                        style={{
                                            margin: 0,
                                            fontWeight: 'bold',
                                            textAlign: 'right',
                                        }}
                                    >
                                        {statistics !== null ? statistics.username : 'Indisponibil'}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p
                                        className="p-account"
                                        style={{
                                            margin: 0,
                                            textAlign: 'left',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Email:
                                    </p>
                                    <p
                                        className="exo"
                                        style={{
                                            margin: 0,
                                            fontWeight: 'bold',
                                            textAlign: 'right',
                                        }}
                                    >
                                        {statistics !== null
                                            ? statistics.emailAddress
                                            : 'Indisponibil'}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p
                                        className="p-account"
                                        style={{
                                            margin: 0,
                                            textAlign: 'left',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Verificat:
                                    </p>
                                    <p
                                        className="exo"
                                        style={{
                                            margin: 0,
                                            fontWeight: 'bold',
                                            textAlign: 'right',
                                            color:
                                                statistics && statistics.verified
                                                    ? '#2ea200'
                                                    : '#FF4C4C',
                                        }}
                                    >
                                        {statistics !== null
                                            ? statistics.verified
                                                ? 'DA'
                                                : 'NU'
                                            : 'Indisponibil'}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p
                                        className="p-account"
                                        style={{
                                            margin: 0,
                                            textAlign: 'left',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Restricționat:
                                    </p>
                                    <p
                                        className="exo"
                                        style={{
                                            margin: 0,
                                            fontWeight: 'bold',
                                            textAlign: 'right',
                                            color:
                                                statistics && statistics.banned
                                                    ? '#E94B3C'
                                                    : '#2ea200',
                                        }}
                                    >
                                        {statistics !== null
                                            ? statistics.banned
                                                ? 'DA'
                                                : 'NU'
                                            : 'Indisponibil'}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p
                                        className="p-account"
                                        style={{
                                            margin: 0,
                                            textAlign: 'left',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Jocuri jucate:
                                    </p>
                                    <p
                                        className="exo"
                                        style={{
                                            margin: 0,
                                            fontWeight: 'bold',
                                            textAlign: 'right',
                                        }}
                                    >
                                        {statistics !== null
                                            ? statistics.totalGames
                                            : 'Indisponibil'}
                                    </p>
                                </div>
                            </div>
                        </Card>
                        <Card>
                            <h4 style={{ marginBottom: '15px', marginTop: '-6px' }}>
                                Statistici niveluri
                            </h4>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p
                                        className="p-account"
                                        style={{
                                            margin: 0,
                                            textAlign: 'left',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Jocuri jucate:
                                    </p>
                                    <p
                                        className="exo"
                                        style={{
                                            margin: 0,
                                            fontWeight: 'bold',
                                            textAlign: 'right',
                                        }}
                                    >
                                        {statistics !== null
                                            ? statistics.levelLoses + statistics.levelWins
                                            : 'Indisponibil'}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p
                                        className="p-account"
                                        style={{
                                            margin: 0,
                                            textAlign: 'left',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Niveluri câștigate:
                                    </p>
                                    <p
                                        className="exo"
                                        style={{
                                            margin: 0,
                                            fontWeight: 'bold',
                                            textAlign: 'right',
                                        }}
                                    >
                                        {statistics !== null
                                            ? statistics.levelWins
                                            : 'Indisponibil'}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p
                                        className="p-account"
                                        style={{
                                            margin: 0,
                                            textAlign: 'left',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Niveluri pierdute:
                                    </p>
                                    <p
                                        className="exo"
                                        style={{
                                            margin: 0,
                                            fontWeight: 'bold',
                                            textAlign: 'right',
                                        }}
                                    >
                                        {statistics !== null
                                            ? statistics.levelLoses
                                            : 'Indisponibil'}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p
                                        className="p-account"
                                        style={{
                                            margin: 0,
                                            textAlign: 'left',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Victorii consecutive:
                                    </p>
                                    <p
                                        className="exo"
                                        style={{
                                            margin: 0,
                                            fontWeight: 'bold',
                                            textAlign: 'right',
                                        }}
                                    >
                                        {statistics !== null
                                            ? statistics.levelStreak
                                            : 'Indisponibil'}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p
                                        className="p-account"
                                        style={{
                                            margin: 0,
                                            textAlign: 'left',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Record victorii consecutive:
                                    </p>
                                    <p
                                        className="exo"
                                        style={{
                                            margin: 0,
                                            fontWeight: 'bold',
                                            textAlign: 'right',
                                        }}
                                    >
                                        {statistics !== null
                                            ? statistics.levelMaxStreak
                                            : 'Indisponibil'}
                                    </p>
                                </div>
                            </div>
                        </Card>
                        <Card>
                            <h4 style={{ marginBottom: '15px', marginTop: '-6px' }}>
                                Statistici cuvântul zilei
                            </h4>{' '}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p
                                        className="p-account"
                                        style={{
                                            margin: 0,
                                            textAlign: 'left',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Jocuri jucate:
                                    </p>
                                    <p
                                        className="exo"
                                        style={{
                                            margin: 0,
                                            fontWeight: 'bold',
                                            textAlign: 'right',
                                        }}
                                    >
                                        {statistics !== null
                                            ? statistics.dailyLoses + statistics.dailyWins
                                            : 'Indisponibil'}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p
                                        className="p-account"
                                        style={{
                                            margin: 0,
                                            textAlign: 'left',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Zile câștigate:
                                    </p>
                                    <p
                                        className="exo"
                                        style={{
                                            margin: 0,
                                            fontWeight: 'bold',
                                            textAlign: 'right',
                                        }}
                                    >
                                        {statistics !== null
                                            ? statistics.dailyWins
                                            : 'Indisponibil'}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p
                                        className="p-account"
                                        style={{
                                            margin: 0,
                                            textAlign: 'left',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Zile pierdute:
                                    </p>
                                    <p
                                        className="exo"
                                        style={{
                                            margin: 0,
                                            fontWeight: 'bold',
                                            textAlign: 'right',
                                        }}
                                    >
                                        {statistics !== null
                                            ? statistics.dailyLoses
                                            : 'Indisponibil'}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p
                                        className="p-account"
                                        style={{
                                            margin: 0,
                                            textAlign: 'left',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Victorii consecutive:
                                    </p>
                                    <p
                                        className="exo"
                                        style={{
                                            margin: 0,
                                            fontWeight: 'bold',
                                            textAlign: 'right',
                                        }}
                                    >
                                        {statistics !== null
                                            ? statistics.dailyStreak
                                            : 'Indisponibil'}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p
                                        className="p-account"
                                        style={{
                                            margin: 0,
                                            textAlign: 'left',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Record victorii consecutive:
                                    </p>
                                    <p
                                        className="exo"
                                        style={{
                                            margin: 0,
                                            fontWeight: 'bold',
                                            textAlign: 'right',
                                        }}
                                    >
                                        {statistics !== null
                                            ? statistics.dailyMaxStreak
                                            : 'Indisponibil'}
                                    </p>
                                </div>
                            </div>
                        </Card>
                        <input
                            style={{ marginTop: '10px', width: '250px' }}
                            type="button"
                            value="Ieși din cont"
                            className="connect-button-small"
                            onClick={async () => {
                                await logoutChecked();
                            }}
                        />
                        <p
                            className="exo"
                            style={{ fontWeight: 'bolder', fontSize: '1.2rem', marginTop: '10px' }}
                        >
                            Zonă periculoasă!
                        </p>
                        <button
                            style={{ marginTop: '5px', marginBottom: '45px', width: '250px' }}
                            type="button"
                            className="connect-button-small button-important"
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
                    <Notification
                        title={title}
                        onClose={() => {
                            setShowNotification(false);
                        }}
                        description={description}
                        visible={showNotification}
                    />
                </div>
            ) : loggedIn === AccountLoad.NOT_LOGGED ? (
                <Loading topMessage={error} bottomMessage={bottomMessage} />
            ) : (
                <>
                    <Loading topMessage="Pregătim pagina" bottomMessage="pentru tine" />
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
        </section>
    );
};

export default Account;
