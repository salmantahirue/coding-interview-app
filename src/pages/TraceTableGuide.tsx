import { traceTableGuide } from '../data/traceTableGuide'

export default function TraceTableGuide() {
  const { title, subtitle, intro, whatIsTraceTable, steps, example, interviewTips, whyUse } = traceTableGuide

  return (
    <div className="container">
      <h1 className="page-title">{title}</h1>
      <p className="page-subtitle">{subtitle}</p>

      <div className="section card">
        <p className="lead">{intro}</p>
      </div>

      <div className="section card">
        <h2 className="section-title">{whatIsTraceTable.title}</h2>
        <p>{whatIsTraceTable.description}</p>
      </div>

      <div className="section card">
        <h2 className="section-title">Steps to create and use a trace table</h2>
        <ol className="steps-list">
          {steps.map((s) => (
            <li key={s.step}>
              <strong>Step {s.step}: {s.title}</strong>
              <p>{s.content}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="section card">
        <h2 className="section-title">Why use trace tables</h2>
        <ul>
          {whyUse.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="section card">
        <h2 className="section-title">Example: {example.title}</h2>
        <p>Pseudocode:</p>
        <pre><code>{example.pseudocode.join('\n')}</code></pre>
        <p>Trace table (variables and output at each step):</p>
        <div className="table-wrap">
          <table className="trace-table">
            <thead>
              <tr>
                {example.traceColumns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {example.traceRows.map((row, i) => (
                <tr key={i}>
                  <td>{row.step}</td>
                  <td>{row.number}</td>
                  <td>{row.i}</td>
                  <td>{row.output || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="trace-note">{example.note}</p>
      </div>

      <div className="section card">
        <h2 className="section-title">Interview tips</h2>
        <ul>
          {interviewTips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>

      <p className="ref">
        Reference: <a href="https://www.youtube.com/watch?v=q8cKb-nSZuA" target="_blank" rel="noopener noreferrer">Trace Table Tutorial: Dry Running Algorithms with Ease</a> (Learn Computer With Sir Zafar).
      </p>
    </div>
  )
}
