const { ObjectId } = require('mongoose').Types;
const Contact = require('./contacts.model');

const saveContact = (contactToSave) => Contact.create(contactToSave);

const getAllContacts = () => Contact.find({});

const getUserContacts = (query) => Contact.find({ ...query });

const getContactById = (id) => Contact.findById(id);

const removeUserContact = (userId, contactId) => Contact.findOneAndRemove({ _id: contactId, savedBy: userId });

const updateContact = (contactData) => Contact.findByIdAndUpdate(contactData._id, { $set: contactData }, { new: true });

const groupByDate = (userId) => Contact.aggregate([
  {
    $match: {
      savedBy: ObjectId(userId),
    },
  },
  {
    $group: {
      _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
      count: { $sum: 1 },
    },
  },
]);

module.exports = {
  saveContact,
  getAllContacts,
  getUserContacts,
  getContactById,
  updateContact,
  removeUserContact,
  groupByDate,
};
