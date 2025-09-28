'use client';

import './style.css';

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

    return (
        <section
            className={`notification-section ${
                shouldRender ? 'notification-section-render' : 'notification-section-no-render'
            }`}
        >
            <div className="notification-header-container">
                <h4 className="notification-title">{internalContent.title}</h4>
                <button onClick={onClose} className="close-button" aria-label="Închide notificare">
                    <IoClose className="close-button-ico" />
                </button>
            </div>
            <p className="notification-description">{internalContent.description}</p>
        </section>
    );
};

export default Notification;
