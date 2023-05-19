import Part from "./Part"
const Content = ({parts}) => {
    return (
        <div>
        { parts.map(p => <Part key={p.id} part={p.name} exercise={p.exercises} />) }
        </div>
    )

}

export default Content