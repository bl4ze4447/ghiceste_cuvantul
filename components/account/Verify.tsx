'use client';

import './style.css';

import { verifyAccount } from '@/utils/backendUtils';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BackButton from '../BackButton/component';

function Verify() {
    const [result, setResult] = useState('');
    const searchParams = useSearchParams();

    useEffect(() => {
        const code = searchParams.get('code');
        if (code === null) {
            setResult('Nu există niciun cod de verificare!');
            return;
        }

        verifyAccount(code).then((result) => {
            setResult(result.message);
        });
    }, [searchParams]);

    return (
        <main>
            <BackButton />
            <h1 className="verify-h1">{result}</h1>
        </main>
    );
}

export default Verify;
