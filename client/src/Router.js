import React from 'react'
import FinanceChart from './FinanceChart'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const industryUrl = 'http://localhost:8000/api/industry?code=00'
const indexUrl = 'http://localhost:8000/api/csi?name=上海A股'

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const Index = () => (
  <div>
    <h2>Index</h2>
      <FinanceChart url = {industryUrl}/>
  </div>
)

const Industry = () => (
  <div>
    <h2>Industry</h2>
      <FinanceChart url = {indexUrl}/>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.path}/:topicId`} component={Topic}/>
    <Route exact path={match.path} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/index">Index</Link></li>
          <li><Link to="/industry">Industry</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
        <Route path="/index" component={Index}/>
      <Route path="/industry" component={Industry}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)
export default BasicExample