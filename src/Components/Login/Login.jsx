import './Login.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Login({ closeModal }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Checks if there's a token, if there is, check it's validity and fetch the profile
        const authToken = sessionStorage.getItem('clientAuthToken');
        fetchProfile(authToken)
    }, []);

    // Fetches the profile using the stored token in session storage
    const fetchProfile = (token) => {
        axios.get('http://localhost:3001/api/logins', {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(response => {
            setProfileData(response.data);
            setIsLoggedIn(true);
        }).catch((err) => console.log('profile error', err.response.data))
    };

    // Submits the form and stashes the stored token
    const handleSubmit = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        axios.post('http://localhost:3001/api/register', {
            username: username,
            password: password
        }).then(response => {
            sessionStorage.setItem('clientAuthToken', response.data.token);
            fetchProfile(response.data.token);
        })
            .catch((err) => console.log('profile error', err.response.data))
    };

    const handleLogout = () => {
        sessionStorage.removeItem('clientAuthToken');
        setIsLoggedIn(false);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [closeModal]);

    return (
        <>
            <div className='submit-score__overlay'>
                <div className='submit-score__content'>
                    <div className='submit-score__container'>
                        <div className='button-container'>
                            <button className='modal-closeButton' onClick={closeModal}>X</button>
                        </div>
                        {!isLoggedIn &&
                            <form onSubmit={handleSubmit}>
                                <input
                                    className='submit-score__input'
                                    type='text'
                                    placeholder='Who are you?'
                                    name='username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <input
                                    className='submit-score__input'
                                    type='password'
                                    placeholder='What is the password?'
                                    name='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button className='submit-score__button' type='submit'>Submit Score</button>
                            </form>
                        }
                        {isLoggedIn &&
                            <>
                                <p>Welcome, {profileData.username}!</p>
                                <button className='submit-login__button' type='submit' onClick={handleLogout}>Logout</button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login