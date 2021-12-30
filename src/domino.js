import { getDominoValue } from "./board.js"

function Domino(props) {
    return (
        <button
            class={'domino ' + (props.current_score === props.value ? "domino_selectable " : "")}
            onClick={props.handleDominoClick}
        >
                {props.value} ({getDominoValue(props.value)})
        </button>
    );
}

export default Domino;

