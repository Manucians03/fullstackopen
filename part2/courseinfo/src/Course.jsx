const Course = (props) => (
    <div>
        <Header name={props.course.name} />  
        <Content parts={props.course.parts} />
    </div>
)

const Header = (props) => (
    <h1> {props.name} </h1>
)

const Content = (props) => (
    <div>
        {props.parts.map(part => <Part part={part}/>)}
        <Total parts={props.parts} />
    </div>
)

const Part = (props) => (<p>  {props.part.name} {props.part.exercises} </p>)

const Total = (props) => (<p> Total {props.parts.reduce((acc, part) => acc + part.exercises, 0)}</p>)

export default Course
  