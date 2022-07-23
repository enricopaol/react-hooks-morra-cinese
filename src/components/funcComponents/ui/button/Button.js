import '../button/Button.css'

import audioClick from '../../../../assets/audio/wet_click.wav';
const wetClick = new Audio(audioClick);

const Button = (props) => {

    const handleCallback = (e) => {
        wetClick.play();
        props.callback(e);
    }

    return(
        <button             
            onClick={handleCallback}            
            className={`btn ${props.cssClass}`}
            name={props.btnName}
            disabled={props.btnDisable}
            style={{pointerEvents : props.btnPointerEvents}}
        >
            {props.btnText}
        </button>
    )
}

export default Button;