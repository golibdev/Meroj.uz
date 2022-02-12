const { Order, Book } = require('../models');

exports.getAll = async (req, res) => {
   try {
      const orders = await Order.find().populate('book');

      if(!orders) {
         return res.status(404).json({
            message: 'Zakazlar topilmadi'
         });
      }
      
      res.status(200).json({
         orders: orders
      });
   } catch (err) {
      res.status(500).json({ message: 'Server xatoligi', error: err.message });
   }
}

exports.getOne = async (req, res) => {
   try {
      const id = req.params.id;

      const order = await Order.findById(id).populate('book');

      if(!order) {
         return res.status(404).json({
            message: 'Zakaz topilmadi'
         });
      }

      res.status(200).json({
         order: order
      });
   } catch (err) {
      res.status(500).json({ message: 'Server xatoligi', error: err.message });
   }
}

// todays orders
exports.getTodaysOrders = async (req, res) => {
   try {

      const orders = await Order.find({
         createdAt: {
            $gte: new Date(new Date().setHours(0, 0, 0, 0)),
            $lt: new Date(new Date().setHours(23, 59, 59, 999))
         }
      }).populate('book');

      if(!orders) {
         return res.status(404).json({
            message: 'Bu kunda zakazlar topilmadi'
         });
      }

      res.status(200).json({
         orders: orders
      });

   } catch (err) {
      res.status(500).json({ message: 'Server xatoligi', error: err.message });
   }
}

exports.create = async (req, res) => {
   try {
      const {
         book,
         count,
         phoneNumber
      } = req.body;

      if(!book || !count || !phoneNumber) {
         return res.status(400).json({
            message: 'Barcha maydonlar to\'ldirilishi shart'
         });
      }

      const newOrder = await Order.create({
         book,
         count,
         phoneNumber
      });

      await Book.findByIdAndUpdate(book, {
         $push: {
            orders: newOrder._id
         }
      });

      res.status(201).json({
         order: newOrder
      });

   } catch (err) {
      res.status(500).json({ message: 'Server xatoligi', error: err.message });
   }
}

exports.update = async (req, res) => {
   try {
      const id = req.params.id;
      const queryStatus = req.query.status; 
      const order = await Order.findById(id);

      if(!order) {
         return res.status(404).json({
            message: 'Zakaz topilmadi'
         });
      }
      
      if(queryStatus) {
         await Order.findByIdAndUpdate(id, {
            status: queryStatus
         }, { new: true });
         
         return res.status(200).json({
            message: 'Zakaz statusi o\'zgartirildi',
         });
      }
      
   } catch (err) {
      res.status(500).json({ message: 'Server xatoligi', error: err.message });
   }
}

exports.delete = async (req, res) => {
   try {
      const id = req.params.id;

      const order = await Order.findById(id);

      if(!order) {
         return res.status(404).json({
            message: 'Zakaz topilmadi'
         });
      }

      await Book.findByIdAndUpdate(id, {
         $pull: {
            orders: id
         }
      });

      await Order.findByIdAndDelete(id);

      res.status(200).json({
         message: 'Zakaz o\'chirildi'
      });
   } catch (err) {
      res.status(500).json({ message: 'Server xatoligi', error: err.message });
   }
}