import '../leaderBoard/LeaderBoard.css'
const LeaderBoard = () => {

    let storage = JSON.parse(localStorage.getItem('playersList'));
    let leaderBoardArray = [];
    for (const player in storage) {
        leaderBoardArray.push([player, storage[player]])
    }
    leaderBoardArray.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

    return (
        <>
            <h2 className='leaderBoardsTitleStyle'>CLASSIFICA</h2>
            <ul className='leaderBoardsStyle'>
                {
                    leaderBoardArray.map((item, index) => {
                        return (
                            <li key={index} className='listStyle'>
                                <span>{item[0]}</span>
                                <span>{item[1]}</span>
                            </li>

                        )
                    })
                }

            </ul>
        </>
    );
}

export default LeaderBoard;