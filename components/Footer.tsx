import './styles/Footer.css';

import { FaHeart, FaGithub, FaDiscord } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className="footer">
            <p
                className="made-by no-hover"
                style={{ marginBottom: '5px', marginTop: '25px', textAlign: 'center' }}
            >
                Realizat cu{' '}
                <FaHeart className="no-hover" style={{ color: 'red', fontSize: '1rem' }} /> de către
                Belu Antonie-Gabriel
            </p>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0',
                    marginBottom: '-5px',
                    textAlign: 'center',
                }}
            >
                <FaGithub style={{ fontSize: '1.6rem', color: 'white', margin: '0 10px 0 0' }} />
                <a
                    className="made-by"
                    rel="noreferrer"
                    target="_blank"
                    href="https://github.com/bl4ze4447"
                >
                    bl4ze4447
                </a>
                <p
                    className="made-by"
                    style={{ marginLeft: '10px', marginRight: '10px', fontSize: '1.2rem' }}
                >
                    {' '}
                    <span className="made-by">|</span>{' '}
                </p>
                <FaDiscord
                    aria-hidden="true"
                    style={{ fontSize: '1.6rem', color: 'white', margin: '0 10px 0 0' }}
                />
                <p className="made-by no-hover">bl4ze4447</p>
            </div>
        </footer>
    );
};

export default Footer;
