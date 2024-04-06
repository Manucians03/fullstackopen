import axios from 'axios'
import { useEffect } from 'react'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = () => {
  return axios.get(`${baseUrl}/all`)
}

const getName = (name) => {
  return axios.get(`${baseUrl}/name/${name}`)
}

export default { 
  getAll: getAll, 
  getName: getName
}