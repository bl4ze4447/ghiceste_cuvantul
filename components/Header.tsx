import Image from 'next/image';
import romanianFlag from '../public/romanian_flag.png';

const Header = () => {
    return (
        <header style={{display: 'flex', textAlign: "center", alignItems: 'center', marginLeft: 'auto', marginRight: 'auto'}} className="header">
            <Image src={romanianFlag} width={60} height={60} style={{marginRight: '-40px', zIndex: '10', marginTop: '15px', rotate: 'Z -20deg'}} alt='Steagul României'/>
            <div>
                <h2 style={{fontSize: '23px', zIndex: '20', marginBottom: '-3px', marginTop: '20px', textAlign: 'center'}}>Ghicește</h2>
                <h2 style={{textDecoration: 'none', fontSize:'30px', textAlign: 'center'}}><span> </span>
                <span className="text-blue">cuv</span>
                <span className="text-yellow">ân</span>
                <span className="text-red">tul</span></h2>
            </div>
        </header>
    )
}

export default Header;