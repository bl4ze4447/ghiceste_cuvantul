import './globals.css';

import { Capriola, Exo_2, Playwrite_RO } from 'next/font/google';
import { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';

const exo2 = Exo_2({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-exo2',
});
const playwrite = Playwrite_RO({
    display: 'swap',
    variable: '--font-title',
});
const workSans = Capriola({
    weight: '400',
    display: 'swap',
    variable: '--font-capriola',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Ghicește cuvântul',
    description:
        'Descoperă cuvântul zilei sau încearcă să ajungi la nivele mai mari ca prietenii tai!',
    keywords: [
        'wordle română',
        'cuvântul zilei',
        'jocuri românești',
        'ghiceste cuvantul',
        'cuvant',
        'ghiceste',
        'wordle ro',
        'wordle in romana',
    ],
    openGraph: {
        title: 'Ghicește cuvântul',
        description: 'Joacă ghicește cuvântul și descoperă cuvintele înaintea prietenilor!',
        images: ['https://ghicestecuvantul.ro/social_media.png'],
        url: 'https://ghicestecuvantul.ro',
    },
    icons: {
        icon: [
            { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
            { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
        ],
        shortcut: '/favicon/favicon.ico',
        apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },

    appleWebApp: {
        title: 'G. Cuvântul',
        capable: true,
        statusBarStyle: 'default',
    },

    manifest: '/favicon/site.webmanifest',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ro" className={`${exo2.variable} ${playwrite.variable} ${workSans.variable}`}>
            <body>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
