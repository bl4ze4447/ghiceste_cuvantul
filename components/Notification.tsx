'use client';

import { useEffect, useState, useRef } from 'react';
import { IoClose } from 'react-icons/io5';

interface NotificationProps {
    title: string;
    description: string;
    visible: boolean;
    onClose?: () => void;
    duration?: number;
}

const Notification: React.FC<NotificationProps> = ({
    title,
    description,
    visible,
    onClose,
    duration = 5000,
}) => {
    const [shouldRender, setShouldRender] = useState(false);
    const [internalContent, setInternalContent] = useState({ title, description });
    const prevContent = useRef({ title, description });

    useEffect(() => {
        let showTimeout: NodeJS.Timeout;
        let hideTimeout: NodeJS.Timeout;

        const contentChanged =
            title !== prevContent.current.title || description !== prevContent.current.description;

        if (visible) {
            if (contentChanged) {
                setShouldRender(false);

                setTimeout(() => {
                    setInternalContent({ title, description });
                    setShouldRender(true);
                    prevContent.current = { title, description };
                }, 200);
            } else {
                showTimeout = setTimeout(() => setShouldRender(true), 10);
            }

            hideTimeout = setTimeout(() => {
                setShouldRender(false);
                if (onClose) onClose();
            }, duration);
        }

        if (!visible) {
            setShouldRender(false);
        }

        return () => {
            clearTimeout(showTimeout);
            clearTimeout(hideTimeout);
        };
    }, [visible, title, description, duration, onClose]);

    const containerStyle: React.CSSProperties = {
        position: 'fixed',
        bottom: '20px',
        left: '15px',
        backgroundColor: '#066889',
        color: 'white',
        borderRadius: '15px',
        padding: '15px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        width: '300px',
        zIndex: 9999,
        transform: shouldRender ? 'translateX(0)' : 'translateX(-120%)',
        opacity: shouldRender ? 1 : 0,
        transition: 'transform 0.4s ease, opacity 0.4s ease',
        pointerEvents: shouldRender ? 'auto' : 'none',
    };

    const closeButtonStyle: React.CSSProperties = {
        background: 'none',
        border: 'none',
        color: '#a1a1aa',
        cursor: 'pointer',
        fontSize: '1rem',
        marginTop: '5px',
    };

    return (
        <div style={containerStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <h4 style={{ margin: '0', fontSize: '1.25rem', fontWeight: 600 }}>
                    {internalContent.title}
                </h4>
                <button onClick={onClose} style={closeButtonStyle} aria-label="Închide notificare">
                    <IoClose style={{ color: 'white', fontSize: '1.4rem' }} />
                </button>
            </div>
            <p
                style={{
                    marginTop: '7px',
                    fontSize: '1rem',
                    fontFamily: "'Exo 2', sans-serif",
                    textAlign: 'justify',
                }}
            >
                {internalContent.description}
            </p>
        </div>
    );
};

export default Notification;
