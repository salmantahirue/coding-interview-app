import { Link } from 'react-router-dom'
import { problems, totalScenarios } from '../data/problems'

export default function Home() {
  return (
    <div className="container">
      <section className="hero">
        <h1 className="hero-title">10 Coding Questions</h1>
        <p className="hero-subtitle">31 Real-Time Scenarios from 200+ Interview Experience</p>
        <p className="hero-desc">
          A learning guide that presents each problem and solution with design patterns, data structures & algorithms,
          time/space complexity, and how to dry run with trace tables during interviews.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">Quick links</h2>
        <div className="grid-2">
          <Link to="/problems" className="card card-link">
            <span className="card-title">All 10 Problems</span>
            <span className="card-meta">{totalScenarios} scenarios with solutions</span>
            <p>Two Sum, Sliding Window, Strings, Linked List, Tree, Graph, DP, Stack/Queue, Binary Search, Hash Map.</p>
          </Link>
          <Link to="/learning-guide" className="card card-link">
            <span className="card-title">Learning Guide</span>
            <span className="card-meta">Problem → Solution → Pattern → DSA</span>
            <p>Structured overview of each problem, solution approach, and design patterns used.</p>
          </Link>
          <Link to="/trace-table" className="card card-link">
            <span className="card-title">Trace Table & Dry Run</span>
            <span className="card-meta">Tracing and Algorithm</span>
            <p>How to create a trace table, dry run step-by-step, and use it in interviews.</p>
          </Link>
          <Link to="/dsa-categories" className="card card-link">
            <span className="card-title">By Data Structure & Algorithm</span>
            <span className="card-meta">Categorized by DSA</span>
            <p>Browse problems by Array, Hash Map, Two Pointers, DP, Graph, etc.</p>
          </Link>
          <Link to="/good-vs-bad" className="card card-link">
            <span className="card-title">Good vs Bad Choices</span>
            <span className="card-meta">Time & space complexity</span>
            <p>Why certain data structures and algorithms are preferred; complexity for each problem.</p>
          </Link>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">The 10 problems</h2>
        <ul className="problem-list">
          {problems.map((p) => (
            <li key={p.id}>
              <Link to={`/problems/${p.id}`}>
                <strong>{p.number}. {p.shortTitle}</strong>
                <span className="meta"> — {p.scenarios.length} scenario(s)</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
