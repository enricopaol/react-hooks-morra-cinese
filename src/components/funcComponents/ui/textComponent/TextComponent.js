import './TextComponent.css';

const TextComponent = (props) => {
    return(
        <props.HTMLtag
            className={props.cssClass}
        >
            {props.text}
        </props.HTMLtag>
    );
}

export default TextComponent;