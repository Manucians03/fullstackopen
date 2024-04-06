import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [state, setState] = useState({selected: 0, votes: Array(anecdotes.length).fill(0)})

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[state.selected]}</p> 
      <p>{state.votes[state.selected]} votes</p>
      <Vote state={state} setState={setState} />
      <Next state={state} setState={setState} />
      <Most state={state} anecdotes={anecdotes}/>
    </div>
  )
}

const Next = (props) => {
  const handleClick = () => {
    const length = props.state.votes.length
    const selected = Math.floor(Math.random() * length)
    props.setState({selected: selected, votes: props.state.votes})
  }

  return (<> <button onClick={handleClick}>Next anecdote</button> </>)
}

const Vote = (props) => {
  const handleClick = () => {
    const copy = [...props.state.votes]
    copy[props.state.selected]++
    props.setState({selected: props.state.selected, votes: copy})
  }

  return (<> <button onClick={handleClick}>Vote</button> </>)
}

const Most = (props) => {
  const most = () => {
    let max = 0
    for (let i = 0; i < props.state.votes.length; i++) {
      if (props.state.votes[i] > props.state.votes[max]) {
        max = i
      }
    }
    return max
  }
  
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[most()]}
    </div>
  )
}

export default App

