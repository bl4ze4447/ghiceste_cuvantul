import './style.css';

import Link from 'next/link';
import cloudFlareLogo from '@/public/CF_logomark.svg';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="footer-container">
            <section className="footer-links-section">
                <p>© 2025 Ghicește Cuvântul. Toate drepturile rezervate.</p>
                <section>
                    <Link href="termeni-si-conditii">Termeni și Condiții</Link>
                    <span style={{ color: 'white' }}> | </span>
                    <Link href="politica-de-confidentialitate">Politica de Confidențialitate</Link>
                </section>
                <p>
                    <Image
                        src={cloudFlareLogo}
                        alt="Cloudflare logo"
                        width={28}
                        height={0}
                        style={{ marginRight: '3px' }}
                    />{' '}
                    Protecție asigurată de Cloudflare
                </p>
                <p style={{ opacity: '0.5' }}>Versiunea 2.1</p>
            </section>
        </footer>
    );
};

export default Footer;
