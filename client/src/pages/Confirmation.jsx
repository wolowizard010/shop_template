import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

export default function Confirmation() {
    const { orderId }     = useParams()
    const [order, setOrder] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        axios.get(`/api/orders/${orderId}`)
            .then(res => setOrder(res.data))
            .catch(() => setError('Order not found'))
    }, [orderId])

    if (error) return (
        <div style={{ textAlign:'center', padding:80 }}>
            <div style={{ fontSize:64 }}>❌</div>
            <h2>{error}</h2>
            <Link to="/">
                <button style={{
                    marginTop:    16,
                    padding:      '12px 32px',
                    background:   '#1a1a2e',
                    color:        'white',
                    border:       'none',
                    borderRadius: 8,
                    cursor:       'pointer'
                }}>
                    Go Home
                </button>
            </Link>
        </div>
    )

    if (!order) return (
        <div style={{ textAlign:'center', padding:80 }}>
            <div style={{ fontSize:32 }}>⏳ Loading your order...</div>
        </div>
    )

    return (
        <div style={{
            maxWidth:  640,
            margin:    '40px auto',
            padding:   '32px',
            border:    '1px solid #e0e0e0',
            borderRadius: 12,
            boxShadow: '0 2px 16px rgba(0,0,0,0.08)'
        }}>
            {/* ── Header ── */}
            <div style={{
                textAlign:      'center',
                marginBottom:   32,
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'center',
                gap:            8
            }}>
                <div style={{ fontSize:72, lineHeight:1 }}>✅</div>
                <h1 style={{ color:'#2d6a4f', margin:0 }}>Order Confirmed!</h1>
                <p style={{ color:'#666', margin:0 }}>
                    A confirmation email has been sent to{' '}
                    <strong>{order.customer.email}</strong>
                </p>
            </div>

            {/* ── Order Meta ── */}
            <div style={{
                background:   '#f9f9f9',
                borderRadius: 8,
                padding:      '16px 20px',
                marginBottom: 24
            }}>
                <p style={{ margin:'4px 0' }}>
                    <strong>Order ID:</strong> {order._id}
                </p>
                <p style={{ margin:'4px 0' }}>
                    <strong>Payment ID:</strong> {order.payment.razorpayPaymentId}
                </p>
                <p style={{ margin:'4px 0' }}>
                    <strong>Status:</strong>{' '}
                    <span style={{ color:'#2d6a4f', fontWeight:'bold', textTransform:'capitalize' }}>
                        {order.payment.status}
                    </span>
                </p>
                <p style={{ margin:'4px 0' }}>
                    <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
                </p>
            </div>

            {/* ── Items ── */}
            <h3 style={{ marginBottom:12 }}>Items Ordered</h3>
            {order.items.map((item, i) => (
                <div key={i} style={{
                    display:        'flex',
                    justifyContent: 'space-between',
                    padding:        '10px 0',
                    borderBottom:   '1px solid #eee'
                }}>
                    <span>{item.name} × {item.quantity}</span>
                    <span style={{ fontWeight:'bold' }}>₹{item.price * item.quantity}</span>
                </div>
            ))}

            <div style={{
                display:        'flex',
                justifyContent: 'space-between',
                padding:        '16px 0',
                fontWeight:     'bold',
                fontSize:       20,
                borderBottom:   '1px solid #eee'
            }}>
                <span>Total</span>
                <span>₹{order.totalAmount}</span>
            </div>

            {/* ── Shipping ── */}
            <h3 style={{ marginTop:24, marginBottom:8 }}>Shipping Details</h3>
            <p style={{ margin:'4px 0', color:'#444' }}>{order.customer.name}</p>
            <p style={{ margin:'4px 0', color:'#444' }}>{order.customer.phone}</p>
            <p style={{ margin:'4px 0', color:'#444' }}>{order.customer.address}</p>
            <p style={{ marginTop:12 }}>
                <strong>Estimated Delivery:</strong>{' '}
                <span style={{ color:'#2d6a4f' }}>{order.shipment.estimatedDelivery}</span>
            </p>

            {/* ── Footer Button ── */}
            <Link to="/products">
                <button style={{
                    marginTop:    32,
                    width:        '100%',
                    padding:      '14px 0',
                    background:   '#1a1a2e',
                    color:        'white',
                    border:       'none',
                    borderRadius: 8,
                    fontSize:     16,
                    cursor:       'pointer'
                }}>
                    Continue Shopping
                </button>
            </Link>
        </div>
    )
}