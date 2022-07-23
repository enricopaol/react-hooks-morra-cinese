import '../inputBox/InputBox.css';

const InputBox = (props) => {

    const handleCallback = (e) => {
        props.callback(e);
    }

    return(
        <input 
            type={props.type} 
            onChange={handleCallback}
            placeholder={props.placeholder}
            className={props.cssClass}
        />
    )
}

export default InputBox;