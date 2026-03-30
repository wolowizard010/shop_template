import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
    const { cart } = useCart()
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <nav style={{
            display:         'flex',
            justifyContent:  'space-between',
            alignItems:      'center',
            padding:         '16px 32px',
            background:      '#1a1a2e',
            color:           'white',
            position:        'sticky',
            top:             0,
            zIndex:          100
        }}>
            <Link to="/" style={{ color:'white', textDecoration:'none', fontWeight:'bold', fontSize:22 }}>
                ShopCo
            </Link>
            <div style={{ display:'flex', gap:24, alignItems:'center' }}>
                <Link to="/products" style={{ color:'white', textDecoration:'none' }}>
                    Products
                </Link>
                <Link to="/checkout" style={{ color:'white', textDecoration:'none' }}>
                    Cart
                    {itemCount > 0 &&
                        <span style={{
                            marginLeft:      6,
                            background:      '#e94560',
                            borderRadius:    '50%',
                            padding:         '2px 8px',
                            fontSize:        12,
                            fontWeight:      'bold'
                        }}>
                            {itemCount}
                        </span>
                    }
                </Link>
            </div>
        </nav>
    )
}