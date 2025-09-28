import './style.css';
import { ModalAnswer } from '@/constants/constants';
import { TextField } from '@mui/material';
import { IoClose } from 'react-icons/io5';

interface ConfirmModalProps {
    action: string;
    positiveMessage: string;
    negativeMessage?: string;
    invertColors: boolean;
    visible: boolean;
    email: string;
    password: string;
    setModalResult: React.Dispatch<React.SetStateAction<ModalAnswer | null>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    action,
    setModalResult,
    invertColors = false,
    positiveMessage = 'Acceptă',
    negativeMessage = 'Anulează',
    email,
    setEmail,
    password,
    setPassword,
    visible,
    setVisible,
}) => {
    return (
        <section
            className={`modal-overlay ${visible ? 'fade-in' : 'fade-out'}`}
            role="dialog"
            aria-modal="true"
            onClick={() => {
                setModalResult(ModalAnswer.NO);
                setVisible(false);
            }}
        >
            <div className="modal confirm-modal" onClick={(e) => e.stopPropagation()}>
                <button
                    className="close-button"
                    onClick={() => {
                        setModalResult(ModalAnswer.NO);
                        setVisible(false);
                    }}
                    aria-label="Închide fereastra"
                >
                    <IoClose />
                </button>

                <h1 className="cm-action">{action}</h1>
                <p className="cm-p-credentials">
                    Dacă doriți să continuați, este necesară introducerea credențialelor!
                </p>

                <TextField
                    className="google-inputs"
                    label="Email"
                    type="email"
                    variant="outlined"
                    value={email}
                    onChange={(ev) => {
                        setEmail(ev.target.value);
                    }}
                    sx={{
                        width: '25ch',
                        input: { color: 'white' },
                        label: {
                            color: 'rgba(255,255,255,0.7)',
                            '&.Mui-focused': {
                                color: 'white',
                            },
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'rgba(255,255,255,0.7)',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                        },
                    }}
                />

                <div style={{ marginBottom: '10px' }}></div>

                <TextField
                    className="google-inputs"
                    label="Parolă"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(ev) => {
                        setPassword(ev.target.value);
                    }}
                    sx={{
                        width: '25ch',
                        input: { color: 'white' },
                        label: {
                            color: 'rgba(255,255,255,0.7)',
                            '&.Mui-focused': {
                                color: 'white',
                            },
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'rgba(255,255,255,0.7)',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                        },
                    }}
                />

                <div className="modal-answers-container">
                    <button
                        className={`confirm-button ${invertColors ? 'ma-gray' : 'ma-red'}`}
                        style={{ marginRight: '10px' }}
                        onClick={() => {
                            setModalResult(ModalAnswer.NO);
                            setVisible(false);
                        }}
                    >
                        {negativeMessage}
                    </button>
                    <button
                        className={`confirm-button ${invertColors ? 'ma-red' : 'ma-gray'}`}
                        onClick={() => setModalResult(ModalAnswer.YES)}
                    >
                        {positiveMessage}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ConfirmModal;
