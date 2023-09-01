import './SubmitScore.scss';
import { useEffect } from 'react';

function SubmitScore({ closeModal }) {

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
                        <input className='submit-score__input' type='text' placeholder='Who are you?'></input>
                        <button className='submit-score__button' type='submit' onClick={closeModal}>Submit Score</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SubmitScore;