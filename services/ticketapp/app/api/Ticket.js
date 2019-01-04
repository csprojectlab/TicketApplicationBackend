const axios = require('axios')
const {api_url} = require('./../../config')
const api = {}

api.getTickets = () => async (request, response) => {
    let ticket_data = null;   
    try {
        if(request.params.userId) {
            const {userId} = request.params;
            if(request.body.start && request.body.pageSize) {
                const {data} = await axios.post(`${api_url}tickets/user/${userId}/paginated`, 
                                    { start: request.body.start, pageSize: request.body.pageSize })
                ticket_data = data;
            } else {
                const {data} = await axios.get(`${api_url}tickets/user/${userId}`)  
                ticket_data = data;          
            }                
        } else {
            if(request.body.start && request.body.pageSize) {
                const {data} = await axios.post(`${api_url}tickets/paginated`, 
                                    { start: request.body.start, pageSize: request.body.pageSize })
                ticket_data = data;
            } else {
                const {data} = await axios.get(`${api_url}tickets`)
                ticket_data = data;
            }
        }
        response.status(200).json(ticket_data)
    } catch (error) {
        response.status(400).json({message: error})
    }
}

api.addTicket = () => async (request, response) => {
    const {userId, type, priority, message, status, raisedBy} = request.body;
    if(!userId || !type || !priority || !message || !status || !raisedBy) {
        return response.status(400).json({message: "TICKET INFORMATION IS NOT COMPLETE."})
    }
    try {
        const {data} = await axios.post(`${api_url}tickets/addticket`, {
            userId: userId, type: type, priority: priority, message: message, status: status, raisedBy: raisedBy
        })
        response.status(200).json(data)
    } catch (error) {
        response.status(400).json({message: error})
    }
}

api.getNumberOfTickets = () => async (request, response) => {
    try {
        if(request.params.userId) {
            const {data} = await axios.get(`${api_url}tickets/user/${request.params.userId}/count`)
            response.status(200).json(data);
        } else {
            const {data} = await axios.get(`${api_url}tickets/count`)
            response.status(200).json(data);
        }
    } catch (error) {
        response.status(400).json({message: error})
    }
}

api.assignTicket = () => async (request, response) => {
    const {ownedBy, ticketId} = request.body;
    if(!ownedBy || !ticketId) {
        return response.status(400).json({message: "COMPLETE INFORMATION NOT PROVIDED."})
    }
    try {
        const {data} = await axios.post(`${api_url}tickets/assignticket`, { ownedBy: ownedBy, ticketId: ticketId})
        response.status(200).json(data);
    } catch (error) {
        response.status(400).json({message: error})
    }
}

module.exports = api;