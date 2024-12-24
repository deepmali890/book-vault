const Cart = require("../../models/cart");

const createCart = async (req, res, next) => {
    try {
        const { user, book } = req.body;

        console.log("=>>>>+>>", user)



        const oldData = await Cart.findOne({
            user,
            book,
            
        });

        if (oldData) {
            // If item already exists in cart, update the quantity
            const data = await Cart.updateOne(
                { _id: oldData._id },
                {
                    $set: {
                        quantity: oldData.quantity + 1
                    }
                }
            );
            console.log('Cart Data :=',data);
            return res.status(200).json({ message: 'Cart updated', data });
        }

        // If no previous data, create new cart item
        const dataToSave = new Cart(req.body);
        const data = await dataToSave.save();
        console.log(data);
        return res.status(200).json({ message: 'Data added successfully', data, status: true });

    } catch (error) {
        console.error(error);
        next(error);  // Pass the error to the next middleware for centralized error handling
        return res.status(500).json({ message: 'Error creating cart' });
    }
};

const readCart = async (req, res, next) => {
    try {
        // const { user } = req.params;
        console.log(req.params)


        const data = await Cart.find(req.params).populate('book');
        console.log('Cart Data : ',data);


        const filepath = `${req.protocol}://${req.get('host')}/book-files/`;
        res.status(200).json({ message: 'Cart Data Success', data, filepath, status: true });

    } catch (error) {
        console.error(error);
        next(error);
        return res.status(500).json({ message: 'Error reading cart' });
    }
};

module.exports = {
    createCart,
    readCart
};
