const { Book, Category } = require('../models');
const path = require('path');
const fs = require('fs');

exports.getAll = async (req, res) => {
   try {
      const books = await Book.find().populate('category').populate('orders').populate('category');
      if(!books) return res.status(404).json({ message: 'Kitob mavjud emas' })
      return res.status(200).json({ books: books });
   } catch (err) {
      res.status(500).json({ message: 'Server xatoligi', error: err.message });
   }
}

exports.getOne = async (req, res) => {
   try {
      const id = req.params.id;
      
      const book = await Book.findById(id).populate('category').populate('orders').populate('category');

      if(!book) return res.status(404).json({ message: 'Kitob topilmadi' })

      return res.status(200).json({ book: book });
   } catch (err) {
      res.status(500).json({ message: 'Server xatoligi', error: err.message });
   }
}

exports.create = async (req, res) => {
   try {
      if(!req.files) {
         return res.status(400).json({
            message: 'Rasm yuklanmadi'
         })
      }

      const image = req.files.image

      if(!image.mimetype.startsWith('image')) {
         return res.status(400).json({
            message: 'Faqat rasm fayllari qabul qilinadi'
         })
      }

      if(image.size > process.env.MAX_FILE_SIZE) {
         return res.status(400).json({
            message: 'Fayl hajmi juda katta'
         })
      }

      image.name = `photo_${new Date().getTime()}${path.parse(image.name).ext}`
      image.mv(`public/uploads/${image.name}`, async err => {
         if(err) {
            return res.status(500).json({
               message: 'Fayl yuklashda xatolik yuz berdi',
               error: err.message
            })
         }
      })

      const {
         bookName,
         description,
         category
      } = req.body;
      
      if(!bookName || !description || !category) return res.status(400).json({ message: 'Barcha maydonlarni to\'ldiring' })

      const book = new Book({
         bookName,
         description,
         category,
         image: `/uploads/${image.name}`
      });

      await book.save();

      await Category.findByIdAndUpdate(category, { $push: { books: book._id } });
      return res.status(201).json({ message: 'Kitob muvaffaqiyatli yuklandi', book: book });
   } catch (err) {
      console.log(err)
   }
}

exports.update = async (req, res) => {
   try {
      const id = req.params.id;

      const book = await Book.findById(id);

      if(!book) return res.status(404).json({ message: 'Kitob topilmadi' })

      if(!req.files) {
         const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
            new: true
         });

         return res.status(200).json({ message: 'Kitob muvaffaqiyatli yangilandi', book: updatedBook });
      }

      // delete old image
      const oldImage = book.image;
      const oldImagePath = path.join(__dirname, '..', '..', `public${oldImage}`);
      fs.unlinkSync(oldImagePath);

      const image = req.files.image

      if(!image.mimetype.startsWith('image')) {
         return res.status(400).json({
            message: 'Faqat rasm fayllari qabul qilinadi'
         })
      }

      if(image.size > process.env.MAX_FILE_SIZE) {
         return res.status(400).json({
            message: 'Fayl hajmi juda katta'
         })
      }

      image.name = `photo_${new Date().getTime()}${path.parse(image.name).ext}`

      image.mv(`public/uploads/${image.name}`, async err => {
         if(err) {
            return res.status(500).json({
               message: 'Fayl yuklashda xatolik yuz berdi',
               error: err.message
            })
         }
      })

      await Book.findByIdAndUpdate(id, {
         $set: {
            bookName: req.body.bookName,
            description: req.body.description,
            category: req.body.category,
            image: `/uploads/${image.name}`
         }
      }, {
         new: true
      });

      return res.status(200).json({ message: 'Kitob muvaffaqiyatli yangilandi'});
   } catch (err) {
      res.status(500).json({ message: 'Server xatoligi', error: err.message });
   }
}

exports.delete = async (req, res) => {
   try {
      const id = req.params.id;

      const book = await Book.findById(id);

      if(!book) return res.status(404).json({ message: 'Kitob topilmadi' })

      const imagePath = path.join(__dirname, '..', '..', `public${book.image}`);
      fs.unlinkSync(imagePath);
      await Book.findByIdAndDelete(id);

      return res.status(200).json({ message: 'Kitob muvaffaqiyatli o\'chirildi' });
   } catch (err) {
      res.status(500).json({ message: 'Server xatoligi', error: err.message });
   }
}