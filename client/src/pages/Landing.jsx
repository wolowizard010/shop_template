import { Link } from 'react-router-dom'

export default function Landing() {
    return (
        <div style={{ textAlign:'center', padding:'100px 32px' }}>
            <h1 style={{ fontSize:48, marginBottom:16 }}>
                Quality Goods, Delivered Fast
            </h1>
            <p style={{ fontSize:20, color:'#666', marginBottom:40, maxWidth:500, margin:'0 auto 40px' }}>
                Choose from our 3 premium variants. Simple checkout, no account needed.
            </p>
            <Link to="/products">
                <button style={{
                    padding:      '14px 40px',
                    fontSize:     18,
                    background:   '#1a1a2e',
                    color:        'white',
                    border:       'none',
                    borderRadius: 8,
                    cursor:       'pointer'
                }}>
                    Shop Now →
                </button>
            </Link>
        </div>
    )
}