
//Componente hijo Square
export default function Square({ index, isSelected, children, updateBoard }) {
    const className = `square ${isSelected ? 'is-selected' : ''}`
    return (<div onClick={() => {
        updateBoard(index)
    }} className={className}>{children}
    </div>)
}
