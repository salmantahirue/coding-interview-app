import { Link } from 'react-router-dom'
import { dsaCategories, problems } from '../data/problems'
import type { DSA } from '../data/problems'

export default function DSACategories() {
  const dsaOrder: DSA[] = [
    'Array', 'String', 'Hash Map', 'Hash Set', 'Two Pointers', 'Sliding Window',
    'Linked List', 'Stack', 'Queue', 'Binary Tree', 'Graph', 'BFS', 'DFS',
    'Binary Search', 'Dynamic Programming', 'Recursion', 'Backtracking', 'Greedy',
  ]

  return (
    <div className="container">
      <h1 className="page-title">Problems by Data Structure & Algorithm</h1>
      <p className="page-subtitle">
        Browse the 10 coding questions categorized by the primary data structures and algorithms used.
      </p>

      <div className="dsa-grid">
        {dsaOrder.map((dsa) => {
          const cat = dsaCategories[dsa]
          if (!cat) return null
          const problemIds = problems.filter((p) => p.dsa.includes(dsa)).map((p) => p.id)
          return (
            <div key={dsa} className="card dsa-card">
              <h2 className="card-title">{dsa}</h2>
              <p className="card-meta">{cat.description}</p>
              <p className="dsa-problems-label">Problems:</p>
              <ul className="dsa-problem-links">
                {problemIds.map((id) => {
                  const problem = problems.find((p) => p.id === id)!
                  return (
                    <li key={id}>
                      <Link to={`/problems/${id}`}>{problem.shortTitle}</Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
