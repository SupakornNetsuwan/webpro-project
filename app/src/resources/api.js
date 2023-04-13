import axios from 'axios';

//collect all api

function getPosts(){
    axios.get("http://localhost:3001/api/summaries")
}