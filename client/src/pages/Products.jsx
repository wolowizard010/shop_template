import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Products() {
    const [products, setProducts] = useState([])
    const [loading,  setLoading]  = useState(true)
    const { addToCart, cart, updateQuantity }     = useCart()

    useEffect(() => {
        axios.get('/api/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error('Failed to fetch products:', err))
            .finally(() => setLoading(false))
    }, [])

    function getQuantityInCart(productId) {
        return cart.find(i => i.product.id === productId)?.quantity || 0
    }

    if (loading) return (
        <div style={{ textAlign:'center', padding:80 }}>Loading products...</div>
    )

    return (
        <div style={{ padding:'40px 32px' }}>
            <h2 style={{ textAlign:'center', marginBottom:8 }}>Our Products</h2>
            <p style={{ textAlign:'center', color:'#666', marginBottom:40 }}>
                Pick a package that suits you best
            </p>

            <div style={{
                display:        'flex',
                gap:            24,
                justifyContent: 'center',
                flexWrap:       'wrap'
            }}>
                {products.map(product => {
                    const qty = getQuantityInCart(product.id)
                    return (
                        <div key={product.id} style={{
                            border:       '1px solid #e0e0e0',
                            borderRadius: 12,
                            padding:      28,
                            width:        260,
                            display:      'flex',
                            flexDirection:'column',
                            alignItems:   'center',
                            textAlign:    'center',
                            boxShadow:    '0 2px 8px rgba(0,0,0,0.07)'
                        }}>
                            <div style={{ fontSize:64, marginBottom:16 }}>
                                {product.emoji}
                            </div>
                            <h3 style={{ margin:'0 0 8px' }}>{product.name}</h3>
                            <p style={{ color:'#666', marginBottom:16, flexGrow:1 }}>
                                {product.description}
                            </p>
                            <p style={{ fontSize:28, fontWeight:'bold', margin:'0 0 20px' }}>
                                ₹{product.price}
                            </p>

                            {qty === 0 ? (
                                <button
                                    onClick={() => addToCart(product)}
                                    style={{
                                        width:        '100%',
                                        padding:      '10px 0',
                                        background:   '#1a1a2e',
                                        color:        'white',
                                        border:       'none',
                                        borderRadius: 8,
                                        fontSize:     16,
                                        cursor:       'pointer'
                                    }}
                                >
                                    Add to Cart
                                </button>
                            ) : (
                                <div style={{ display:'flex', alignItems:'center', gap:12, width:'100%' }}>
                                    <button
                                        onClick={() => updateQuantity(product.id, qty - 1)}
                                        style={{
                                            flex:         1,
                                            padding:      '10px 0',
                                            background:   '#e0e0e0',
                                            border:       'none',
                                            borderRadius: 8,
                                            fontSize:     20,
                                            cursor:       'pointer'
                                        }}
                                    >
                                        −
                                    </button>
                                    <span style={{ fontWeight:'bold', fontSize:18 }}>{qty}</span>
                                    <button
                                        onClick={() => addToCart(product)}
                                        style={{
                                            flex:         1,
                                            padding:      '10px 0',
                                            background:   '#1a1a2e',
                                            color:        'white',
                                            border:       'none',
                                            borderRadius: 8,
                                            fontSize:     20,
                                            cursor:       'pointer'
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            {cart.length > 0 && (
                <div style={{ textAlign:'center', marginTop:40 }}>
                    <Link to="/checkout">
                        <button style={{
                            padding:      '12px 36px',
                            background:   '#e94560',
                            color:        'white',
                            border:       'none',
                            borderRadius: 8,
                            fontSize:     18,
                            cursor:       'pointer'
                        }}>
                            Go to Checkout →
                        </button>
                    </Link>
                </div>
            )}
        </div>
    )
}