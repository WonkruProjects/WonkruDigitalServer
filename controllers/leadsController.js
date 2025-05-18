// controllers/leadController.js
const Lead = require('../models/lead');

// 1. Public Contact Us
exports.contactUs = async (req, res) => {
  try {
    const { fullName, email, companyName, serviceInterestedIn,message } = req.body;
    const lead = await Lead.create({ fullName, email, companyName, serviceInterestedIn ,message});
    res.status(201).json({ message: 'Lead created successfully', lead });
  } catch (err) {
    res.status(500).json({ message: 'Error creating lead', error: err.message });
  }
};

// 2. Get All Leads
exports.getAllLeads = async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
};

// 3. Get Priority Leads
exports.getPriorityLeads = async (req, res) => {
  const leads = await Lead.find({ priority: 'hot' });
  res.json(leads);
};

// 4. Get Converted Leads
exports.getConvertedLeads = async (req, res) => {
  const leads = await Lead.find({ status: 'converted' });
  res.json(leads);
};

// 5. Get Archived Leads
exports.getArchivedLeads = async (req, res) => {
  const leads = await Lead.find({ priority: 'archived' });
  res.json(leads);
};

// 6. Update Lead Priority
exports.updatePriority = async (req, res) => {
  const { id } = req.params;
  const { priority } = req.body;
  const lead = await Lead.findByIdAndUpdate(id, { priority }, { new: true });
  res.json(lead);
};

// 7. Update Lead Status
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true });
  res.json(lead);
};

// 8. Set Reminder Date
exports.setReminder = async (req, res) => {
  const { id } = req.params;
  const { reminderDate } = req.body;
  const lead = await Lead.findByIdAndUpdate(id, { reminderDate }, { new: true });
  res.json(lead);
};

// 9. Delete Lead
exports.deleteLead = async (req, res) => {
  const { id } = req.params;
  await Lead.findByIdAndDelete(id);
  res.json({ message: 'Lead deleted successfully' });
};
