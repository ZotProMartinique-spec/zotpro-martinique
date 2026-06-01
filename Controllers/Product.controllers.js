import Product from "../models/Product.js";

/* ================= CREATE PRODUCT ================= */
export const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ error: "Name et price requis" });
    }

    const product = await Product.create({
      name,
      price,
    });

    res.status(201).json(product);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= GET ALL PRODUCTS ================= */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= GET ONE PRODUCT ================= */
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Produit introuvable" });
    }

    res.json(product);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= UPDATE PRODUCT ================= */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Produit introuvable" });
    }

    res.json(product);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= DELETE PRODUCT ================= */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Produit introuvable" });
    }

    res.json({ message: "Produit supprimé" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
