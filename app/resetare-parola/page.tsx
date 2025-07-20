'use client';

import React, { Suspense } from 'react';
import ResetPassword from '@/components/account/ResetPassword';

function ResetPage() {
    return (
        <Suspense fallback={<div>Se încarcă...</div>}>
            <ResetPassword />
        </Suspense>
    );
}

export default ResetPage;
