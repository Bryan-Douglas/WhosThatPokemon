import './Header.scss';
import { useNavigate } from 'react-router-dom';

function Header() {

    const navigate = useNavigate();

    function homeClick() {
        navigate('/')
    }


    return (
        <>
            <div className='header-container'>
                <img className='header-logo' src='assets/whosthatpokemonlogo.png' alt='who is that pokemon? logo' onClick={homeClick} />
            </div>
        </>
    );
}

export default Header;