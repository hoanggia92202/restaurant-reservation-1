const service = require("./reservations.service");

async function read(req, res) {
    const { date, mobile_number } = req.query;

    if(date){
        const result = await service.readByDate(date);
        res.status(200).json({data: result});
    }else if(mobile_number){
        const result = await service.readByMobileNumber(mobile_number);
        res.status(200).json({data: result});
    }
}

async function create(req, res) {
    const { data } = req.body;
    const result = await service.create(data);
    res.status(201).json({data: result});
}

async function update(req, res) {
    const { data } = req.body;

    if(data.status === "cancelled"){
        const { id } = req.params;
        const result = await service.cancelReservation(id);
        res.sendStatus(204);
    }
}

module.exports = {
    read,
    create,
    update
};
