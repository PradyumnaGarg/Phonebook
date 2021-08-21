const Contact = require('./contacts.model');

const saveContact = async (contactToSave) => {
    const contact = new Contact(contactToSave);
    const savedContact = await contact.save();
    return savedContact;
}

const getAllContacts = async () => {
    const allContacts = await Contact.find({});
    return allContacts;
}

module.exports = {
    saveContact,
    getAllContacts
}
