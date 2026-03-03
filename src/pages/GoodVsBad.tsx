import { Link } from 'react-router-dom'
import { problems } from '../data/problems'

export default function GoodVsBad() {
  return (
    <div className="container">
      <h1 className="page-title">Good vs Bad: Data Structure & Algorithm Choices</h1>
      <p className="page-subtitle">
        Why the chosen approach is optimal and what to avoid. Includes time and space complexity for each scenario.
      </p>

      <div className="section card">
        <h2 className="section-title">Why it matters</h2>
        <p>
          In interviews, choosing the right data structure and algorithm shows you understand trade-offs.
          A &quot;good&quot; choice typically means better time/space complexity or clearer correctness;
          a &quot;bad&quot; choice might be brute force, wrong structure for the problem, or unnecessary extra space.
        </p>
      </div>

      {problems.map((p) => (
        <section key={p.id} className="section">
          <h2 className="section-title">Question {p.number}: {p.shortTitle}</h2>
          <div className="good-bad-list">
            {p.scenarios.map((s) => (
              <div key={s.id} className="card good-bad-card">
                <h3>{s.title}</h3>
                <div className="tags">
                  <span className="badge badge-time">Time: {s.complexity.time}</span>
                  <span className="badge badge-space">Space: {s.complexity.space}</span>
                </div>
                <div className="good-bad-row">
                  <div>
                    <strong className="good-label">Good</strong>
                    <p>{s.goodChoice}</p>
                  </div>
                  <div>
                    <strong className="bad-label">Bad</strong>
                    <p>{s.badChoice}</p>
                  </div>
                </div>
                <Link to={`/problems/${p.id}/scenarios/${s.id}`} className="link-small">View full solution →</Link>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
