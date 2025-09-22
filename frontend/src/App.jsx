import { Routes, Route, Link, Navigate, NavLink, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Welcome from './pages/Welcome'
import CollectorDashboard from './pages/CollectorDashboard'
import AdminDashboard from './pages/AdminDashboard'
import LabProcessing from './pages/LabProcessing'
import { AuthProvider, useAuth } from './AuthContext'

function Protected({ children }) {
  const { token } = useAuth()
  if (!token) return <Navigate to="/login" replace />
  return children
}

function AdminProtected({ children }) {
  const { token, user } = useAuth()
  if (!token) return <Navigate to="/login" replace />
  if (user?.role !== 'admin') return <Navigate to="/dashboard" replace />
  return children
}

function LabProtected({ children }) {
  const { token, user } = useAuth()
  if (!token) return <Navigate to="/login" replace />
  if (user?.role !== 'lab') return <Navigate to="/dashboard" replace />
  return children
}

function CollectorProtected({ children }) {
  const { token, user } = useAuth()
  if (!token) return <Navigate to="/login" replace />
  if (user?.role !== 'collector') return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <div className="topbar">
        <div className="topbar-inner container">
          <div className="brand">
            <div className="brand-badge">🌿</div>
            <span>Aayur Gram</span>
          </div>
          <TopNavLinks />
        </div>
      </div>

      <main className="container" style={{ paddingTop: 16, paddingBottom: 80 }}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Collector-only dashboard */}
          <Route path="/dashboard" element={<CollectorProtected><CollectorDashboard /></CollectorProtected>} />
          {/* Admin-only route */}
          <Route path="/admin" element={<AdminProtected><AdminDashboard /></AdminProtected>} />
          {/* Lab-only route */}
          <Route path="/lab" element={<LabProtected><LabProcessing /></LabProtected>} />
        </Routes>
      </main>
    </AuthProvider>
  )
}

function TopNavLinks() {
  const { user, setUser, setToken } = useAuth()
  const navigate = useNavigate()

  function logout() {
    setToken(null)
    setUser(null)
    navigate('/login')
  }
  return (
    <div className="nav-links">
      <NavLink to="/" className={({isActive}) => isActive ? 'active' : undefined}>Welcome</NavLink>
      {!user && (
        <>
          <NavLink to="/login" className={({isActive}) => isActive ? 'active' : undefined}>Login</NavLink>
          <NavLink to="/signup" className={({isActive}) => isActive ? 'active' : undefined}>Signup</NavLink>
        </>
      )}
      {user && (
        <>
          {user?.role === 'collector' && (
            <NavLink to="/dashboard" className={({isActive}) => isActive ? 'active' : undefined}>Dashboard</NavLink>
          )}
          {user?.role === 'admin' && (
            <NavLink to="/admin" className={({isActive}) => isActive ? 'active' : undefined}>Admin</NavLink>
          )}
          {user?.role === 'lab' && (
            <NavLink to="/lab" className={({isActive}) => isActive ? 'active' : undefined}>Lab</NavLink>
          )}
          <button onClick={logout} style={{ marginLeft: 8 }} className="linklike">Logout</button>
          {/* Also show Login/Signup near Logout as requested */}
          <NavLink to="/login" className={({isActive}) => isActive ? 'active' : undefined} style={{ marginLeft: 8 }}>Login</NavLink>
          <NavLink to="/signup" className={({isActive}) => isActive ? 'active' : undefined}>Signup</NavLink>
        </>
      )}
    </div>
  )
}
