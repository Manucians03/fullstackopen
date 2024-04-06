import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {setGood(good + 1)}
  const handleNeutral = () => {setNeutral(neutral + 1)}
  const handleBad = () => {setBad(bad + 1)}

  return (
    <div>
      <h1>
        Give Feedback
      </h1>
      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleNeutral} text="Neutral" />
      <Button onClick={handleBad} text="Bad" />
      <Statistics good = {good} neutral ={neutral} bad = {bad}/>
    </div>
  )
}

const Statistics = (props) => {
  if (props.good + props.neutral + props.bad === 0) {
    return (
      <div>
        <h1> Statistics </h1>
        No feedback given
      </div>
    )
  }
  else {
    return (
      <div>
        <h1> Statistics </h1>
        <StatisticsLine name="Good" number={props.good} />
        <StatisticsLine name="Neutral" number={props.neutral} />
        <StatisticsLine name="Bad" number={props.bad} />
        <StatisticsLine name="Average" good={props.good} neutral={props.neutral} bad={props.bad} />
        <StatisticsLine name="Positive" good={props.good} neutral={props.neutral} bad={props.bad} />
      </div>
    )
  }
}

const Button = ({ onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticsLine = (props) => {
  if (props.name === "Average") {
    return (
      <p>
        {props.name} {(props.good - props.bad) / (props.good + props.neutral + props.bad)}
      </p>
    )
  }
  else if (props.name === "Positive") {
    return (
      <p>
        {props.name} {100 * props.good / (props.good + props.neutral + props.bad)}%
      </p>
    )
  }
  else {
    return (
      <p>
        {props.name} {props.number}
      </p>
  )
  }
}

export default App