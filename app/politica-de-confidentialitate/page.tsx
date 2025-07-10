import BackButton from '@/components/BackButton';
import React from 'react';

const PrivacyPolicy = () => {
    return (
        <>
            <BackButton />
            <div
                style={{
                    padding: '2rem',
                    lineHeight: '1.6',
                    maxWidth: '900px',
                    margin: '0 auto',
                    color: 'white',
                    marginTop: '-38px',
                }}
                className="exo"
            >
                <h1 className="exo" style={{ fontSize: '2rem' }}>
                    Politica de Confidențialitate – „Ghicește Cuvântul”
                </h1>

                <p className="exo" style={{ fontStyle: 'italic', marginBottom: '30px' }}>
                    Ultima actualizare: 10 iulie, 2025
                </p>

                <Section title="1. Introducere">
                    <p className="exo">
                        Prezenta Politică de Confidențialitate descrie modul în care sunt colectate,
                        utilizate, stocate și protejate datele personale ale utilizatorilor
                        („Utilizatori”) aplicației „Ghicește Cuvântul” („Jocul”), administrată de
                        Belu Antonie-Gabriel, persoană fizică („Dezvoltatorul”).
                    </p>
                </Section>

                <Section title="2. Categorii de date colectate">
                    <ul>
                        <li className="exo">Adresa de e-mail</li>
                        <li className="exo">Username (nume de utilizator)</li>
                        <li className="exo">Parolă hashuită (nu se stochează în clar)</li>
                        <li className="exo">
                            Statistici legate de joc (ex: rată de succes, progres)
                        </li>
                        <li className="exo">
                            Date tehnice necesare funcționării aplicației (ex: IP, date legate
                            despre jocurile jucate)
                        </li>
                    </ul>
                </Section>

                <Section title="3. Scopurile prelucrării">
                    <ul>
                        <li className="exo">Autentificare și autorizare securizată</li>
                        <li className="exo">Afișarea progresului și statisticilor personale</li>
                        <li className="exo">Îmbunătățirea funcționalității aplicației</li>
                        <li className="exo">
                            Asigurarea securității conturilor și prevenirea abuzurilor
                        </li>
                        <li className="exo">Comunicare cu utilizatorii (opțional, prin e-mail)</li>
                        <li className="exo">Validarea jocurilor jucate</li>
                    </ul>
                </Section>

                <Section title="4. Temeiul legal (conform GDPR)">
                    <ul>
                        <li className="exo">
                            Art. 6(1)(a) - consimțământul explicit oferit de Utilizator la crearea
                            contului
                        </li>
                        <li className="exo">
                            Art. 6(1)(b) - executarea unui contract: furnizarea serviciului (Jocul)
                        </li>
                        <li className="exo">
                            Art. 6(1)(f) - interes legitim: securizarea infrastructurii și
                            prevenirea fraudelor
                        </li>
                    </ul>
                </Section>

                <Section title="5. Drepturile utilizatorului">
                    <ul>
                        <li className="exo">Dreptul de acces la datele personale</li>
                        <li className="exo">Dreptul la rectificare</li>
                        <li className="exo">
                            Dreptul la ștergerea datelor („dreptul de a fi uitat”)
                        </li>
                        <li className="exo">Dreptul la restricționarea prelucrării</li>
                        <li className="exo">Dreptul la opoziție</li>
                        <li className="exo">
                            Dreptul de a depune o plângere la Autoritatea Națională de Supraveghere
                            a Prelucrării Datelor cu Caracter Personal (ANSPDCP)
                        </li>
                    </ul>
                    <p className="exo" style={{ marginTop: '1rem' }}>
                        Cererile se pot trimite la:{' '}
                        <strong className="exo">contact@ghicestecuvantul.ro</strong>
                    </p>
                </Section>

                <Section title="6. Securitatea datelor">
                    <ul>
                        <li className="exo">
                            Parolele sunt stocate în formă criptată folosind algoritmi moderni
                            (bcrypt)
                        </li>
                        <li className="exo">
                            Autentificarea utilizează cookie-uri HTTP-only, Secure și token-uri CSRF
                            (localStorage)
                        </li>
                        <li className="exo">
                            Comunicarea între client și server este criptată prin HTTPS
                        </li>
                        <li className="exo">
                            Se aplică măsuri tehnice pentru protejarea împotriva accesului
                            neautorizat
                        </li>
                    </ul>
                </Section>

                <Section title="7. Stocarea datelor">
                    <ul>
                        <li className="exo">
                            Datele sunt păstrate doar pe durata necesară funcționării serviciului
                            sau până la ștergerea contului
                        </li>
                        <li className="exo">
                            Backup-uri periodice sunt realizate pentru prevenirea pierderii datelor
                        </li>
                        <li className="exo">
                            Serverul este găzduit în spațiul UE (Hetzner, Germania) și protejat de
                            Cloudflare
                        </li>
                    </ul>
                </Section>

                <Section title="8. Terți și transferuri de date">
                    <ul>
                        <li className="exo">
                            Nu se vând, nu se transferă și nu se partajează date personale cu terți
                        </li>
                        <li className="exo">
                            Sunt utilizate servicii terțe pentru analiză anonimă: Vercel Analytics
                            și Cloudflare Web Analytics, fără identificatori personali
                        </li>
                        <li className="exo">Nu se folosesc cookie-uri de tracking sau profilare</li>
                    </ul>
                </Section>

                <Section title="9. Cookie-uri și tehnologii similare">
                    <p className="exo">
                        Aplicația folosește doar cookie-uri strict necesare pentru autentificare și
                        securitate:
                    </p>
                    <ul>
                        <li className="exo">
                            <strong className="exo">session_id:</strong> cookie HTTP-only, Secure,
                            valabil 7 zile
                        </li>
                        <li className="exo">
                            <strong className="exo">csrf_token:</strong> token de protecție
                            împotriva atacurilor CSRF, stocat în localStorage
                        </li>
                    </ul>
                    <p className="exo">
                        Nu se utilizează cookie-uri în scopuri publicitare sau de urmărire.
                    </p>
                </Section>

                <Section title="10. Ștergerea contului și a datelor">
                    <p className="exo">
                        Utilizatorii pot șterge complet contul și toate datele asociate direct din
                        pagina „Contul meu”. După confirmare, datele vor fi eliminate imediat sau
                        cel târziu în 14 zile lucrătoare.
                    </p>
                </Section>

                <Section title="11. Modificări ale politicii">
                    <p className="exo">
                        Politica de Confidențialitate poate fi modificată periodic. Utilizatorii
                        activi vor fi notificați în aplicație și/sau prin e-mail.
                    </p>
                </Section>

                <Section title="12. Contact">
                    <p className="exo">
                        Pentru orice întrebări sau solicitări legate de datele personale, ne puteți
                        contacta la: <strong className="exo">contact@ghicestecuvantul.ro</strong>
                    </p>
                </Section>
            </div>
        </>
    );
};

type SectionProps = {
    title: string;
    children: React.ReactNode;
};

const Section = ({ title, children }: SectionProps) => (
    <section style={{ marginBottom: '2.4rem' }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }} className="exo">
            {title}
        </h2>
        <div>{children}</div>
    </section>
);

export default PrivacyPolicy;
