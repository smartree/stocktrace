import React from 'react'
import FinanceChart from './FinanceChart'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const industryChartType = 'industry'
const indexChartType = 'index'
const equityChartType = 'equity'
const swChartType = 'sw'
const shChartType = 'sh'

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const Index = () => (
  <div>
    <h2>Index</h2>
      <FinanceChart chartType = {indexChartType} code={'上海A股'}/>
  </div>
)

const Industry = () => (
  <div>
    <h2>Industry</h2>
      <FinanceChart chartType = {industryChartType} code={'00'}/>
  </div>
)

const Equity = () => (
  <div>
    <h2>Equity</h2>
      <FinanceChart chartType = {equityChartType} code={'600420'}/>
  </div>
)

const Sw = () => (
  <div>
    <h2>Sw</h2>
      <FinanceChart chartType = {swChartType} code={'801150'}/>
  </div>
)

const SH = () => (
  <div>
    <h2>SH</h2>
      <FinanceChart chartType = {shChartType} />
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
          <li><Link to="/equity">Equity</Link></li>
          <li><Link to="/sw">Sw</Link></li>
          <li><Link to="/sh">SH</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
        <Route path="/index" component={Index}/>
      <Route path="/industry" component={Industry}/>
        <Route path="/equity" component={Equity}/>
        <Route path="/sw" component={Sw}/>
        <Route path="/sh" component={SH}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)
export default BasicExample