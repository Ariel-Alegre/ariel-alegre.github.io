const Stripe = require('stripe');
const stripe = new Stripe('sk_test_51OXn9wJ9AQZbyqhgVk77jwoINwAhddjHsBXtdSi5QhUzdwj9JW0tYX2RrOJ9Uui2UwkOeho0rsIQUfZOlG9Q3IwB00qAEyIhOC');

module.exports = {
    Payment: async (req, res) => {

        try {
        

            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price_data: {
                            product_data: {
                                name: 'Depositar',
                                description: 'asdasd',
                            },
                            currency: 'usd',
                            unit_amount: 50 * 100,
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: 'http://localhost:3001/success',
                cancel_url: 'http://localhost:3001/error',
            });

       

            console.log('Pago exitoso');
            return res.json(session);
        } catch (error) {
            console.error('Error al crear la sesión:', error);
            return res.status(500).json({ message: 'Error del servidor' });
        }
    },
};
