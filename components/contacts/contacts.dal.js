const { Types: { ObjectId } } = require('mongoose');
const Contact = require('./contacts.model');

const saveContact = (contactToSave) => Contact.create(contactToSave);

const getAllContacts = () => Contact.find({});

const getUserContacts = (userId) => Contact.find({ savedBy: ObjectId(userId) });

const getContactById = (id) => Contact.findById(id);

const removeUserContact = (userId, contactId) => Contact.findOneAndRemove({ _id: contactId, savedBy: userId });

const updateContact = (contactData) => Contact.findByIdAndUpdate(contactData._id, { $set: contactData }, { new: true });

module.exports = {
  saveContact,
  getAllContacts,
  getUserContacts,
  getContactById,
  updateContact,
  removeUserContact,
};
