import './Welcome.css';

import TextComponent from '../../components/funcComponents/ui/textComponent/TextComponent';
import InputBox from '../../components/funcComponents/ui/inputBox/InputBox';
import Button from '../../components/funcComponents/ui/button/Button';

import { useState } from 'react';

const Welcome = (props) => {

    const [userInput, setUserInput] = useState('');

    const handleInputChange = (e) => {
        setUserInput(e.target.value.trim());
    }

    const handleButtonClick = () => {
        let storage = localStorage.getItem('playersList');

        if (userInput) {
            if (storage === null) {
                localStorage.setItem('playersList', JSON.stringify({[userInput] : 0}));
            }
            else{
                storage = JSON.parse(localStorage.getItem('playersList'))
                if (!(userInput in storage)) {
                    storage = {
                        ...storage,
                        [userInput] : 0
                    }
                    localStorage.setItem('playersList', JSON.stringify(storage))
                }
            }
            goToGameBoard();
        }
    }

    const goToGameBoard = () => {
        props.history.push({
            pathname: "/game-board",
            state: userInput,
        });
    }

    return(
        <div className='layout-wrapper'>
            
            <TextComponent cssClass='text' HTMLtag="h1" text="Rock, paper, scissor" />               
            <TextComponent cssClass='text'  HTMLtag="h3" text="" />               
            <InputBox 
                type="text"
                callback={handleInputChange}
                placeholder="Insert username"
                cssClass='insert-name'
            />      
            <Button
                callback={handleButtonClick}
                btnText="Start Game"
                cssClass="btn-welcome"
            />      
        </div>
    )
}

export default Welcome;