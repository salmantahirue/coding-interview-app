import { Link } from 'react-router-dom'
import { problems } from '../data/problems'

export default function Problems() {
  return (
    <div className="container">
      <h1 className="page-title">10 Coding Questions</h1>
      <p className="page-subtitle">31 real-time scenarios with solutions, design patterns, and complexity</p>

      <div className="grid-cards">
        {problems.map((p) => (
          <Link
            key={p.id}
            to={`/problems/${p.id}`}
            className="card card-link"
          >
            <div className="card-meta">Question {p.number} · {p.scenarios.length} scenario(s)</div>
            <h2 className="card-title">{p.title}</h2>
            <p>{p.summary}</p>
            <div className="tags">
              {p.dsa.slice(0, 4).map((d) => (
                <span key={d} className="badge badge-dsa">{d}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
