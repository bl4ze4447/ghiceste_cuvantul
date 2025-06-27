import './styles/Info.css';

interface InfoProps {
    message: string;
    important: string;
    hide: boolean;
    hideText: boolean;
}

const Info: React.FC<InfoProps> = ({ message, important, hide, hideText }) => {
    return (
        <section className="info-div-wrapper">
            <div className={`info-div ${hide ? 'hide' : ''}`}>
                <p className={hideText ? 'hide-text' : ''}>
                    {message} <span className={hideText ? 'hide-text' : ''}>{important}</span>
                </p>
            </div>
        </section>
    );
};

export default Info;
