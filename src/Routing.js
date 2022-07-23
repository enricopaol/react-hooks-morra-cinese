import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Welcome from './screens/welcome/Welcome';
import GameBoard from './screens/gameBoard/GameBoard';
import WinnerPage from './screens/winnerPage/WinnerPage';

const Routing = (props) => {

    let layoutStyle = {
        width: '100%',
        minHeight: '100vh',
    }

    return (

        <div style={layoutStyle}>        

            <Router>
                <Switch>
                    <Route exact path={'/'} component={Welcome} />
                    <Route path={'/game-board'} component={GameBoard} />
                    <Route path={'/winner'} component={WinnerPage} />
                </Switch>
            </Router>
        </div>


    )
}

export default Routing;