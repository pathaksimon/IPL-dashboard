import {Component} from 'react'
import './index.css'
import {Link} from 'react-router-dom'

class TeamCard extends Component {
  render() {
    const {first} = this.props
    const {name, teamImageUrl, id} = first
    return (
      <Link to={`/team-matches/${id}`} className="small-team-cards">
        <li>
          <img src={teamImageUrl} className="team-photo" alt={`${name}`} />
          <p className="text">{name}</p>
        </li>
      </Link>
    )
  }
}

export default TeamCard
