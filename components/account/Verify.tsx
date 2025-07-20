'use client';

import { verifyAccount } from '@/utils/backendUtils';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BackButton from '../BackButton';

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
            <BackButton />=
            <h1
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translateX(-50%) translateY(-50%)',
                    textAlign: 'center',
                }}
                className="exo"
            >
                {result}
            </h1>
        </main>
    );
}

export default Verify;
