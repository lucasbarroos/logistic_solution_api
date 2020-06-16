const bcrypt = require('bcrypt');

const UserModel = require('../../models/User/index');

const store = async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    return res.send(user);
  } catch (err) {
    return res.status(400).send({ message: 'Error to save the user!' });
  }
};

const update = async (req, res) => {
  try {
    const user = await UserModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    return res.send(user);
  } catch (err) {
    return res.status(400).send({ message: 'Error to update the user!' });
  }
};

const show = async (req, res) => {
  try {
    const user = await UserModel
      .findById(req.params.id)
      .populate('channels');
    if (!user) {
      return res.status(404).send({ message: 'User not found!' });
    }
    return res.send(user);
  } catch (err) {
    return res.status(400).send({ message: 'Error to get the user!' });
  }
};

const index = async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.send(users);
  } catch (err) {
    return res.status(400).send({ message: 'Error to show the users!' });
  }
};

const destroy = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    return res.send(user);
  } catch (err) {
    return res.status(400).send({ message: 'Error to delete the user!' });
  }
};

const register = async (req, res) => {
  try {
    const {
      name,
      email,
      profession,
      password,
    } = req.body;

    if (!email) {
      return res.status(400).send({ message: 'Email is a required field!' });
    }

    if (!password) {
      return res.status(400).send({ message: 'Password is a required field!' });
    }

    if (await UserModel.findOne({ email })) {
      return res.status(403).send({ message: 'This email is registered!' });
    }

    const user = await UserModel.create({
      name, email, profession, password,
    });

    return res.send(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: 'Error to register the user!' });
  }
};

const login = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: 'Missing fields login!' });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).send({ error: "User doesn't registered!" });
    }

    if (!await bcrypt.compare(password, user.password)) {
      return res.status(401).send({ error: 'Incorrect email or password!' });
    }

    delete user.password;

    return res.send(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Error to login!' });
  }
};

module.exports = {
  store,
  update,
  show,
  index,
  destroy,
  login,
  register,
};
