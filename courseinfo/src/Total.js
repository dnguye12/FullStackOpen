const Total = (props) => {
    let sum = 0;
    props.parts.map(p => sum = sum + p.exercises);
    return (
        
        <p>Number of exercises {sum}</p>
    )
}

export default Total