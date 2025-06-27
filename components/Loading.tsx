import { ThreeDot } from 'react-loading-indicators';

interface LoadingProps {
    topMessage: string;
    bottomMessage: string;
}

const Loading: React.FC<LoadingProps> = ({ topMessage, bottomMessage }) => {
    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                margin: '0 10px',
            }}
        >
            <ThreeDot
                variant="bounce"
                speedPlus={1}
                color="#c6f0ff"
                size="medium"
                text=""
                textColor=""
            />
            <p className="exo" style={{ marginTop: '5px' }}>
                {topMessage}
            </p>
            <p className="exo" style={{ fontWeight: 'bold' }}>
                {bottomMessage}
            </p>
        </div>
    );
};

export default Loading;
