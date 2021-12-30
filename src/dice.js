export default Dice;

function Dice(props) {
    return (
        <button 
            class={'dice dice' + (props.value) + ' ' + ( props.selected ? 'dice_selected ' : '') + ( props.selectable ? '' : 'dice_not_selectable')}
            onClick={props.handleDiceClick}
        />
    );
}