import Contact from '../models/Contact.js';

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Private
export const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.active().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single contact
// @route   GET /api/contacts/:id
// @access  Private
export const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact || contact.isDeleted) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create contact
// @route   POST /api/contacts
// @access  Private
export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, address } = req.body;

    // Validation
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and phone'
      });
    }

    // Check if email already exists
    const existingContact = await Contact.findOne({ email, isDeleted: false });
    if (existingContact) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      address
    });

    res.status(201).json({
      success: true,
      data: contact
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update contact
// @route   PUT /api/contacts/:id
// @access  Private
export const updateContact = async (req, res, next) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact || contact.isDeleted) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    // Check if new email is already used by another contact
    if (req.body.email && req.body.email !== contact.email) {
      const emailExists = await Contact.findOne({
        email: req.body.email,
        _id: { $ne: req.params.id },
        isDeleted: false
      });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists'
        });
      }
    }

    contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete contact (soft delete)
// @route   DELETE /api/contacts/:id
// @access  Private
export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact || contact.isDeleted) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    contact.isDeleted = true;
    await contact.save();

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Partial update contact
// @route   PATCH /api/contacts/:id
// @access  Private
export const partialUpdateContact = async (req, res, next) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact || contact.isDeleted) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    // Check email uniqueness if it's being updated
    if (req.body.email && req.body.email !== contact.email) {
      const emailExists = await Contact.findOne({
        email: req.body.email,
        _id: { $ne: req.params.id },
        isDeleted: false
      });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists'
        });
      }
    }

    contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
