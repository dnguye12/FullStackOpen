import StatisticLine from "./StatisticLine";

const Statistics = ({good, neutral, bad}) => {
    const getCount = () => good + neutral + bad;
    const getAvg = () => (good - bad) / getCount();
    return (
        <div>
            <h1>Statistics</h1>
            {
                getCount() === 0 
                ?
                <p>No feedback given</p>
                :
                <div>
                    <StatisticLine text="Good"  value={good}/>
                    <StatisticLine text="Neutral"  value={neutral}/>
                    <StatisticLine text="Bad"  value={bad}/>
                    <StatisticLine text="Total count"  value={getCount()}/>
                    <StatisticLine text="Average Rating"  value={getAvg()}/>
                    <StatisticLine text="Positive"  value={(good / getCount() * 100).toFixed(2)+"%"}/>
                </div>
            }
        </div>
    )
}

export default Statistics