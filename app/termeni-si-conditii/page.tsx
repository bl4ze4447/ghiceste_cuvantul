import BackButton from '@/components/BackButton';
import React from 'react';

const TermsAndConditions = () => {
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
                    Termeni și Condiții de Utilizare – „Ghicește Cuvântul”
                </h1>

                <p className="exo" style={{ fontStyle: 'italic', marginBottom: '30px' }}>
                    Ultima actualizare: 10 iulie, 2025
                </p>

                <Section title="1. Introducere">
                    <p className="exo">
                        Acești termeni și condiții („Termenii”) reglementează utilizarea aplicației
                        web „Ghicește Cuvântul” („Jocul”), dezvoltată și administrată de Belu
                        Antonie-Gabriel, persoană fizică („Dezvoltatorul”). Prin accesarea sau
                        utilizarea Jocului, utilizatorul („Utilizatorul”) declară că a citit,
                        înțeles și acceptat în întregime acești Termeni.
                    </p>
                </Section>

                <Section title="2. Descrierea Jocului">
                    <ul>
                        <li className="exo">
                            Jocul constă în ghicirea unui cuvânt format dintr-un număr fix de
                            litere.
                        </li>
                        <li className="exo">
                            Modul „Cuvântul zilei” oferă un cuvânt unic zilnic, cu maximum 6
                            încercări.
                        </li>
                        <li className="exo">
                            Modul „Niveluri” permite parcurgerea succesivă a provocărilor, fiecare
                            cu 6 încercări.
                        </li>
                        <li className="exo">
                            Fără cont, se oferă acces la un demo limitat. Pentru acces complet, este
                            necesar un cont.
                        </li>
                    </ul>
                </Section>

                <Section title="3. Crearea contului și securitatea">
                    <ul>
                        <li className="exo">
                            Este necesar un username și o adresă de e-mail validă.
                        </li>
                        <li className="exo">Termenii trebuie acceptați la înregistrare.</li>
                        <li className="exo">
                            Parolele sunt criptate cu algoritmi siguri, precum bcrypt.
                        </li>
                        <li className="exo">
                            Autentificarea utilizează cookie-uri HTTP-only, secure, valabile 7 zile,
                            și token-uri CSRF pentru protecție suplimentară.
                        </li>
                        <li className="exo">
                            Conturile pot fi suspendate în caz de abuz sau încălcare a Termenilor.
                        </li>
                        <li className="exo">
                            Utilizatorii pot solicita ștergerea completă a contului și a tuturor
                            datelor asociate printr-un buton simplu disponibil în pagina contului
                            lor. Ștergerea va fi efectuată imediat sau în cel mult 14 zile
                            lucrătoare.
                        </li>
                    </ul>
                </Section>

                <Section title="4. Protecția datelor cu caracter personal (GDPR)">
                    <ul>
                        <li className="exo">Se respectă Regulamentul (UE) 2016/679 („GDPR”).</li>
                        <li className="exo">
                            Prin crearea unui cont, Utilizatorul își exprimă consimțământul expres
                            și informat privind colectarea și prelucrarea datelor personale necesare
                            funcționării Jocului, în conformitate cu GDPR.
                        </li>
                        <li className="exo">
                            Date colectate: e-mail, username, parola hashuită, statistici și date
                            tehnice necesare funcționării aplicației.
                        </li>
                        <li className="exo">Nu se colectează date sensibile.</li>
                        <li className="exo">
                            Se folosește Vercel Analytics și Cloudflare Web Analytics pentru analiză
                            anonimă, fără identificare personală.
                        </li>
                        <li className="exo">Datele nu sunt vândute sau cedate terților.</li>
                        <li className="exo">
                            Utilizatorul are dreptul la acces, rectificare, ștergere,
                            restricționare, opoziție și la depunerea unei plângeri la Autoritatea
                            Națională pentru Supravegherea Prelucrării Datelor cu Caracter Personal
                            (ANSPDCP).
                        </li>
                        <li className="exo">
                            Utilizatorii pot vizualiza toate datele personale asociate contului din
                            pagina „Contul meu”.
                        </li>
                        <li className="exo">
                            Utilizatorii pot modifica parola din pagina de autentificare sau
                            recuperare parolă.
                        </li>
                        <li className="exo">
                            Utilizatorii pot solicita ștergerea completă a contului și a tuturor
                            datelor asociate printr-un buton disponibil în pagina „Contul meu”.
                        </li>
                        <li className="exo">
                            Utilizatorul are dreptul la acces, rectificare, ștergere,
                            restricționare, opoziție și la depunerea unei plângeri la Autoritatea
                            Națională pentru Supravegherea Prelucrării Datelor cu Caracter Personal
                            (ANSPDCP).
                        </li>
                        <li className="exo">
                            Solicitările se trimit la:{' '}
                            <strong className="exo">belutoni06@gmail.com</strong>.
                        </li>
                        <li className="exo">
                            Datele sunt păstrate doar cât este necesar pentru scopurile declarate.
                        </li>
                        <li className="exo">
                            Operatorul de date este Belu Antonie-Gabriel, persoană fizică,
                            dezvoltator independent al Jocului.
                        </li>
                    </ul>
                    <p className="exo" style={{ marginTop: '1rem' }}>
                        Aplicația utilizează cookie-uri strict esențiale pentru autentificare și
                        securitate (ex: cookie session_id HTTP-only, secure). Nu sunt plasate
                        cookie-uri în scopuri de marketing sau urmărire.
                    </p>
                </Section>

                <Section title="5. Drepturile dezvoltatorului">
                    <ul>
                        <li className="exo">
                            Toate drepturile asupra Jocului aparțin lui Belu Antonie-Gabriel.
                        </li>
                        <li className="exo">
                            Backend-ul Jocului nu este open-source și nu poate fi reprodus sau
                            distribuit fără consimțământul expres al dezvoltatorului.
                        </li>
                        <li className="exo">
                            Frontend-ul este public și disponibil pe GitHub pentru consultare și
                            utilizare în scopuri personale sau educaționale.
                        </li>
                        <li className="exo">
                            Dezvoltatorul poate modifica, suspenda sau întrerupe serviciul fără
                            notificări sau compensații.
                        </li>
                        <li className="exo">
                            Termenii pot fi actualizați cu notificarea utilizatorilor activi.
                        </li>
                    </ul>
                </Section>

                <Section title="6. Limitarea răspunderii">
                    <ul>
                        <li className="exo">
                            Jocul este oferit „ca atare”, fără garanții explicite sau implicite.
                        </li>
                        <li className="exo">
                            Dezvoltatorul nu răspunde pentru erori tehnice, pierderi de date sau
                            utilizare incorectă a aplicației.
                        </li>
                        <li className="exo">
                            Utilizatorul este responsabil pentru securitatea propriului cont.
                        </li>
                    </ul>
                </Section>

                <Section title="7. Reguli privind minorii">
                    <ul>
                        <li className="exo">
                            Jocul este potrivit pentru toate vârstele și nu conține conținut
                            inadecvat.
                        </li>
                        <li className="exo">
                            Minorii sub 14 ani sunt încurajați să fie supravegheați de părinți sau
                            tutori legali.
                        </li>
                        <li className="exo">
                            Prin crearea unui cont, se consideră că tutorele legal și-a dat
                            consimțământul pentru utilizarea Jocului.
                        </li>
                    </ul>
                </Section>

                <Section title="8. Monetizare și modificări viitoare">
                    <ul>
                        <li className="exo">Jocul este gratuit în prezent.</li>
                        <li className="exo">
                            Pot fi introduse în viitor funcții contra cost, reclame sau
                            micro-tranzacții.
                        </li>
                        <li className="exo">
                            Orice modificare va fi comunicată prin aplicație și/sau e-mail.
                        </li>
                    </ul>
                </Section>

                <Section title="9. Suspendarea și blocarea conturilor">
                    <ul>
                        <li className="exo">
                            Conturile pot fi suspendate în caz de: utilizare automată (boturi),
                            tentative de compromitere, sau alte încălcări ale Termenilor.
                        </li>
                    </ul>
                </Section>

                <Section title="10. Legea aplicabilă și jurisdicția">
                    <ul>
                        <li className="exo">Acești Termeni sunt guvernați de legea din România.</li>
                        <li className="exo">
                            Orice litigiu va fi soluționat amiabil sau, în caz contrar, de
                            instanțele competente din România.
                        </li>
                    </ul>
                </Section>

                <Section title="11. Contact">
                    <p className="exo">Pentru întrebări sau cereri privind datele personale:</p>
                    <p className="exo">
                        Email: <strong className="exo">contact@ghicestecuvantul.ro</strong>
                    </p>
                </Section>

                <Section title="12. Cod sursă și licențiere">
                    <p className="exo">
                        Frontend-ul aplicației „Ghicește Cuvântul” este disponibil public pe Git
                    </p>
                    <p className="exo">
                        Codul backend este proprietar și nu este disponibil public.
                    </p>
                    <p className="exo">
                        Este interzisă reproducerea, distribuirea sau modificarea fără permisiunea
                        expresă a dezvoltatorului.
                    </p>
                </Section>

                <Section title="13. Acceptarea termenilor">
                    <p className="exo">
                        Prin continuarea utilizării aplicației „Ghicește Cuvântul”, utilizatorul
                        confirmă că a citit, înțeles și acceptat acești Termeni și Condiții.
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

export default TermsAndConditions;
