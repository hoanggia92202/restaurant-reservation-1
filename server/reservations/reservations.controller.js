const service = require("./reservations.service");

async function readByDate(req, res) {
    const { date } = req.query;
    const result = await service.readByDate(date);
    res.status(200).json({data: result});
}

module.exports = {
    readByDate
};
