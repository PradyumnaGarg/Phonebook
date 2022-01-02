const { ObjectId } = require('mongoose').Types;
const Contact = require('./contacts.model');
const { getDates } = require('../../utils/helper');

const saveContact = (contactToSave) => Contact.create(contactToSave);

const getAllContacts = () => Contact.find({});

const getUserContacts = (query) => Contact.find({ ...query });

const getContactById = (id) => Contact.findById(id);

const removeUserContact = (userId, contactId) => Contact.findOneAndRemove({ _id: contactId, savedBy: userId });

const updateContact = (contactData) => Contact.findByIdAndUpdate(contactData._id, { $set: contactData }, { new: true });

const groupByDate = (userId, dates) => {
  const dateRange = getDates(dates.startDate, dates.stopDate);
  return Contact.aggregate([
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
    { $sort: { _id: 1 } },
    {
      $project: {
        date: '$_id',
        count: '$count',
      },
    },
    {
      $group: {
        _id: null,
        stats: { $push: '$$ROOT' },
      },
    },
    {
      $project: {
        stats: {
          $map: {
            input: dateRange,
            as: 'date',
            in: {
              $let: {
                vars: { dateIndex: { $indexOfArray: ['$stats._id', '$$date'] } },
                in: {
                  $cond: {
                    if: { $ne: ['$$dateIndex', -1] },
                    then: { $arrayElemAt: ['$stats', '$$dateIndex'] },
                    else: { _id: '$$date', date: '$$date', count: 0 },
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      $unwind: '$stats',
    },
    {
      $replaceRoot: {
        newRoot: '$stats',
      },
    },
  ]);
};

module.exports = {
  saveContact,
  getAllContacts,
  getUserContacts,
  getContactById,
  updateContact,
  removeUserContact,
  groupByDate,
};
