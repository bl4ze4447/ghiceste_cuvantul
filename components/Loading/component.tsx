import './style.css';
import { ThreeDot } from 'react-loading-indicators';

interface LoadingProps {
    topMessage: string;
    bottomMessage: string;
    fullscreen?: boolean;
    size?: 'medium' | 'small' | 'large' | undefined;
}

const Loading: React.FC<LoadingProps> = ({
    topMessage,
    bottomMessage,
    fullscreen = true,
    size = 'medium',
}) => {
    return (
        <section className={`loading-section ${fullscreen && 'loading-section-fullscreen'}`}>
            <ThreeDot
                variant="bounce"
                speedPlus={1}
                color="#ffffff"
                size={size}
                text=""
                textColor=""
            />
            <p className="loading-top-p">{topMessage}</p>
            <p className="loading-bottom-p">{bottomMessage}</p>
        </section>
    );
};

export default Loading;
