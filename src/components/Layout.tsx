import { Link, useLocation } from 'react-router-dom'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/problems', label: '10 Problems' },
  { to: '/learning-guide', label: 'Learning Guide' },
  { to: '/trace-table', label: 'Trace Table' },
  { to: '/dsa-categories', label: 'By DSA' },
  { to: '/good-vs-bad', label: 'Good vs Bad' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  return (
    <div className="layout">
      <header className="header">
        <div className="container header-inner">
          <Link to="/" className="logo">
            10 × 31
          </Link>
          <p className="tagline">Coding Interview Guide</p>
          <nav className="nav">
            {nav.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={location.pathname === to || (to !== '/' && location.pathname.startsWith(to)) ? 'nav-link active' : 'nav-link'}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="main">
        {children}
      </main>
      <footer className="footer">
        <div className="container">
          <p>Based on: 10 Coding Questions (31 Real-Time Scenarios) From 200+ Interview Experience</p>
          <p>Trace Table guide from <a href="https://www.youtube.com/watch?v=q8cKb-nSZuA" target="_blank" rel="noopener noreferrer">Trace Table Tutorial</a> (Learn Computer With Sir Zafar)</p>
        </div>
      </footer>
    </div>
  )
}
