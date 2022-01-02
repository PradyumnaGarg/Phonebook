const { Types: { ObjectId } } = require('mongoose');
const contactsDataAccessLayer = require('./contacts.dal');

const getAllContacts = () => contactsDataAccessLayer.getAllContacts();

const getUserContacts = (request) => {
  const query = { savedBy: ObjectId(request.user._id) };
  return contactsDataAccessLayer.getUserContacts(query);
};

const getFavouriteContacts = (request) => {
  const query = { savedBy: ObjectId(request.user._id), favourite: true };
  return contactsDataAccessLayer.getUserContacts(query);
};

const saveContact = async (request) => {
  const { name, number } = request.body;
  const contactToSave = { name, number, savedBy: request.user._id };
  const savedContact = await contactsDataAccessLayer.saveContact(contactToSave);
  return savedContact;
};

const getContactById = async (request) => {
  const id = request.params.contactId;
  const contact = await contactsDataAccessLayer.getContactById(id);
  return contact;
};

const removeUserContact = async (request) => {
  const { contactId } = request.params;
  await contactsDataAccessLayer.removeUserContact(request.user._id, contactId);
};

const updateContact = async (request) => {
  const contactData = request.body;
  const updatedContact = await contactsDataAccessLayer.updateContact(contactData);
  return updatedContact;
};

const getContactsGraphData = async (request) => {
  const graphData = await contactsDataAccessLayer.groupByDate(request.user._id, request.body);
  return graphData;
};

module.exports = {
  saveContact,
  getAllContacts,
  getUserContacts,
  getContactById,
  updateContact,
  removeUserContact,
  getFavouriteContacts,
  getContactsGraphData,
};
