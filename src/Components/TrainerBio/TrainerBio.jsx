import './TrainerBio.scss';
import { useEffect } from 'react';

function TrainerBio({ closeModal }) {

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
            <div className='trainer-overlay'>
                <div className='trainer-content'>
                    <div className='trainer-container'>
                        <div className='trainer-titleWrapper'>
                            <h1 className='trainer-title'>About The Trainer..</h1>
                            <button className='modal-closeButton' onClick={closeModal}>X</button>
                        </div>
                        <div className='trainer-bioWrapper'>
                            <img className='trainer-avatar' src='assets/bryanavatar.jpg' alt='Bryan' />
                            <p className='trainer-bio'>Bryan Douglas began his adventure into learning web development and software
                                engineering at the start of 2023, and what an adventure it's been! Within a few months he learned
                                <span className='bio-highlight'> HTML5, CSS, JavaScript, SCSS, Node.js, React.js, Express, MySQL, Postman </span>
                                and many more frameworks and useful things! With the attitude of loving to learn
                                new things, he will only continue to grow his tech repertoire.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrainerBio