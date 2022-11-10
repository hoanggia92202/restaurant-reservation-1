const service = require("./tables.service");

/** create a new table **/
const create = async (req, res) => {
    const { data } = req.body;
    const result = await service.create(data);
    res.status(201).json({data: result}); 
  };

  module.exports = {
    create
  };
  