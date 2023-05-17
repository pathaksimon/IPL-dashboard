import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {
    ImageData: [],
    loader: true,
  }

  componentDidMount = () => {
    this.gettingitdone()
  }

  gettingitdone = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const {teams} = data
    const changed = teams.map(aich => ({
      id: aich.id,
      name: aich.name,
      teamImageUrl: aich.team_image_url,
    }))

    this.setState({ImageData: changed})
    this.setState({loader: false})
  }

  render() {
    const {ImageData, loader} = this.state
    return (
      <div className="bg-container">
        {loader ? (
          <Loader type="Oval" color="#ffffff" height={50} width={50} />
        ) : (
          <div className="centerist">
            <div className="ipl-image-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
                className="ipl-logo"
                alt="ipl logo"
              />
              <h1>IPL Dashboard</h1>
            </div>
            <ul className="ulu">
              {ImageData.map(each => (
                <TeamCard first={each} key={each.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}
export default Home
