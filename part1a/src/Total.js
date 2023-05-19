const Total = (props) => {
    const sum = props.exercises.reduce((helper, a) => helper + a, 0);
    return (
        
        <p>Number of exercises {sum}</p>
    )
}

export default Total