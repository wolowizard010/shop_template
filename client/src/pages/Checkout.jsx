import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import axios from 'axios'

export default function Checkout() {
    const { cart, total, clearCart, removeFromCart, updateQuantity } = useCart()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error,   setError]   = useState('')

    const [form, setForm] = useState({
        name: '', email: '', phone: '', address: ''
    })

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function validate() {
        if (!form.name || !form.email || !form.phone || !form.address) {
            setError('All fields are required'); return false;
        }
        if (!/\S+@\S+\.\S+/.test(form.email)) {
            setError('Enter a valid email address'); return false;
        }
        if (!/^\d{10}$/.test(form.phone)) {
            setError('Enter a valid 10-digit phone number'); return false;
        }
        return true;
    }

    async function handlePlaceOrder() {
        if (!validate()) return;
        setLoading(true);
        setError('');

        try {
            const { data } = await axios.post('/api/orders/create-order', {
                customer: form,
                items: cart.map(item => ({
                    productId: item.product.id,
                    name:      item.product.name,
                    price:     item.product.price,
                    quantity:  item.quantity
                })),
                totalAmount: total
            });

            clearCart();
            navigate(`/confirmation/${data.orderId}`);
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    if (cart.length === 0) return (
        <div style={{ textAlign:'center', padding:80 }}>
            <div style={{ fontSize:64, marginBottom:16 }}>🛒</div>
            <h2>Your cart is empty</h2>
            <Link to="/products">
                <button style={{
                    marginTop:    16,
                    padding:      '12px 32px',
                    background:   '#1a1a2e',
                    color:        'white',
                    border:       'none',
                    borderRadius: 8,
                    fontSize:     16,
                    cursor:       'pointer'
                }}>
                    Browse Products
                </button>
            </Link>
        </div>
    )

    return (
        <div style={{
            display:       'flex',
            gap:           40,
            padding:       '40px 32px',
            maxWidth:      900,
            margin:        '0 auto',
            flexWrap:      'wrap'
        }}>

            {/* ── Left: Customer Form ── */}
            <div style={{ flex:1, minWidth:280 }}>
                <h2 style={{ marginBottom:24 }}>Your Details</h2>

                {[
                    { label:'Full Name',     name:'name',    type:'text' },
                    { label:'Email Address', name:'email',   type:'email' },
                    { label:'Phone Number',  name:'phone',   type:'tel' },
                ].map(field => (
                    <div key={field.name} style={{ marginBottom:16 }}>
                        <label style={{
                            display:      'block',
                            marginBottom: 6,
                            fontWeight:   'bold',
                            fontSize:     14
                        }}>
                            {field.label}
                        </label>
                        <input
                            name={field.name}
                            type={field.type}
                            value={form[field.name]}
                            onChange={handleChange}
                            style={{
                                width:        '100%',
                                padding:      '10px 12px',
                                borderRadius: 6,
                                border:       '1px solid #ddd',
                                fontSize:     16,
                                boxSizing:    'border-box'
                            }}
                        />
                    </div>
                ))}

                <div style={{ marginBottom:16 }}>
                    <label style={{
                        display:      'block',
                        marginBottom: 6,
                        fontWeight:   'bold',
                        fontSize:     14
                    }}>
                        Delivery Address
                    </label>
                    <textarea
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        rows={3}
                        style={{
                            width:        '100%',
                            padding:      '10px 12px',
                            borderRadius: 6,
                            border:       '1px solid #ddd',
                            fontSize:     16,
                            boxSizing:    'border-box',
                            resize:       'vertical'
                        }}
                    />
                </div>

                {error && (
                    <p style={{
                        color:        '#e94560',
                        background:   '#fff0f3',
                        padding:      '10px 14px',
                        borderRadius: 6,
                        fontSize:     14
                    }}>
                        {error}
                    </p>
                )}
            </div>

            {/* ── Right: Order Summary ── */}
            <div style={{ flex:1, minWidth:280 }}>
                <h2 style={{ marginBottom:24 }}>Order Summary</h2>

                {cart.map(item => (
                    <div key={item.product.id} style={{
                        display:       'flex',
                        justifyContent:'space-between',
                        alignItems:    'center',
                        padding:       '12px 0',
                        borderBottom:  '1px solid #eee'
                    }}>
                        <div>
                            <p style={{ margin:0, fontWeight:'bold' }}>{item.product.name}</p>
                            <div style={{ display:'flex', alignItems:'center', gap:10, marginTop:6 }}>
                                <button
                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                    style={{ padding:'2px 10px', cursor:'pointer', borderRadius:4, border:'1px solid #ddd' }}
                                >
                                    −
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                    style={{ padding:'2px 10px', cursor:'pointer', borderRadius:4, border:'1px solid #ddd' }}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div style={{ textAlign:'right' }}>
                            <p style={{ margin:0, fontWeight:'bold' }}>
                                ₹{item.product.price * item.quantity}
                            </p>
                            <button
                                onClick={() => removeFromCart(item.product.id)}
                                style={{
                                    marginTop:  4,
                                    background: 'none',
                                    border:     'none',
                                    color:      '#e94560',
                                    cursor:     'pointer',
                                    fontSize:   12
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}

                <div style={{
                    display:        'flex',
                    justifyContent: 'space-between',
                    padding:        '16px 0',
                    fontWeight:     'bold',
                    fontSize:       20
                }}>
                    <span>Total</span>
                    <span>₹{total}</span>
                </div>

                <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    style={{
                        width:        '100%',
                        padding:      '14px 0',
                        background:   loading ? '#999' : '#1a1a2e',
                        color:        'white',
                        border:       'none',
                        borderRadius: 8,
                        fontSize:     18,
                        cursor:       loading ? 'not-allowed' : 'pointer',
                        marginTop:    8
                    }}
                >
                    {loading ? 'Placing Order...' : `Place Order — ₹${total}`}
                </button>
            </div>
        </div>
    )
}