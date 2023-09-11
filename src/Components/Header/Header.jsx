import './Header.scss';
import { useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import { useState } from 'react';

function Header() {

    const navigate = useNavigate();

    const [showLoginModal, setShowLoginModal] = useState(false);

    function homeClick() {
        navigate('/')
    }

    function openLoginModal() {
        setShowLoginModal(true);
    }

    function closeModal() {
        setShowLoginModal(false);
      }



    return (
        <>
            <div className='header-container'>
                <img className='header-logo' src='assets/whosthatpokemonlogo.png' alt='who is that pokemon? logo' onClick={homeClick} />
                {/* <img className='header-login' src='assets/pokeball.svg' alt='login pokeball' onClick={openLoginModal} />
                {showLoginModal && <Login closeModal={closeModal} />} */}
            </div>
        </>
    );
}

export default Header;