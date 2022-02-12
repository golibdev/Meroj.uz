const { Category } = require('../models');

exports.getAll = async (req, res) => {
   try {
      const categories = await Category.find().populate('books');
      
      if(!categories) return res.status(404).json({ message: 'Kategoriya mavjud emas' })

      return res.status(200).json({ categories: categories });

   } catch (err) {
      res.status(500).json({ message: 'Server xatoligi', error: err.message });
   }
}
exports.getOne = async (req, res) => {
   try {
      const id = req.params.id;
      const category = await Category.findById(id).populate('books');

      if(!category) return res.status(404).json({ message: 'Kategoriya topilmadi' })

      return res.status(200).json({ category: category });
   } catch (err) {
      res.status(500).json({ message: 'Server xatoligi', error: err.message });
   }
}
exports.create = async (req, res) => {
   try {
      const name = req.body.name;
      if(!name) return res.status(400).json({ message: 'Barcha maydonlarni to\'ldiring' })
      const category = await Category.findOne({ name: name });

      if(category) return res.status(400).json({ message: 'Bunday kategoriya mavjud' })

      const newCategory = new Category({
         name: name
      });

      await newCategory.save();

      return res.status(201).json({ message: 'Kategoriya muvaffaqiyatli yaratildi', category: newCategory });
   } catch (err) {
      res.status(500).json({ message: 'Server xatoligi', error: err.message });
   }
}
exports.update = async (req, res) => {
   try {
      const id = req.params.id;
      const category = await Category.findById(id);

      if(!category) return res.status(404).json({ message: 'Kategoriya topilmadi' })

      const updateCategory = await Category.findByIdAndUpdate(id, { 
         $set: {
            ...req.body
         }
      }, { new: true });

      return res.status(200).json({ message: 'Kategoriya muvaffaqiyatli yangilandi', category: updateCategory });
   } catch (err) {
      res.status(500).json({ message: 'Server xatoligi', error: err.message });
   }
}
exports.delete = async (req, res) => {
   try {
      const id = req.params.id;
      const category = await Category.findById(id);
      if(!category) return res.status(404).json({ message: 'Kategoriya topilmadi' })
      await Category.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Kategoriya muvaffaqiyatli o\'chirildi' });
   } catch (err) {
      res.status(500).json({ message: 'Server xatoligi', error: err.message });
   }
}