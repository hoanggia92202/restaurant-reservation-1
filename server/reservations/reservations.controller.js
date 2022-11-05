const service = require("./reservations.service");

async function readByDate(req, res) {
    const { date } = req.query;
    const result = await service.readByDate(date);
    res.status(200).json({data: result});
}

async function create(req,res) {
    const { data } = req.body;
    const result = await service.create(data);
    res.status(201).json({data: result});
}

module.exports = {
    readByDate,
    create
};
