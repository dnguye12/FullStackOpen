const Total = ({parts}) => {
    let sum = parts.reduce( (s, p) => s + p.exercises, 0 );
    return (  
        <b>Total of {sum} exercises</b>
    )
}

export default Total