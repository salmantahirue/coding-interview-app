import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Problems from './pages/Problems'
import ProblemDetail from './pages/ProblemDetail'
import ScenarioDetail from './pages/ScenarioDetail'
import LearningGuide from './pages/LearningGuide'
import TraceTableGuide from './pages/TraceTableGuide'
import DSACategories from './pages/DSACategories'
import GoodVsBad from './pages/GoodVsBad'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/problems/:problemId" element={<ProblemDetail />} />
        <Route path="/problems/:problemId/scenarios/:scenarioId" element={<ScenarioDetail />} />
        <Route path="/learning-guide" element={<LearningGuide />} />
        <Route path="/trace-table" element={<TraceTableGuide />} />
        <Route path="/dsa-categories" element={<DSACategories />} />
        <Route path="/good-vs-bad" element={<GoodVsBad />} />
      </Routes>
    </Layout>
  )
}

export default App
