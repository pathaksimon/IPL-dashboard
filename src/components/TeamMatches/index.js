import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {
    otherdata: {},
    latestMatchDetails1: {},
    recentMatches1: [],
    loader: true,
  }

  componentDidMount = () => {
    this.getBlogItemData()
  }

  getBlogItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const pond = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const datta = await pond.json()
    const new1 = {
      teamBaneerUrl: datta.team_banner_url,
      latestMatchDetails: datta.latest_match_details,
      recentMatches: datta.recent_matches,
    }
    this.setState({otherdata: new1})

    const {latestMatchDetails, recentMatches} = new1
    const nextData = {
      umpires: latestMatchDetails.umpires,
      result: latestMatchDetails.result,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
      id: latestMatchDetails.id,
      date: latestMatchDetails.date,
      venue: latestMatchDetails.venue,
      competingTeam: latestMatchDetails.competing_team,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      firstInnings: latestMatchDetails.first_innings,
      secondInnings: latestMatchDetails.second_innings,
      matchStatus: latestMatchDetails.match_status,
    }

    const changes = recentMatches.map(eachi => ({
      result: eachi.result,
      competingTeam: eachi.competing_team,
      competingTeamLogo: eachi.competing_team_logo,
      matchStatus: eachi.match_status,
      id: eachi.id,
    }))

    this.setState({recentMatches1: changes})
    this.setState({latestMatchDetails1: nextData})
    this.setState({loader: false})
  }

  bc = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'CSK':
        return 'CSK'
      case 'MI':
        return 'MI'
      case 'SRH':
        return 'SRH'
      case 'KKR':
        return 'KKR'
      case 'RCB':
        return 'RCB'
      default:
        return null
    }
  }

  render() {
    const {otherdata, latestMatchDetails1, recentMatches1, loader} = this.state
    const {
      venue,
      result,
      date,
      competingTeam,
      competingTeamLogo,
      firstInnings,
      secondInnings,
      manOfTheMatch,
      umpires,
    } = latestMatchDetails1
    const {recentMatches} = otherdata
    console.log(recentMatches1)
    const {teamBaneerUrl} = otherdata
    return (
      <div className={`team-match-card ${this.bc()}`}>
        {loader ? (
          <Loader type="Oval" color="#ffffff" height={50} width={50} />
        ) : (
          <>
            <div className="banner-card">
              <img
                src={teamBaneerUrl}
                alt="team banner"
                className="bannerPhoto"
              />
            </div>

            <p className="team-match-para">Latest Matches</p>
            <div className="details-card">
              <div className="cardoffirst">
                <div>
                  <p className="p1">{competingTeam}</p>
                  <p className="p1">{date}</p>
                  <p className="p1">{venue}</p>
                  <p className="p1">{result}</p>
                </div>
                <img
                  src={competingTeamLogo}
                  alt="Example response"
                  className="competeTeam"
                />
              </div>
              <hr className="horizontal" />
              <div>
                <p className="p1">First innings</p>
                <p className="p1">{firstInnings}</p>
                <p className="p1">Second innings</p>
                <p className="p1">{secondInnings}</p>
                <p className="p1">Man Of Match</p>
                <p className="p1">{manOfTheMatch}</p>
                <p className="p1">Umpires</p>
                <p className="p1">{umpires}</p>
              </div>
            </div>
            <ul className="ul">
              {recentMatches1.map(aich2 => (
                <MatchCard third={aich2} key={aich2.id} />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }
}

export default TeamMatches
