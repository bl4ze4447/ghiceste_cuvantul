import './styles/Recaptcha.css';

function Recaptcha() {
    return (
        <div className="recaptcha-container">
            <small>
                This site is protected by reCAPTCHA and the Google<span> </span>
                <a href="https://policies.google.com/privacy">Privacy Policy</a> and <span> </span>
                <a href="https://policies.google.com/terms">Terms of Service</a> apply.
            </small>
        </div>
    );
}

export default Recaptcha;
