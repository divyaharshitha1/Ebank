import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div className="navbar">
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
        className="website-logo"
        alt="website logo"
      />
      <button className="logout-btn" type="button" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
