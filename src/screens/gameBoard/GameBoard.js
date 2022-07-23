import { useEffect, useState } from 'react';
import { get } from 'lodash';
import './GameBoard.css';
import Button from '../../components/funcComponents/ui/button/Button';
import TextComponent from '../../components/funcComponents/ui/textComponent/TextComponent';

import rock from '../../assets/images/rock.png';
import paper from '../../assets/images/paper.png';
import scissors from '../../assets/images/scissors.png';

import loopAudio from '../../assets/audio/arcade_game_loop.mp3';

const GameBoard = (props) => {

    const [playerScore, setPlayerScore] = useState(0);
    const [cpuScore, setCpuScore] = useState(0);

    const [playerChoice, setPlayerChoice] = useState('');
    const [cpuChoice, setCpuChoice] = useState('');
    const [draw, setDraw] = useState('');


    const [playerShake, setPlayerShake] = useState('');
    const [cpuShake, setCpuShake] = useState('');

    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        const player = get(props.location, 'state', false);

        if(!player) {
            props.history.push('/');
        }

    }, [])

    let imgObj = {
        rock: rock,
        paper: paper,
        scissors: scissors
    }

    let winner = '';
    let cpuArray = ['rock', 'paper', 'scissors']


    const getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const pickWinner = (player, cpu, userChoice, iaChoice) => {
        let objRules = {
            paper: {
                rock: player,
                scissors: cpu,
                paper: "draw",
            },
            rock: {
                scissors: player,
                paper: cpu,
                rock: "draw",
            },
            scissors: {
                paper: player,
                rock: cpu,
                scissors: "draw",
            },
        }
        return objRules[userChoice][iaChoice]
    }


    const handleBtnClick = (e) => {
        if (disabled) {
            return;
        }

        setDisabled(true);
        setDraw('')
        setPlayerChoice('rock');
        setCpuChoice('rock');

        //assegna classe con animazione che dura 3 secondi
        setPlayerShake('playerClassAnimation');
        setCpuShake('cpuClassAnimation');

        let iaChoice = cpuArray[getRndInteger(0, 2)];
        let userChoice = e.target.name;

        let roundWinner = pickWinner(props.location.state, 'CPU', userChoice, iaChoice);

        /* --- TIMEOUT --- */
        setTimeout(() => {
            setPlayerChoice(userChoice);
            setCpuChoice(iaChoice);
            let localPlayerScore = null;
            let localCpuScore = null;

            setPlayerShake('');
            setCpuShake('');

            if (roundWinner === props.location.state) {
                localPlayerScore = playerScore + 1
                setPlayerScore(playerScore + 1);
            }
            else if (roundWinner === 'CPU') {
                localCpuScore = cpuScore + 1
                setCpuScore(cpuScore + 1);
            }
            else {
                setDraw(roundWinner);
            }

            if (localPlayerScore === 2) {
                winner = props.location.state
                let storage = JSON.parse(localStorage.getItem('playersList'));

                storage[winner] = storage[winner] + 1
                localStorage.setItem('playersList', JSON.stringify(storage));

                setTimeout(() => { goToWinnerPage() }, 2050);
            }
            else if (localCpuScore === 2) {
                winner = 'CPU'
                setTimeout(() => { goToWinnerPage() }, 2050);

            } else {
                setDisabled(false);
            }

        }, 2000);
    }

    const goToWinnerPage = () => {
        props.history.push({
            pathname: "/winner",
            player: props.location.state,
            winner: winner,
        });
    }

    return (
        <div className='layout-wrapper'>
           
            <audio autoPlay loop>
                <source src={loopAudio} type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>            

            <div className='fight-table'>
                <div className='left box'>
                    <TextComponent
                        HTMLtag='h5'
                        cssClass='score'
                        text={props.location.state}
                    />
                    <TextComponent
                        HTMLtag='h5'
                        cssClass='score'
                        text={playerScore}
                    />
                    <img className={playerShake} src={playerChoice === '' ? imgObj['rock'] : imgObj[playerChoice]} alt="player hand" />
                </div>

                <TextComponent
                    HTMLtag='span'
                    cssClass='draw-style'
                    text={draw}
                />

                <div className='right box'>
                    <TextComponent
                        HTMLtag='h5'
                        cssClass='score'
                        text='CPU'
                    />
                    <TextComponent
                        HTMLtag='h5'
                        cssClass='score'
                        text={cpuScore}
                    />
                    <img className={cpuShake} src={cpuChoice === '' ? imgObj['rock'] : imgObj[cpuChoice]} alt="cpu hand" />
                </div>
            </div>


            <div className='containerBtnPlayerChoice'>
                <Button
                    btnText='rock'
                    cssClass='player-choice'
                    callback={handleBtnClick}
                    btnName='rock'
                />
                <Button

                    btnText='paper'
                    cssClass='player-choice'
                    callback={handleBtnClick}
                    btnName='paper'
                />
                <Button
                    btnText='scissors'
                    cssClass='player-choice'
                    callback={handleBtnClick}
                    btnName='scissors'
                />
            </div>
        </div>
    )
}

export default GameBoard;