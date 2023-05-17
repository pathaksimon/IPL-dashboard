import {Component} from 'react'
import './index.css'

class MatchCard extends Component {
  render() {
    const {third} = this.props
    const {result, competingTeam, competingTeamLogo, matchStatus} = third
    return (
      <li className="lista1">
        <div>
          <p className="p1">{competingTeam}</p>
          <p className="p1">{result}</p>
          <p className="p1">{matchStatus}</p>
        </div>
        <img src={competingTeamLogo} alt={competingTeam} className="icon" />
      </li>
    )
  }
}

export default MatchCard
