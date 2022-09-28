import { useEffect } from 'react'

function useFetch(url) {
    useEffect(() => {
        fetch(url)
        .then(function(response) {return response.json()})
        .then(function(data) {return data['iss_position']['longitude']})
    })
}

export default useFetch