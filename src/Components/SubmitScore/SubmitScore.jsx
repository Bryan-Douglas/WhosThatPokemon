import './SubmitScore.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

function SubmitScore({ closeModal, scoreToSubmit }) {
    const [name, setName] = useState('');

    const submitScore = async (name) => {
        console.log('Score to submit:', scoreToSubmit);
        console.log('Name:', name);
        try {
            const response = await axios.post('http://localhost:3001/api/submitScore', { name, score: scoreToSubmit });
            console.log('Score submitted successfully:', response.data);
            closeModal();
        } catch (error) {
            console.error('Error submitting score:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await submitScore(name);
    }

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
                        <form className='submit-score__container' onSubmit={handleSubmit}>
                            <input
                                className='submit-score__input'
                                type='text'
                                placeholder='Who are you?'
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                            <button className='submit-score__button' type='submit'>Submit Score</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SubmitScore;