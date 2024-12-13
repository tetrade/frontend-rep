import axios from "@/API/axios.js"

let hits = []

export const fetchHit = async function () {
    try{
        const response = await axios.get('/goods/hit', {withCredentials: true});
        hits = response.data
        console.log(hits)
        return hits
    }catch(err){
        console.log(err)
    }
}