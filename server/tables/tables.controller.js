const service = require("./tables.service");

/** list all tables **/
const read = async (req, res) => {
    const result = await service.read();
    res.status(200).json({data: result});
}

/** create a new table **/
const create = async (req, res) => {
    const { data } = req.body;
    const result = await service.create(data);
    res.status(201).json({data: result}); 
  };

  module.exports = {
    read,
    create
  };
  