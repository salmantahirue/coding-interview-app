import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { problems } from '../data/problems'
import { pythonSolutions } from '../data/pythonSolutions'

export default function ScenarioDetail() {
  const { problemId, scenarioId } = useParams()
  const problem = problems.find((p) => p.id === problemId)
  const scenario = problem?.scenarios.find((s) => s.id === scenarioId)
  const pySolutions = scenarioId ? pythonSolutions[scenarioId] : undefined
  const [selectedPyIndex, setSelectedPyIndex] = useState(0)

  if (!problem || !scenario) {
    return (
      <div className="container">
        <p>Scenario not found.</p>
        <Link to="/problems">Back to problems</Link>
      </div>
    )
  }

  return (
    <div className="container">
      <nav className="breadcrumb">
        <Link to="/problems">Problems</Link>
        <span className="breadcrumb-sep">/</span>
        <Link to={`/problems/${problem.id}`}>{problem.shortTitle}</Link>
        <span className="breadcrumb-sep">/</span>
        <span>{scenario.title}</span>
      </nav>

      <h1 className="page-title">{scenario.title}</h1>
      <p className="page-subtitle">{scenario.description}</p>

      <div className="section">
        <h2 className="section-title">Example</h2>
        <p><strong>Input:</strong> {scenario.example}</p>
        <p><strong>Output:</strong> <code>{scenario.exampleOutput}</code></p>
      </div>

      <div className="section">
        <h2 className="section-title">Real-world scenario</h2>
        <p>{scenario.realWorldScenario}</p>
      </div>

      {pySolutions && pySolutions.length > 0 && (
        <div className="section solutions-python">
          <h2 className="section-title">Solution</h2>
          <p className="section-desc">Multiple approaches (e.g. brute force, optimal, alternative).</p>
          <div className="py-approach-tabs">
            {pySolutions.map((sol, idx) => (
              <button
                key={idx}
                type="button"
                className={`py-tab ${selectedPyIndex === idx ? 'active' : ''}`}
                onClick={() => setSelectedPyIndex(idx)}
              >
                {sol.name}
              </button>
            ))}
          </div>
          {pySolutions[selectedPyIndex] && (
            <div className="py-solution-block">
              <div className="py-solution-meta">
                {pySolutions[selectedPyIndex].time && (
                  <span className="badge badge-time">{pySolutions[selectedPyIndex].time}</span>
                )}
                {pySolutions[selectedPyIndex].space && (
                  <span className="badge badge-space">{pySolutions[selectedPyIndex].space}</span>
                )}
              </div>
              <pre><code>{pySolutions[selectedPyIndex].code}</code></pre>
            </div>
          )}
        </div>
      )}

      <div className="section">
        <h2 className="section-title">Complexity</h2>
        <div className="tags">
          <span className="badge badge-time">Time: {scenario.complexity.time}</span>
          <span className="badge badge-space">Space: {scenario.complexity.space}</span>
        </div>
        {scenario.complexity.note && <p className="complexity-note">{scenario.complexity.note}</p>}
      </div>

      <div className="section two-col">
        <div>
          <h2 className="section-title">Good choice</h2>
          <p className="good-badge">{scenario.goodChoice}</p>
        </div>
        <div>
          <h2 className="section-title">Bad choice</h2>
          <p className="bad-badge">{scenario.badChoice}</p>
        </div>
      </div>

      {scenario.traceTableSteps && scenario.traceTableSteps.length > 0 && (() => {
        const allKeys = Array.from(new Set(scenario.traceTableSteps.flatMap((r) => Object.keys(r.variables))));
        return (
          <div className="section">
            <h2 className="section-title">Trace table (dry run)</h2>
            <p className="trace-intro">Use this during interviews to walk through the algorithm step by step.</p>
            <div className="table-wrap">
              <table className="trace-table">
                <thead>
                  <tr>
                    <th>Step</th>
                    {allKeys.map((k) => <th key={k}>{k}</th>)}
                    <th>Output</th>
                  </tr>
                </thead>
                <tbody>
                  {scenario.traceTableSteps.map((row, i) => (
                    <tr key={i}>
                      <td>{row.step}</td>
                      {allKeys.map((k) => (
                        <td key={k}>{row.variables[k] !== undefined ? String(row.variables[k]) : '—'}</td>
                      ))}
                      <td>{row.output ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })()}

      <div className="section">
        <Link to={`/problems/${problem.id}`}>← Back to {problem.shortTitle}</Link>
      </div>
    </div>
  )
}
