import Shop from "../models/Shop.js";

/* ================= CREATE SHOP ================= */
export const createShop = async (req, res) => {
  try {
    const { name, category, description } = req.body;

    if (!name || !category) {
      return res.status(400).json({ error: "Name et category requis" });
    }

    const shop = await Shop.create({
      name,
      category,
      description,
    });

    res.status(201).json(shop);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= GET ALL SHOPS ================= */
export const getShops = async (req, res) => {
  try {
    const shops = await Shop.find().sort({ createdAt: -1 });
    res.json(shops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= GET ONE SHOP ================= */
export const getShop = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);

    if (!shop) {
      return res.status(404).json({ error: "Shop introuvable" });
    }

    res.json(shop);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= UPDATE SHOP ================= */
export const updateShop = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!shop) {
      return res.status(404).json({ error: "Shop introuvable" });
    }

    res.json(shop);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= DELETE SHOP ================= */
export const deleteShop = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndDelete(req.params.id);

    if (!shop) {
      return res.status(404).json({ error: "Shop introuvable" });
    }

    res.json({ message: "Shop supprimé" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
