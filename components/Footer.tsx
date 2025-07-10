import './styles/Footer.css';

import { FaHeart, FaGithub } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className="footer">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0',
                    marginTop: '25px',
                    marginBottom: '5px',
                    textAlign: 'center',
                }}
            >
                <FaGithub style={{ fontSize: '1.6rem', color: 'white', margin: '0 10px 0 0' }} />
                <i>
                    <a
                        className="exo"
                        rel="noreferrer"
                        target="_blank"
                        href="https://github.com/bl4ze4447"
                        style={{ fontSize: '0.8rem' }}
                    >
                        bl4ze4447
                    </a>
                </i>
            </div>
            <p className="made-by no-hover" style={{ marginBottom: '5px', textAlign: 'center' }}>
                Realizat cu
                <FaHeart
                    className="no-hover"
                    style={{ color: '#cf3030', fontSize: '1rem', marginLeft: '5px' }}
                />{' '}
                de către Belu Antonie-Gabriel
            </p>
        </footer>
    );
};

export default Footer;
