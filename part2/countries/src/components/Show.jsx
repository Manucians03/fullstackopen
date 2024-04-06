import service from "./Service"
import { useState, useEffect } from "react"

const Show = (props) => {

    const [data, setData] = useState(null)

    const hook = () => {
        service
          .getName(props.name)
          .then(response => {setData(response.data)})
    }
    useEffect(hook,[])
    console.log(data)

    if (data === null) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    else {
        return (        
            <div>
                <h1> {data.name?.common} </h1>
                <p> Capital: {data?.capital} </p>
                <p> Area: {data?.area} </p>         
                <div style={{fontSize: 200}}>
                    {data?.flag}
                </div>
                <div> 
                    <> Languages: </>
                    <ul>
                        { Object.values(data?.languages).map((value, id) => (<li key={id}> {value}</li>))}
                    </ul>
                </div> 
            </div>
        )
    }
}

export default Show