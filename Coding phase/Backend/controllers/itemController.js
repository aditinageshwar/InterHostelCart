const Item = require('../models/itemModel');

const itemController = {
  getAllItems: async (req, res) => {
    try {
      const result = await Item.getAll();
      res.send(result);
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: err.message });
    }
  },

  createItem: async (req, res) => {
    const {
      sellerID,
      itemName,
      itemPrice,
      itemDescription,
      itemTags,
      listingDate,
      itemPhotoURL
    } = req.body;

    if (!sellerID || !itemName || !itemPrice || !itemDescription || !itemTags || !listingDate || !itemPhotoURL) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const reportflag = 0;
    const itemVisit = 0;
    const itemData = [sellerID, itemName, itemPrice, itemDescription, itemTags, listingDate, reportflag, itemVisit, itemPhotoURL];

    try {
      const result = await Item.create(itemData);
      res.status(201).json({ message: 'Item added successfully', itemId: result.insertId });
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: err.message });
    }
  },

  getItemsByGenderAndSeller: async (req, res) => {
    const { gender, id } = req.params;
    try {
      const result = await Item.getByGenderAndSeller(gender, id);
      res.send(result);
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: err.message });
    }
  },

  getItemsByTag: async (req, res) => {
    const tag = req.params;
    try {
      const result = await Item.getByTag(tag);
      res.send(result);
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: err.message });
    }
  },

  getItemById: async (req, res) => {
    const id = req.params;
    try {
      const result = await Item.getById(id.id);
      res.send(result);
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: err.message });
    }
  },

  reportItem: async (req, res) => {
    const { itemId } = req.body;
    try {
      const result = await Item.reportItem(itemId);
      res.status(200).json(result);
    } catch (err) {
      console.error('Error reporting item:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  removeItem: async (req, res) => {
    const id = req.params;
    try {
      await Item.removeById(id.id);
      res.status(201).json({ message: 'Item removed successfully' });
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: err.message });
    }
  },

  getItemsByHostel: async (req, res) => {
    const tag = req.params;
    try {
      const result = await Item.getByHostel(tag);
      res.send(result);
    } catch (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = itemController;