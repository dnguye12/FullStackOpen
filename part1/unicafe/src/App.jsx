import { useState } from 'react'

const Button = ({ text, state, setState }) => {
  return (
    <button onClick={() => { setState(state + 1) }}>{text}</button>
  )
}

const Feedback = ({ good, setGood, neutral, setNeutral, bad, setBad }) => {
  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <Button text={"good"} state={good} setState={setGood} />
        <Button text={"neutral"} state={neutral} setState={setNeutral} />
        <Button text={"bad"} state={bad} setState={setBad} />
      </div>
    </div>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const avg = (1.0 * good - 1.0 * bad) / total
  return (
    <div>
      <h2>statistics</h2>
      {
        total === 0
          ?
          <p>No feedback given</p>
          :
          <table>
            <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={total} />
            <StatisticLine text="average" value={total === 0 ? 0 : avg.toFixed(2)} />
            <StatisticLine text="positive" value={total === 0 ? "0.00%" : `${(1.0 * good / total * 100.0).toFixed(2)}%`} />
            </tbody>
           </table>
      }
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback good={good} setGood={setGood} neutral={neutral} setNeutral={setNeutral} bad={bad} setBad={setBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App