import Show from "./Show"
import service from "./Service"
import { useState, useEffect } from "react"

const View = (props) => {

    const handleShow = (event) => {
        event.preventDefault()
        console.log(event.target.id)
        props.setName(event.target.id)
    }

    if (props.name === '') {
        return (
            <div>
                Please enter country name
            </div>
        )
    }

    else {
        const [countries, setCountries] = useState([])
        const hook = () => {
            service
              .getAll()
              .then(response => {setCountries(response.data)})
        }
        useEffect(hook,[])
        
        const filteredCountries = countries.filter(country => country?.name.common.toLowerCase().includes(props.name))
        
        if (filteredCountries.length === 0) {
            return (
                <div>
                    No countries found
                </div>
            )
        }
        else if (filteredCountries.length === 1) {
            return (
                <div>
                    <Show name={filteredCountries[0].name.common.toLowerCase()} />
                </div>
            )
        } 
        else {
            console.log(filteredCountries)
            return (        
                <div>
                    <ul style={{listStyle: 'none'}}>
                        {filteredCountries.map(country => (<li key={country?.name.common.toLowerCase()}> {country?.name.common} <button type="submit" onClick={handleShow} id={country?.name.common.toLowerCase()}> show</button></li>))}
                    </ul>
                </div>
            )
        } 
    }
}


export default View