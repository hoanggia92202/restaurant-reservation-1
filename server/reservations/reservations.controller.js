const service = require("./reservations.service");

async function read(req, res) {
    const result = await service.read();
    res.status(200).json({data: result});
}

module.exports = {
    read
};
