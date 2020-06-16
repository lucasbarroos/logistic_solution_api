const EmployeeModel = require('../../models/Employee/index');
const UserModel = require('../../models/User/index');

const store = async (req, res) => {
  try {
    const employee = await EmployeeModel.create(req.body);
    return res.send(employee);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to save the employee!' });
  }
};

const update = async (req, res) => {
  try {
    const employee = await EmployeeModel
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    return res.send(employee);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to update the employee!' });
  }
};

const show = async (req, res) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id)
      .populate('channel');

    if (!employee) {
      return res.sendStatus(404).send({ message: 'Employee not found!' });
    }

    const subs = await UserModel
      .countDocuments({ channels: { $in: employee.channel._id } });

    await EmployeeModel
      .findOneAndUpdate(
        { _id: req.params.id },
        {
          employee_analytics:
          {
            views: employee.employee_analytics.views + 1,
            recommended: employee.employee_analytics.recommended,
          },
        },
        {
          new: true,
        },
      );

    return res.send({ employee, subs });
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to get the employee!' });
  }
};

const index = async (req, res) => {
  try {
    const filter = {};
    if (req.query.channel) filter.channel = req.query.channel;
    const employees = await EmployeeModel.find(filter).populate('channel');
    return res.send(employees);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to show the employees!' });
  }
};

const destroy = async (req, res) => {
  try {
    const employee = await EmployeeModel.findByIdAndDelete(req.params.id);
    return res.send(employee);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to delete the employee!' });
  }
};

const recommendEmployee = async (req, res) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const user = await UserModel.findById(req.params.userId);

    if (!employee) return res.sendStatus(400).send({ message: 'Employee not found!' });

    if (!user) return res.sendStatus(400).find({ message: 'User not found' });

    const newEmployee = await EmployeeModel
      .findOneAndUpdate(
        { _id: req.params.id },
        {
          employee_analytics:
          {
            views: employee.employee_analytics.views,
            recommended: employee.employee_analytics.recommended + 1,
          },
        },
        {
          new: true,
        },
      ).populate('channel');

    await UserModel.findOneAndUpdate({ _id: req.params.userId },
      { $push: { recommendedEmployees: employee } }); // Inserting the channel in the user list

    return res.send(newEmployee);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to recommend the employee!' });
  }
};

const checkRecommendEmployee = async (req, res) => {
  try {
    const user = await UserModel
      .findOne({ _id: req.params.userId, recommendedEmployees: { $in: req.params.id } });

    if (!user) return res.sendStatus(400);

    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to find the recommended the employee!' });
  }
};

module.exports = {
  store,
  update,
  show,
  index,
  destroy,
  recommendEmployee,
  checkRecommendEmployee,
};
