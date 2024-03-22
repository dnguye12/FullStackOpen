const Header = ({ name }) => {
    return (
        <h2>{name}</h2>
    )
}

const Part = ({name, exercises}) => {
    return (
        <p>{name} {exercises}</p>
    )
}

const Content = ({parts}) => {
    return (
        parts.map(p => <Part key={p.id} name={p.name} exercises={p.exercises}/>)
    )
}

const Total = ({parts}) => {
    return (
        <b>total of {parts.reduce((acc, p) => acc + p.exercises, 0)} exercises</b>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course