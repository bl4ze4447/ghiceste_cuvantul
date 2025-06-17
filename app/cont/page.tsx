'use client'

import '@/components/account/AccountRelated.css';

import { useEffect, useState }     from "react";
import { redirect } from 'next/navigation';
import { AccountLoad } from '@/constants/constants';
import { authorizedFetch } from '@/utils/authorizedFetch';
import Card from '@/components/Card';
import Loading from '@/components/Loading';

const Account = () => {
    useEffect(() => {
        redirect('/'); // remove me
        async function isLoggedIn() {
            const response = await authorizedFetch("http://localhost:5224/api/auth/is-logged-in", {
                method: "GET",
                headers: {
                "Content-Type": "application/json"
                },
                credentials: 'include'
            });
            if (!response.ok) {
                if (response.headers.get("Content-Length") === "0") {
                    setError("Beep boop, există o problemă");
                } else {
                    setError("Sesiunea a expirat");
                }
                
                setTimeout(() => {
                    redirect('/cont/login');
                }, 2000);
                setLoggedIn(AccountLoad.NOT_LOGGED);
                return;
            }

            setError('');
            setLoggedIn(AccountLoad.LOGGED);
        }

        isLoggedIn();
    }, []);

    async function logout() {
        try {
            const response = await authorizedFetch("http://localhost:5224/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });

            if (!response.ok) throw new Error("This should not have an error but it did");
            setError("Ai ieșit din cont");
            setLoggedIn(AccountLoad.NOT_LOGGED);
            localStorage.setItem('accessToken', '');
            setTimeout(() => redirect('/cont/login'), 2000);
        } catch (err: any) {
            setError("Raportează la administrator: " + err.toString());
            localStorage.removeItem("accessToken");
        }
    }

    const [username, setUsername]   = useState('');
    const [email,    setEmail]      = useState('');
    const [error,    setError]      = useState('');
    const [loggedIn, setLoggedIn]   = useState(AccountLoad.LOADING);
    const [userRetrieved, setUserRetrieved] = useState(false);
    const [gsRetrieved, SetGsRetrieved] = useState(false);
    const [generalStats, setGeneralStats] = useState({
        wonLevels: 0,
        lostLevels: 0,
        currentLevel: 0,
        wonDaily: 0,
        lostDaily: 0
    });

    useEffect(() => {
        if (loggedIn !== AccountLoad.LOGGED)
            return;

        async function getUserData() {
            try {
                const response = await authorizedFetch("http://localhost:5224/api/user/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) throw new Error("Failed to fetch user data");

                const data = await response.json();
                setUsername(data.user.username);
                setEmail(data.user.emailAddress);
                setUserRetrieved(true);
            } catch (_) {
                setError("Sesiunea a expirat");
                localStorage.removeItem("accessToken");
                setTimeout(() => redirect('/cont/login'), 2000);
            }
        }

        async function getGeneralStats() {
            try {
                const response = await authorizedFetch("http://localhost:5224/api/user/stats", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) throw new Error("Failed to fetch stats");
                const data = await response.json();
                setGeneralStats(data.generalStats);
                SetGsRetrieved(true);
            } catch (_) {
                setError("Sesiunea a expirat");
                localStorage.removeItem("accessToken");
                setTimeout(() => redirect('/cont/login'), 2000);
            }
        }

        getUserData();   
        getGeneralStats();    
    }, [loggedIn]);

    return (
        <section className="account-wrapper">
            {loggedIn === AccountLoad.LOGGED && userRetrieved && gsRetrieved ? (
                <div className="create-account">
                    <h2 style={{ marginBottom: '20px', marginTop: '30px' }}>CONTUL TĂU</h2>
                    <div className="ml-20 mr-20" style={{minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Card>
                            <h4 style={{marginBottom: '6px'}}>Informații utilizator</h4>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p className='p-account' style={{ margin: 0, textAlign: 'left', textDecoration: 'none' }}>Poreclă:</p>
                                    <p className='exo' style={{ margin: 0, fontWeight: 'bold', textAlign: 'right' }}>{username}</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p className='p-account' style={{ margin: 0, textAlign: 'left', textDecoration: 'none' }}>Email:</p>
                                    <p className='exo' style={{ margin: 0, fontWeight: 'bold', textAlign: 'right' }}>{email}</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p className='p-account' style={{ margin: 0, textAlign: 'left', textDecoration: 'none' }}>Verificat:</p>
                                    <p className='exo' style={{ margin: 0, fontWeight: 'bold', textAlign: 'right' }}>DA</p>
                                </div>
                            </div>
                        </Card>
                        <Card>
                            <h4 style={{marginBottom: '6px'}}>Statistici nivele</h4>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p className='p-account' style={{ margin: 0, textAlign: 'left', textDecoration: 'none' }}>Ai ajuns la:</p>
                                    <p className='exo' style={{ margin: 0, fontWeight: 'bold', textAlign: 'right' }}>nivelul {generalStats.currentLevel}</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p className='p-account' style={{ margin: 0, textAlign: 'left', textDecoration: 'none' }}>Niveluri rezolvate:</p>
                                <p className='exo' style={{ margin: 0, fontWeight: 'bold', textAlign: 'right' }}>{generalStats.wonLevels}</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p className='p-account' style={{ margin: 0, textAlign: 'left', textDecoration: 'none' }}>Niveluri pierdute:</p>
                                <p className='exo' style={{ margin: 0, fontWeight: 'bold', textAlign: 'right' }}>{generalStats.lostLevels}</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p className='p-account' style={{ margin: 0, textAlign: 'left', textDecoration: 'none' }}>Rată de succes:</p>
                                    <p className='exo' style={{ margin: 0, fontWeight: 'bold', textAlign: 'right' }}>{ Number(generalStats.wonLevels + generalStats.lostLevels) === 0 ? '0%' : (Number(generalStats.wonLevels) / (Number(generalStats.wonLevels) + Number(generalStats.lostLevels)) * 100).toFixed(0) + "%"}</p>
                                </div>
                            </div>
                        </Card>
                        <Card>
                        <h4 style={{marginBottom: '6px'}}>Statistici cuvântul zilei</h4>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p className='p-account' style={{ margin: 0, textAlign: 'left', textDecoration: 'none' }}>Cuvinte rezolvate:</p>
                                <p className='exo' style={{ margin: 0, fontWeight: 'bold', textAlign: 'right' }}>{generalStats.wonDaily}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p className='p-account' style={{ margin: 0, textAlign: 'left', textDecoration: 'none' }}>Cuvinte pierdute:</p>
                                <p className='exo' style={{ margin: 0, fontWeight: 'bold', textAlign: 'right' }}>{generalStats.lostDaily}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p className='p-account' style={{ margin: 0, textAlign: 'left', textDecoration: 'none' }}>Rată de succes:</p>
                                <p className='exo' style={{ margin: 0, fontWeight: 'bold', textAlign: 'right' }}>{ Number(generalStats.wonDaily + generalStats.lostDaily) === 0 ? '0%' : (Number(generalStats.wonDaily) / (Number(generalStats.wonDaily) + Number(generalStats.lostDaily)) * 100).toFixed(0) + "%"}</p>
                            </div>
                        </div>
                        </Card>
                        <br />
                        <input style={{marginTop: '-10px'}} type="button" value="Inapoi la meniul principal" className="connect-button-small" onClick={() => { redirect("/") }}/>
                        <input style={{marginTop: '10px'}} type="button" value="Ieși din cont" className="connect-button-small" onClick={async () => { await logout(); }}/>
                        <p className='exo' style={{fontWeight: 'bolder', fontSize: '1.2rem', marginTop: '24px'}}>Zonă periculoasă!</p>
                        <input style={{marginTop: '5px'}} type="button" value="Șterge contul" className="connect-button-small button-important" onClick={async () => { await logout(); }}/>
                    </div>
                </div>
            ) : loggedIn == AccountLoad.NOT_LOGGED ? (
                <Loading topMessage={error} bottomMessage='Vei fi redirecționat să te autentifici' />
            ) : (
                <Loading topMessage='Pregătim pagina' bottomMessage='pentru tine' />
            )}
        </section>
    )
}

export default Account;