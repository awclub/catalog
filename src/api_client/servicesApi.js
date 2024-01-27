import axios from 'axios'
 
export function GetServices (url) {
	return axios.get(url)
}