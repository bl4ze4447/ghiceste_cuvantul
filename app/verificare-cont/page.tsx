'use client';

import React, { Suspense } from 'react';
import ResetPassword from '@/components/account/Verify';

function VerifyPage() {
    return (
        <Suspense fallback={<div>Se încarcă...</div>}>
            <ResetPassword />
        </Suspense>
    );
}

export default VerifyPage;
