import './WinnerPage.css';
import { useEffect } from 'react';
import { get } from 'lodash';

import Button from '../../components/funcComponents/ui/button/Button';
import TextComponent from '../../components/funcComponents/ui/textComponent/TextComponent';
import LeaderBoard from '../../components/funcComponents/leaderBoard/LeaderBoard.jsx';

// Audios
import winGameAudio from '../../assets/audio/win_game.wav';
import gameOverAudio from '../../assets/audio/game_over.wav';
var winGame = new Audio(winGameAudio);
var gameOver = new Audio(gameOverAudio);


const WinnerPage = (props) => {

    const goToChosenPage = (e) => {
        props.history.push({
            pathname: `/${e.target.name}`,
            state: e.target.name ? props.location.player : '',
        });
    }

   useEffect(() => {
        
    const player = get(props.location, 'player', false);
    const winner = get(props.location, 'winner', false);

    if(!player || !winner) {
        props.history.push('/');
    } else {
        if(props.location.winner !== 'CPU') {
            winGame.play();
        } else {
            gameOver.play();
        }
    }
   }, []);

    return (
        <div className='layout-wrapper'>

            <TextComponent
                HTMLtag='h2'
                text='Winner'
                cssClass='winner-text'
            />
            <TextComponent
                HTMLtag='h3'
                text={`${props.location.winner}`}
                cssClass='winner-text name'
            />

            <div className='btn-wrapper'>
                <Button
                    btnText='Play Again'
                    cssClass='player-choice'
                    callback={goToChosenPage}
                    btnName='game-board'
                />
                <Button
                    btnText='Change Player'
                    cssClass='player-choice'
                    callback={goToChosenPage}
                    //btnName lasciato vuoto per poter tornare alla home
                    btnName=''
                />
            </div>

            <LeaderBoard />
        </div>
    )
}

export default WinnerPage;