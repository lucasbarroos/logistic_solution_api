const ClientModel = require('../../models/Client/index');

const store = async (req, res) => {
  try {
    const client = await ClientModel.create(req.body);
    return res.send(client);
  } catch (err) {
    return res.status(400).send({ message: 'Error to save the client!' });
  }
};

const update = async (req, res) => {
  try {
    const client = await ClientModel
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    return res.send(client);
  } catch (err) {
    return res.status(400).send({ message: 'Error to update the client!' });
  }
};

const show = async (req, res) => {
  try {
    const client = await ClientModel.findById(req.params.id);
    if (!client) {
      return res.status(404).send({ message: 'Client not found!' });
    }
    return res.send(client);
  } catch (err) {
    return res.status(400).send({ message: 'Error to get the client!' });
  }
};

const index = async (req, res) => {
  try {
    const clients = await ClientModel.find().populate('client');
    return res.send(clients);
  } catch (err) {
    return res.status(400).send({ message: 'Error to show the clients!' });
  }
};

const destroy = async (req, res) => {
  try {
    const client = await ClientModel.findByIdAndDelete(req.params.id);
    return res.send(client);
  } catch (err) {
    return res.status(400).send({ message: 'Error to delete the client!' });
  }
};

module.exports = {
  store,
  update,
  show,
  index,
  destroy,
};
