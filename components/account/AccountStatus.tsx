import Recaptcha from "../Recaptcha";

function AccountStatus() {
    return (
        <>
        <div style={{textAlign: 'center'}}>
            <h1>Contul meu</h1>
        </div>
        <section className="account-wrapper">
            <div className="create-account">
                <input type="button" value="Deconectează-te" className="inputs" onClick={() => {}} />
                <div>
                    <h3>Nume:</h3>
                </div>
                <p className="p-account">todo</p>
            </div>
        </section>
        <Recaptcha />
        </>
    );
}

export default AccountStatus;