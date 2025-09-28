import { GameDailyDto } from '@/dto/game/gameDaily';
import { StatisticsDto } from '@/dto/statistics';
import { GameLevelDto } from '@/dto/game/gameLevel';
import { updateGameRequest } from '@/dto/game/updateGameRequest';
import { GameMode } from '@/constants/constants';
const backendURL = 'http://localhost:5239';

export interface FetchResult {
    ok: boolean | null;
    message: string;
}

export interface FetchGameResult {
    ok: boolean | null;
    game: GameDailyDto | GameLevelDto | null;
    message: string;
    faultyWord: boolean;
}

export interface FetchStatisticsResult {
    ok: boolean | null;
    statistics: StatisticsDto | null;
    message: string;
}

function newFetchResult(ok: boolean | null, message: string) {
    const result: FetchResult = {
        ok: ok,
        message: message,
    };

    return result;
}

function newFetchGameResult(
    ok: boolean | null,
    game: GameDailyDto | GameLevelDto | null,
    message: string,
    faultyWord: boolean = false
) {
    const result: FetchGameResult = {
        ok: ok,
        game: game,
        message: message,
        faultyWord: faultyWord,
    };

    return result;
}

function newFetchStatisticsResult(
    ok: boolean | null,
    statistics: StatisticsDto | null,
    message: string
) {
    const result: FetchStatisticsResult = {
        ok: ok,
        statistics: statistics,
        message: message,
    };

    return result;
}

export async function isLogged() {
    const csrfToken: string | null = localStorage.getItem('csrfToken');
    if (csrfToken == null)
        return newFetchResult(
            false,
            'Sesiunea este invalidă/expirată! Vă rugăm să vă autentificați!'
        );

    try {
        const response = await fetch(`${backendURL}/api/auth/logged-in`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,
            },
        });

        if (response.status === 429)
            return newFetchResult(false, 'Beep boop, prea multe cereri trimise!');

        if (!response.ok) {
            const data = await response.json();
            return newFetchResult(false, extractErrorMessage(data));
        }

        return newFetchResult(response.ok, '');
    } catch (_) {
        return newFetchResult(null, 'Există o problemă de conexiune la noi, încearcă mai târziu!');
    }
}

export async function verifyAccount(code: string) {
    if (code.trim().length === 0) return newFetchResult(false, 'Cod invalid!');

    try {
        const response = await fetch(`${backendURL}/api/auth/verify`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(code),
        });

        if (response.status === 429)
            return newFetchResult(false, 'Beep boop, prea multe cereri trimise!');

        if (!response.ok) {
            const data = await response.json();
            return newFetchResult(false, extractErrorMessage(data));
        }

        return newFetchResult(response.ok, 'Contul dvs. a fost verificat cu succes!');
    } catch (_) {
        return newFetchResult(null, 'Există o problemă de conexiune la noi, încearcă mai târziu!');
    }
}

export async function requestPasswordChange(emailAddress: string, phoneNumber: string) {
    if (emailAddress.trim().length === 0)
        return newFetchResult(false, 'Adresa de email nu poate fi goală!');
    if (emailAddress.trim().length != emailAddress.length)
        return newFetchResult(false, 'Adresa de email nu poate conține spații!');

    try {
        const response = await fetch(`${backendURL}/api/auth/request-password-change`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ emailAddress: emailAddress, phoneNumber: phoneNumber }),
        });

        if (response.status === 429)
            return newFetchResult(false, 'Beep boop, prea multe cereri trimise!');

        const data = await response.json();
        return newFetchResult(response.ok, extractErrorMessage(data));
    } catch (_) {
        return newFetchResult(null, 'Există o problemă de conexiune la noi, încearcă mai târziu!');
    }
}

export async function passwordChange(code: string, password: string, phoneNumber: string) {
    if (code.trim().length === 0) return newFetchResult(false, 'Codul nu poate fi gol!');

    if (password.trim().length === 0) return newFetchResult(false, 'Parola nu poate fi goală!');
    if (password.trim().length < 8)
        return newFetchResult(
            false,
            'Parola introdusă este prea scurtă, trebuiă să conțină minim 8 caractere!'
        );
    if (password.trim().length > 256)
        return newFetchResult(
            false,
            'Parola introdusă este prea lungă, trebuie să conțină maxim 256 caractere!'
        );
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]+$/.test(password))
        return newFetchResult(
            false,
            'Parola trebuie să conțină cel puțin o literă mică, o literă mare, o cifră și să nu conțină spații!'
        );

    try {
        const response = await fetch(`${backendURL}/api/auth/password-change`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: code, newPassword: password, phoneNumber: phoneNumber }),
        });

        if (response.status === 429)
            return newFetchResult(false, 'Beep boop, prea multe cereri trimise!');

        const data = await response.json();
        return newFetchResult(response.ok, extractErrorMessage(data));
    } catch (_) {
        return newFetchResult(null, 'Există o problemă de conexiune la noi, încearcă mai târziu!');
    }
}

export async function register(
    username: string,
    emailAddress: string,
    password: string,
    phoneNumber: string
) {
    if (username.trim().length === 0)
        return newFetchResult(false, 'Numele de utilizator nu poate fi gol!');
    if (!/^[a-zA-Z0-9_]+$/.test(username))
        return newFetchResult(
            false,
            'Numele de utilizator poate conține doar litere, cifre și underscore!'
        );
    if (username.length < 4)
        return newFetchResult(
            false,
            'Numele de utilizator este prea scurt, trebuie să conțina minim 4 caractere!'
        );

    if (username.length > 24) {
        return newFetchResult(
            false,
            'Numele de utilizator este prea lung, trebuie să conțina maxim 24 caractere!'
        );
    }

    if (emailAddress.trim().length === 0)
        return newFetchResult(false, 'Adresa de email nu poate fi goală!');
    if (emailAddress.trim().length != emailAddress.length)
        return newFetchResult(false, 'Adresa de email nu poate conține spații!');

    if (password.trim().length === 0) return newFetchResult(false, 'Parola nu poate fi goală!');

    if (password.trim().length < 8)
        return newFetchResult(
            false,
            'Parola introdusă este prea scurtă, trebuiă să conțină minim 8 caractere!'
        );
    if (password.trim().length > 256)
        return newFetchResult(
            false,
            'Parola introdusă este prea lungă, trebuie să conțină maxim 256 caractere!'
        );
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]+$/.test(password))
        return newFetchResult(
            false,
            'Parola trebuie să conțină cel puțin o literă mică, o literă mare, o cifră și să nu conțină spații!'
        );

    try {
        const response = await fetch(`${backendURL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                emailAddress: emailAddress,
                password: password,
                verified: false,
                banned: false,
                phoneNumber: phoneNumber,
            }),
        });

        if (response.status === 429)
            return newFetchResult(false, 'Beep boop, prea multe cereri trimise!');

        if (!response.ok) {
            const data = await response.json();
            return newFetchResult(false, extractErrorMessage(data));
        }

        return newFetchResult(response.ok, '');
    } catch (_) {
        return newFetchResult(null, 'Există o problemă de conexiune la noi, încearcă mai târziu!');
    }
}

export async function login(emailAddress: string, password: string, phoneNumber: string) {
    if (emailAddress.trim().length === 0)
        return newFetchResult(false, 'Adresa de email nu poate fi goală!');
    if (emailAddress.trim().length != emailAddress.length)
        return newFetchResult(false, 'Adresa de email nu poate conține spații!');

    if (password.trim().length === 0) return newFetchResult(false, 'Parola nu poate fi goală!');
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]+$/.test(password))
        return newFetchResult(
            false,
            'Parola trebuie să conțină cel puțin o literă mică, o literă mare, o cifră și să nu conțină spații!'
        );

    try {
        const response = await fetch(`${backendURL}/api/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'unused',
                emailAddress: emailAddress,
                password: password,
                verified: false,
                banned: false,
                phoneNumber: phoneNumber,
            }),
        });

        if (response.status === 429)
            return newFetchResult(false, 'Beep boop, prea multe cereri trimise!');

        const data = await response.json();
        if (!response.ok) {
            return newFetchResult(false, extractErrorMessage(data));
        }

        localStorage.setItem('csrfToken', data.csrfToken);
        return newFetchResult(true, '');
    } catch (_) {
        return newFetchResult(null, 'Există o problemă de conexiune la noi, încearcă mai târziu!');
    }
}

export async function logout() {
    const csrfToken: string | null = localStorage.getItem('csrfToken');
    if (csrfToken === null)
        return newFetchResult(
            false,
            'Sesiunea este invalidă/expirată! Vă rugăm să vă autentificați!'
        );

    try {
        const response = await fetch(`${backendURL}/api/auth/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,
            },
        });

        if (response.status === 429)
            return newFetchResult(false, 'Beep boop, prea multe cereri trimise!');

        if (!response.ok) {
            const data = await response.json();
            return newFetchResult(false, extractErrorMessage(data));
        }

        localStorage.removeItem('csrfToken');
        return newFetchResult(true, '');
    } catch (_) {
        return newFetchResult(null, 'Există o problemă de conexiune la noi, încearcă mai târziu!');
    }
}

export async function deleteAccount(emailAddress: string, password: string, phoneNumber: string) {
    const csrfToken: string | null = localStorage.getItem('csrfToken');
    if (csrfToken === null)
        return newFetchResult(
            false,
            'Sesiunea este invalidă/expirată! Vă rugăm să vă autentificați!'
        );

    if (emailAddress.trim().length === 0)
        return newFetchResult(false, 'Adresa de email nu poate fi goală!');
    if (emailAddress.trim().length !== emailAddress.length)
        return newFetchResult(false, 'Adresa de email nu poate conține spații!');

    if (password.trim().length == 0) return newFetchResult(false, 'Parola nu poate fi goală!');
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]+$/.test(password))
        return newFetchResult(
            false,
            'Parola trebuie să conțină cel puțin o literă mică, o literă mare, o cifră și să nu conțină spații!'
        );

    try {
        const response = await fetch(`${backendURL}/api/auth/delete`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,
            },
            body: JSON.stringify({
                username: 'unused',
                emailAddress: emailAddress,
                password: password,
                verified: false,
                banned: false,
                phoneNumber: phoneNumber,
            }),
        });

        if (response.status === 429)
            return newFetchResult(false, 'Beep boop, prea multe cereri trimise!');

        if (!response.ok) {
            const data = await response.json();
            return newFetchResult(false, extractErrorMessage(data));
        }

        localStorage.removeItem('csrfToken');
        return newFetchResult(true, '');
    } catch (_) {
        return newFetchResult(null, 'Există o problemă de conexiune la noi, încearcă mai târziu!');
    }
}

function extractErrorMessage(data: any): string {
    if (data.message) return data.message;

    if (data.errors) {
        const firstErrorKey = Object.keys(data.errors)[0];
        const firstErrorMessage = data.errors[firstErrorKey][0];
        return firstErrorMessage;
    }

    return '';
}

export async function getLastDaily() {
    const csrfToken: string | null = localStorage.getItem('csrfToken');

    try {
        const response = await fetch(`${backendURL}/api/game/last-daily`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken === null ? '' : csrfToken,
            },
        });

        if (response.status === 429)
            return newFetchGameResult(false, null, 'Beep boop, prea multe cereri trimise!');

        const data = await response.json();
        if (!response.ok) return newFetchGameResult(false, null, extractErrorMessage(data));

        return newFetchGameResult(true, data, '');
    } catch (_) {
        return newFetchGameResult(
            null,
            null,
            'Există o problemă de conexiune la noi, încearcă mai târziu!'
        );
    }
}

export async function getLastLevel() {
    const csrfToken: string | null = localStorage.getItem('csrfToken');

    try {
        const response = await fetch(`${backendURL}/api/game/last-level`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken === null ? '' : csrfToken,
            },
        });

        if (response.status === 429)
            return newFetchGameResult(false, null, 'Beep boop, prea multe cereri trimise!');

        const data = await response.json();
        if (!response.ok) return newFetchGameResult(false, null, extractErrorMessage(data));

        return newFetchGameResult(true, data, '');
    } catch (_) {
        return newFetchGameResult(
            null,
            null,
            'Există o problemă de conexiune la noi, încearcă mai târziu!'
        );
    }
}

export async function updateLastDaily(word: string, signature: string) {
    const csrfToken: string | null = localStorage.getItem('csrfToken');
    if (csrfToken == null)
        return newFetchGameResult(
            false,
            null,
            'Sesiunea este invalidă/expirată! Vă rugăm să vă autentificați!'
        );

    try {
        const request: updateGameRequest = {
            word: word,
            signature: signature === '' ? 'unused' : signature,
        };
        const response = await fetch(`${backendURL}/api/game/last-daily`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,
            },
            body: JSON.stringify(request),
        });

        if (response.status === 429)
            return newFetchGameResult(false, null, 'Beep boop, prea multe cereri trimise!');

        const data = await response.json();
        if (!response.ok) return newFetchGameResult(false, null, extractErrorMessage(data));

        if (data.message && data.game)
            return newFetchGameResult(true, data.game as GameDailyDto, data.message);
        if (data.message) return newFetchGameResult(true, null, '', true);
        return newFetchGameResult(true, data as GameDailyDto, '');
    } catch (_) {
        return newFetchGameResult(
            null,
            null,
            'Există o problemă de conexiune la noi, încearcă mai târziu!'
        );
    }
}

export async function updateLastLevel(word: string, signature: string) {
    const csrfToken: string | null = localStorage.getItem('csrfToken');
    if (csrfToken == null)
        return newFetchGameResult(
            false,
            null,
            'Sesiunea este invalidă/expirată! Vă rugăm să vă autentificați!'
        );

    try {
        const request: updateGameRequest = {
            word: word,
            signature: signature === '' ? 'unused' : signature,
        };
        const response = await fetch(`${backendURL}/api/game/last-level`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,
            },
            body: JSON.stringify(request),
        });

        if (response.status === 429)
            return newFetchGameResult(false, null, 'Beep boop, prea multe cereri trimise!');

        const data = await response.json();
        if (!response.ok) return newFetchGameResult(false, null, extractErrorMessage(data));

        if (data.message && data.game)
            return newFetchGameResult(true, data.game as GameLevelDto, data.message);
        if (data.message) return newFetchGameResult(true, null, '', true);
        return newFetchGameResult(true, data as GameLevelDto, '');
    } catch (_) {
        return newFetchGameResult(
            null,
            null,
            'Există o problemă de conexiune la noi, încearcă mai târziu!'
        );
    }
}

export async function getStatistics() {
    const csrfToken: string | null = localStorage.getItem('csrfToken');
    if (csrfToken == null)
        return newFetchStatisticsResult(
            false,
            null,
            'Sesiunea este invalidă/expirată! Vă rugăm să vă autentificați!'
        );

    try {
        const response = await fetch(`${backendURL}/api/game/statistics`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,
            },
        });

        if (response.status === 429)
            return newFetchStatisticsResult(false, null, 'Beep boop, prea multe cereri trimise!');

        const data = await response.json();
        if (!response.ok) {
            return newFetchStatisticsResult(false, null, extractErrorMessage(data));
        }

        return newFetchStatisticsResult(response.ok, data, '');
    } catch (_) {
        return newFetchStatisticsResult(
            null,
            null,
            'Există o problemă de conexiune la noi, încearcă mai târziu!'
        );
    }
}

export async function secretWord(gameMode: GameMode) {
    const csrfToken: string | null = localStorage.getItem('csrfToken');
    try {
        const response = await fetch(
            `${backendURL}/api/game/${
                gameMode === GameMode.DAILY ? 'secret-word-daily' : 'secret-word-level'
            }`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken === null ? '' : csrfToken,
                },
            }
        );

        if (response.status === 429)
            return newFetchResult(false, 'Beep boop, prea multe cereri trimise!');

        const data = await response.json();
        if (!response.ok) return newFetchResult(false, extractErrorMessage(data));

        return newFetchResult(response.ok, data.word);
    } catch (_) {
        return newFetchResult(null, 'Există o problemă de conexiune la noi, încearcă mai târziu!');
    }
}
