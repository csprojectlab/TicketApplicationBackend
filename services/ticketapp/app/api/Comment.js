const axios = require('axios')
const {api_url} = require('./../../config')
const api = {}

api.getComments = () => async (request, response) => {
    const {ticketId} = request.params;
    try {
        const {data} = await axios.get(`${api_url}tickets/${ticketId}/comments`)
        response.status(200).json(data)
    } catch (error) {
        response.status(400).json({message: error})
    }
}

api.addComment = () => async (request, response) => {
    const {author, ticketId, comment} = request.body;
    if(!author || !ticketId || !comment) 
        return response.status(400).json({message: "COMPLETE COMMENT INFORMATION MISSING"})
    try {
        const {data} = await axios.post(`${api_url}tickets/addcomment`, {
            author: author, ticketId: ticketId, comment: comment
        })
        response.status(200).json(data);
    } catch (error) {
        response.status(400).json({message: error})
    }
}

module.exports = api;