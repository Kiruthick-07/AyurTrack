import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import { useAuth } from '../AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setToken, setUser } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post('/auth/login', { email, password })
      setToken(res.data.token)
      setUser(res.data.user)
      if (res.data?.user?.role === 'admin') navigate('/admin')
      else if (res.data?.user?.role === 'lab') navigate('/lab')
      else navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg,#e8f5e9,#f0fdf4)', display: 'grid', placeItems: 'center', padding: 16 }}>
      <div style={{ width: '100%', maxWidth: 480 }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 40 }}>🌿</div>
          <h1 style={{ color: '#0b6b5d', margin: '8px 0' }}>Aayur Gram</h1>
        </div>

        <div style={{ background: '#fff', borderRadius: 24, border: '1px solid #e5e7eb', boxShadow: '0 10px 25px rgba(0,0,0,0.06)', padding: 24 }}>
          <h2 style={{ textAlign: 'center', color: '#0b6b5d', marginTop: 0 }}>Welcome Back!</h2>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
            {/* Email */}
            <div style={fieldWrap}>
              <span style={iconStyle}>✉️</span>
              <input style={inputStyle} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            {/* Password */}
            <div style={fieldWrap}>
              <span style={iconStyle}>🔒</span>
              <input style={inputStyle} placeholder="Password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} />
              <button type="button" onClick={() => setShowPassword(s => !s)} style={eyeBtn}>{showPassword ? '🙈' : '👁️'}</button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => alert('Forgot password flow not implemented yet')} style={{ background: 'none', border: 'none', color: '#0b6b5d', cursor: 'pointer' }}>Forgot Password?</button>
            </div>

            <button type="submit" style={{ background: '#166534', color: '#fff', padding: '12px 16px', border: 'none', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }}>Login</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', color: '#9ca3af', fontWeight: 600 }}>
              <div style={{ height: 1, background: '#e5e7eb' }} />
              <div style={{ padding: '0 8px' }}>or login with</div>
              <div style={{ height: 1, background: '#e5e7eb' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
              <button type="button" title="Google" style={socialBtn}>G</button>
              <button type="button" title="Facebook" style={socialBtn}>f</button>
            </div>
          </form>

          <div style={{ textAlign: 'center', marginTop: 12 }}>
            Don't have an account?{' '}
            <button type="button" onClick={() => navigate('/signup')} style={{ background: 'none', border: 'none', color: '#0b6b5d', fontWeight: 700, cursor: 'pointer' }}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const fieldWrap = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  background: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: 12,
  padding: '4px 8px',
}

const iconStyle = {
  marginLeft: 6,
  marginRight: 6,
  color: '#0b6b5d',
}

const inputStyle = {
  flex: 1,
  border: 'none',
  outline: 'none',
  padding: '12px 8px',
  borderRadius: 10,
}

const eyeBtn = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 6,
}

const socialBtn = {
  width: 40,
  height: 40,
  borderRadius: '50%',
  border: '1px solid #e5e7eb',
  background: '#fff',
  cursor: 'pointer',
  fontWeight: 800,
  color: '#111827'
}
