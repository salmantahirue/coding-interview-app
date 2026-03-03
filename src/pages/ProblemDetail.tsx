import { Link, useParams } from 'react-router-dom'
import { problems } from '../data/problems'

export default function ProblemDetail() {
  const { problemId } = useParams()
  const problem = problems.find((p) => p.id === problemId)

  if (!problem) {
    return (
      <div className="container">
        <p>Problem not found.</p>
        <Link to="/problems">Back to problems</Link>
      </div>
    )
  }

  return (
    <div className="container">
      <nav className="breadcrumb">
        <Link to="/problems">Problems</Link>
        <span className="breadcrumb-sep">/</span>
        <span>{problem.shortTitle}</span>
      </nav>
      <h1 className="page-title">Question {problem.number}: {problem.title}</h1>
      <p className="page-subtitle">{problem.summary}</p>

      <div className="section">
        <h2 className="section-title">Data structures & algorithms</h2>
        <div className="tags">
          {problem.dsa.map((d) => (
            <span key={d} className="badge badge-dsa">{d}</span>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title">Design patterns</h2>
        <ul className="pattern-list">
          {problem.designPatterns.map((pat) => (
            <li key={pat}>{pat}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2 className="section-title">Scenarios ({problem.scenarios.length})</h2>
        <ul className="scenario-list">
          {problem.scenarios.map((s) => (
            <li key={s.id}>
              <Link to={`/problems/${problem.id}/scenarios/${s.id}`} className="scenario-card card">
                <h3 className="card-title">{s.title}</h3>
                <p className="card-meta">{s.example}</p>
                <div className="tags">
                  <span className="badge badge-time">{s.complexity.time}</span>
                  <span className="badge badge-space">{s.complexity.space}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
