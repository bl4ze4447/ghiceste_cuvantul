import './style.css';
import BackButton from '@/components/BackButton/component';
import React from 'react';

const TermsAndConditions = () => {
    return (
        <>
            <BackButton />
            <main className="terms-container">
                <h1 className="terms-h1">Termeni și Condiții de Utilizare - „Ghicește Cuvântul”</h1>

                <p className="terms-last-update">Ultima actualizare: 10 iulie, 2025</p>

                <Section title="1. Introducere">
                    <p>
                        Acești termeni și condiții („Termenii”) reglementează utilizarea aplicației
                        web „Ghicește Cuvântul” („Jocul”), dezvoltată și administrată de Belu
                        Antonie-Gabriel, persoană fizică („Dezvoltatorul”). Prin accesarea sau
                        utilizarea Jocului, utilizatorul („Utilizatorul”) declară că a citit,
                        înțeles și acceptat în întregime acești Termeni.
                    </p>
                </Section>

                <Section title="2. Descrierea Jocului">
                    <ul>
                        <li>
                            Jocul constă în ghicirea unui cuvânt format dintr-un număr fix de
                            litere.
                        </li>
                        <li>
                            Modul „Cuvântul zilei” oferă un cuvânt unic zilnic, cu maximum 6
                            încercări.
                        </li>
                        <li>
                            Modul „Niveluri” permite parcurgerea succesivă a provocărilor, fiecare
                            cu 6 încercări.
                        </li>
                        <li>
                            Fără cont, se oferă acces la un demo limitat. Pentru acces complet, este
                            necesar un cont.
                        </li>
                    </ul>
                </Section>

                <Section title="3. Crearea contului și securitatea">
                    <ul>
                        <li>Este necesar un username și o adresă de e-mail validă.</li>
                        <li>Termenii trebuie acceptați la înregistrare.</li>
                        <li>Parolele sunt criptate cu algoritmi siguri, precum bcrypt.</li>
                        <li>
                            Autentificarea utilizează cookie-uri HTTP-only, secure, valabile 30
                            zile, și token-uri CSRF pentru protecție suplimentară.
                        </li>
                        <li>
                            Conturile pot fi suspendate în caz de abuz sau încălcare a Termenilor.
                        </li>
                        <li>
                            Utilizatorii pot solicita ștergerea completă a contului și a tuturor
                            datelor asociate printr-un buton simplu disponibil în pagina contului
                            lor. Ștergerea va fi efectuată imediat sau în cel mult 14 zile
                            lucrătoare.
                        </li>
                    </ul>
                </Section>

                <Section title="4. Protecția datelor cu caracter personal (GDPR)">
                    <ul>
                        <li>Se respectă Regulamentul (UE) 2016/679 („GDPR”).</li>
                        <li>
                            Prin crearea unui cont, Utilizatorul își exprimă consimțământul expres
                            și informat privind colectarea și prelucrarea datelor personale necesare
                            funcționării Jocului, în conformitate cu GDPR.
                        </li>
                        <li>
                            Date colectate: e-mail, username, parola hashuită, statistici și date
                            tehnice necesare funcționării aplicației.
                        </li>
                        <li>Nu se colectează date sensibile.</li>
                        <li>
                            Se folosește Vercel Analytics și Cloudflare Web Analytics pentru analiză
                            anonimă, fără identificare personală.
                        </li>
                        <li>Datele nu sunt vândute sau cedate terților.</li>
                        <li>
                            Utilizatorul are dreptul la acces, rectificare, ștergere,
                            restricționare, opoziție și la depunerea unei plângeri la Autoritatea
                            Națională pentru Supravegherea Prelucrării Datelor cu Caracter Personal
                            (ANSPDCP).
                        </li>
                        <li>
                            Utilizatorii pot vizualiza toate datele personale asociate contului din
                            pagina „Contul meu”.
                        </li>
                        <li>
                            Utilizatorii pot modifica parola din pagina de autentificare sau
                            recuperare parolă.
                        </li>
                        <li>
                            Utilizatorii pot solicita ștergerea completă a contului și a tuturor
                            datelor asociate printr-un buton disponibil în pagina „Contul meu”.
                        </li>
                        <li>
                            Utilizatorul are dreptul la acces, rectificare, ștergere,
                            restricționare, opoziție și la depunerea unei plângeri la Autoritatea
                            Națională pentru Supravegherea Prelucrării Datelor cu Caracter Personal
                            (ANSPDCP).
                        </li>
                        <li>
                            Solicitările se trimit la: <strong>belutoni06@gmail.com</strong>.
                        </li>
                        <li>
                            Datele sunt păstrate doar cât este necesar pentru scopurile declarate.
                        </li>
                        <li>
                            Operatorul de date este Belu Antonie-Gabriel, persoană fizică,
                            dezvoltator independent al Jocului.
                        </li>
                    </ul>
                    <p style={{ marginTop: '1rem' }}>
                        Aplicația utilizează cookie-uri strict esențiale pentru autentificare și
                        securitate (ex: cookie session_id HTTP-only, secure). Nu sunt plasate
                        cookie-uri în scopuri de marketing sau urmărire.
                    </p>
                </Section>

                <Section title="5. Drepturile dezvoltatorului">
                    <ul>
                        <li>Toate drepturile asupra Jocului aparțin lui Belu Antonie-Gabriel.</li>
                        <li>
                            Backend-ul Jocului nu este open-source și nu poate fi reprodus sau
                            distribuit fără consimțământul expres al dezvoltatorului.
                        </li>
                        <li>
                            Frontend-ul este public și disponibil pe GitHub pentru consultare și
                            utilizare în scopuri personale sau educaționale.
                        </li>
                        <li>
                            Dezvoltatorul poate modifica, suspenda sau întrerupe serviciul fără
                            notificări sau compensații.
                        </li>
                        <li>Termenii pot fi actualizați cu notificarea utilizatorilor activi.</li>
                    </ul>
                </Section>

                <Section title="6. Limitarea răspunderii">
                    <ul>
                        <li>
                            Jocul este oferit „ca atare”, fără garanții explicite sau implicite.
                        </li>
                        <li>
                            Dezvoltatorul nu răspunde pentru erori tehnice, pierderi de date sau
                            utilizare incorectă a aplicației.
                        </li>
                        <li>Utilizatorul este responsabil pentru securitatea propriului cont.</li>
                    </ul>
                </Section>

                <Section title="7. Reguli privind minorii">
                    <ul>
                        <li>
                            Jocul este potrivit pentru toate vârstele și nu conține conținut
                            inadecvat.
                        </li>
                        <li>
                            Minorii sub 14 ani sunt încurajați să fie supravegheați de părinți sau
                            tutori legali.
                        </li>
                        <li>
                            Prin crearea unui cont, se consideră că tutorele legal și-a dat
                            consimțământul pentru utilizarea Jocului.
                        </li>
                    </ul>
                </Section>

                <Section title="8. Monetizare și modificări viitoare">
                    <ul>
                        <li>Jocul este gratuit în prezent.</li>
                        <li>
                            Pot fi introduse în viitor funcții contra cost, reclame sau
                            micro-tranzacții.
                        </li>
                        <li>Orice modificare va fi comunicată prin aplicație și/sau e-mail.</li>
                    </ul>
                </Section>

                <Section title="9. Suspendarea și blocarea conturilor">
                    <ul>
                        <li>
                            Conturile pot fi suspendate în caz de: utilizare automată (boturi),
                            tentative de compromitere, sau alte încălcări ale Termenilor.
                        </li>
                    </ul>
                </Section>

                <Section title="10. Legea aplicabilă și jurisdicția">
                    <ul>
                        <li>Acești Termeni sunt guvernați de legea din România.</li>
                        <li>
                            Orice litigiu va fi soluționat amiabil sau, în caz contrar, de
                            instanțele competente din România.
                        </li>
                    </ul>
                </Section>

                <Section title="11. Contact">
                    <p>Pentru întrebări sau cereri privind datele personale:</p>
                    <p>
                        Email: <strong>contact@ghicestecuvantul.ro</strong>
                    </p>
                </Section>

                <Section title="12. Cod sursă și licențiere">
                    <p>Frontend-ul aplicației „Ghicește Cuvântul” este disponibil public pe Git</p>
                    <p>Codul backend este proprietar și nu este disponibil public.</p>
                    <p>
                        Este interzisă reproducerea, distribuirea sau modificarea fără permisiunea
                        expresă a dezvoltatorului.
                    </p>
                </Section>

                <Section title="13. Acceptarea termenilor">
                    <p>
                        Prin continuarea utilizării aplicației „Ghicește Cuvântul”, utilizatorul
                        confirmă că a citit, înțeles și acceptat acești Termeni și Condiții.
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

export default TermsAndConditions;
