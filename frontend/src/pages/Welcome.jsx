import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh', background: '#0b6b5d', color: '#fff', display: 'grid', placeItems: 'center', padding: 16 }}>
      <div style={{ maxWidth: 440, width: '100%', textAlign: 'center' }}>
        <h1 style={{ fontSize: 36, marginBottom: 16 }}>Aayur Gram</h1>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          {/* Simple friendly illustration */}
          <svg width="260" height="160" viewBox="0 0 260 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <rect x="10" y="20" width="240" height="120" rx="12" fill="#0f8f7a"/>
            <rect x="40" y="50" width="180" height="60" rx="8" fill="#fff"/>
            <text x="130" y="88" textAnchor="middle" fontFamily="Arial, Helvetica" fontWeight="700" fontSize="24" fill="#0b6b5d">WELCOME</text>
          </svg>
        </div>
        <h2 style={{ margin: 0, fontSize: 22 }}>Welcome to Aayur Gram</h2>
        <p style={{ opacity: 0.95, marginTop: 8, marginBottom: 28 }}>
          Discover natural healing and balance with authentic Aayur Gram care.
        </p>
        <div style={{ display: 'grid', gap: 12 }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              background: '#fff', color: '#0b6b5d', padding: '12px 16px', borderRadius: 8,
              border: 'none', cursor: 'pointer', fontWeight: 600
            }}
          >
            Log In
          </button>
          <button
            onClick={() => navigate('/signup')}
            style={{ background: 'transparent', color: '#fff', textDecoration: 'underline', border: 'none', cursor: 'pointer' }}
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  )
}
