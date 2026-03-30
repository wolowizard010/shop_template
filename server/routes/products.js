const router = require('express').Router();

const products = [
    {
        id: 'prod_01',
        name:        'Basic Package',
        price:       999,
        description: 'Essential features for individuals',
        emoji:       '📦'
    },
    {
        id:          'prod_02',
        name:        'Standard Package',
        price:       1999,
        description: 'Perfect for small teams',
        emoji:       '🚀'
    },
    {
        id:          'prod_03',
        name:        'Premium Package',
        price:       3999,
        description: 'Full features for large businesses',
        emoji:       '💎'
    }
];

router.get('/', (req, res) => {
    res.json(products);
});

module.exports = router;