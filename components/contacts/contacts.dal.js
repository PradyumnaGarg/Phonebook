const { Types: { ObjectId } } = require('mongoose');
const Contact = require('./contacts.model');

const saveContact = async (contactToSave) => await Contact.create(contactToSave);

const getAllContacts = async () => await Contact.find({});

const getUserContacts = async (userId) => await Contact.find({ savedBy: ObjectId(userId) });

const removeUserContact = async (userId, contactId) => await Contact.findOneAndRemove({ _id: contactId, savedBy: userId });

module.exports = {
  saveContact,
  getAllContacts,
  getUserContacts,
  removeUserContact,
};
