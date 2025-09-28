import './style.css';
import Link from 'next/link';

interface TermsCheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ checked, onChange }) => {
    return (
        <section className="terms-checkbox-container">
            <div
                className="terms-checkbox"
                style={{ backgroundColor: checked ? '#3e3e3e' : 'transparent' }}
                onClick={() => onChange(!checked)}
                role="checkbox"
                aria-checked={checked}
                tabIndex={0}
            >
                <span
                    className="terms-checkmark"
                    style={{ visibility: checked ? 'visible' : 'hidden' }}
                >
                    &#10003;
                </span>
            </div>
            <div className="exo">
                Sunt de acord cu <Link href="/termeni-si-conditii">termenii și condițiile</Link> și
                cu <Link href="/politica-de-confidentialitate">politica de confidențialitate</Link>
            </div>
        </section>
    );
};

export default TermsCheckbox;
