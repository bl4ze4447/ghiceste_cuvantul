import './style.css';
import BackButton from '@/components/BackButton/component';
import React from 'react';

const PrivacyPolicy = () => {
    return (
        <>
            <BackButton />
            <main className="terms-container">
                <h1 className="terms-h1">Politica de Confidențialitate - „Ghicește Cuvântul”</h1>

                <p className="terms-last-update">Ultima actualizare: 10 iulie, 2025</p>

                <Section title="1. Introducere">
                    <p>
                        Prezenta Politică de Confidențialitate descrie modul în care sunt colectate,
                        utilizate, stocate și protejate datele personale ale utilizatorilor
                        („Utilizatori”) aplicației „Ghicește Cuvântul” („Jocul”), administrată de
                        Belu Antonie-Gabriel, persoană fizică („Dezvoltatorul”).
                    </p>
                </Section>

                <Section title="2. Categorii de date colectate">
                    <ul>
                        <li>Adresa de e-mail</li>
                        <li>Username (nume de utilizator)</li>
                        <li>Parolă hashuită (nu se stochează în clar)</li>
                        <li>Statistici legate de joc (ex: rată de succes, progres)</li>
                        <li>
                            Date tehnice necesare funcționării aplicației (ex: IP, date legate
                            despre jocurile jucate)
                        </li>
                    </ul>
                </Section>

                <Section title="3. Scopurile prelucrării">
                    <ul>
                        <li>Autentificare și autorizare securizată</li>
                        <li>Afișarea progresului și statisticilor personale</li>
                        <li>Îmbunătățirea funcționalității aplicației</li>
                        <li>Asigurarea securității conturilor și prevenirea abuzurilor</li>
                        <li>Comunicare cu utilizatorii (opțional, prin e-mail)</li>
                        <li>Validarea jocurilor jucate</li>
                    </ul>
                </Section>

                <Section title="4. Temeiul legal (conform GDPR)">
                    <ul>
                        <li>
                            Art. 6(1)(a) - consimțământul explicit oferit de Utilizator la crearea
                            contului
                        </li>
                        <li>
                            Art. 6(1)(b) - executarea unui contract: furnizarea serviciului (Jocul)
                        </li>
                        <li>
                            Art. 6(1)(f) - interes legitim: securizarea infrastructurii și
                            prevenirea fraudelor
                        </li>
                    </ul>
                </Section>

                <Section title="5. Drepturile utilizatorului">
                    <ul>
                        <li>Dreptul de acces la datele personale</li>
                        <li>Dreptul la rectificare</li>
                        <li>Dreptul la ștergerea datelor („dreptul de a fi uitat”)</li>
                        <li>Dreptul la restricționarea prelucrării</li>
                        <li>Dreptul la opoziție</li>
                        <li>
                            Dreptul de a depune o plângere la Autoritatea Națională de Supraveghere
                            a Prelucrării Datelor cu Caracter Personal (ANSPDCP)
                        </li>
                    </ul>
                    <p style={{ marginTop: '1rem' }}>
                        Cererile se pot trimite la: <strong>contact@ghicestecuvantul.ro</strong>
                    </p>
                </Section>

                <Section title="6. Securitatea datelor">
                    <ul>
                        <li>
                            Parolele sunt stocate în formă criptată folosind algoritmi moderni
                            (bcrypt)
                        </li>
                        <li>
                            Autentificarea utilizează cookie-uri HTTP-only, Secure și token-uri CSRF
                            (localStorage)
                        </li>
                        <li>Comunicarea între client și server este criptată prin HTTPS</li>
                        <li>
                            Se aplică măsuri tehnice pentru protejarea împotriva accesului
                            neautorizat
                        </li>
                    </ul>
                </Section>

                <Section title="7. Stocarea datelor">
                    <ul>
                        <li>
                            Datele sunt păstrate doar pe durata necesară funcționării serviciului
                            sau până la ștergerea contului
                        </li>
                        <li>
                            Backup-uri periodice sunt realizate pentru prevenirea pierderii datelor
                        </li>
                        <li>
                            Serverul este găzduit în spațiul UE (Hetzner, Germania) și protejat de
                            Cloudflare
                        </li>
                    </ul>
                </Section>

                <Section title="8. Terți și transferuri de date">
                    <ul>
                        <li>
                            Nu se vând, nu se transferă și nu se partajează date personale cu terți
                        </li>
                        <li>
                            Sunt utilizate servicii terțe pentru analiză anonimă: Vercel Analytics
                            și Cloudflare Web Analytics, fără identificatori personali
                        </li>
                        <li>Nu se folosesc cookie-uri de tracking sau profilare</li>
                    </ul>
                </Section>

                <Section title="9. Cookie-uri și tehnologii similare">
                    <p>
                        Aplicația folosește doar cookie-uri strict necesare pentru autentificare și
                        securitate:
                    </p>
                    <ul>
                        <li>
                            <strong>session_id:</strong> cookie HTTP-only, Secure, valabil 30 zile
                        </li>
                        <li>
                            <strong>csrf_token:</strong> token de protecție împotriva atacurilor
                            CSRF, stocat în localStorage
                        </li>
                    </ul>
                    <p>Nu se utilizează cookie-uri în scopuri publicitare sau de urmărire.</p>
                </Section>

                <Section title="10. Ștergerea contului și a datelor">
                    <p>
                        Utilizatorii pot șterge complet contul și toate datele asociate direct din
                        pagina „Contul meu”. După confirmare, datele vor fi eliminate imediat sau
                        cel târziu în 14 zile lucrătoare.
                    </p>
                </Section>

                <Section title="11. Modificări ale politicii">
                    <p>
                        Politica de Confidențialitate poate fi modificată periodic. Utilizatorii
                        activi vor fi notificați în aplicație și/sau prin e-mail.
                    </p>
                </Section>

                <Section title="12. Contact">
                    <p>
                        Pentru orice întrebări sau solicitări legate de datele personale, ne puteți
                        contacta la: <strong>contact@ghicestecuvantul.ro</strong>
                    </p>
                </Section>
            </main>
        </>
    );
};

type SectionProps = {
    title: string;
    children: React.ReactNode;
};

const Section = ({ title, children }: SectionProps) => (
    <section className="terms-section-container">
        <h2 className="terms-section-h2">{title}</h2>
        <div>{children}</div>
    </section>
);

export default PrivacyPolicy;
