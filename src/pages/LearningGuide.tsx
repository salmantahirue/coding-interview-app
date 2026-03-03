import { Link } from 'react-router-dom'
import { problems } from '../data/problems'

export default function LearningGuide() {
  return (
    <div className="container">
      <h1 className="page-title">Learning Guide</h1>
      <p className="page-subtitle">
        Problem → Solution → Design pattern → Data structure & algorithm. Use this as a checklist for interview prep.
      </p>

      <div className="guide-intro card">
        <h2 className="section-title">How to use this guide</h2>
        <ul>
          <li>Read the problem and example before looking at the solution.</li>
          <li>Identify the design pattern and DSA used—this helps you recognize similar problems.</li>
          <li>Practice dry running with a trace table (see <Link to="/trace-table">Trace Table</Link>).</li>
          <li>Compare good vs bad choices and complexity (see <Link to="/good-vs-bad">Good vs Bad</Link>).</li>
        </ul>
      </div>

      {problems.map((p) => (
        <section key={p.id} className="guide-problem section card">
          <h2>Question {p.number}: {p.title}</h2>
          <p className="card-meta">{p.summary}</p>
          <div className="guide-row">
            <div>
              <h3>Design patterns</h3>
              <ul>{p.designPatterns.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div>
              <h3>Data structures & algorithms</h3>
              <div className="tags">
                {p.dsa.map((d) => (
                  <span key={d} className="badge badge-dsa">{d}</span>
                ))}
              </div>
            </div>
          </div>
          <h3>Scenarios</h3>
          <ul className="guide-scenarios">
            {p.scenarios.map((s) => (
              <li key={s.id}>
                <Link to={`/problems/${p.id}/scenarios/${s.id}`}>{s.title}</Link>
                <span className="meta"> — {s.complexity.time}, {s.complexity.space}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
