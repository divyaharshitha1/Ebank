import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    errorMsg: '',
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  renderUserId = () => {
    const {userId} = this.state
    return (
      <div className="input-container">
        <label className="label-element" htmlFor="user">
          User ID
        </label>
        <input
          type="text"
          placeholder="Enter User ID"
          id="user"
          className="input-element"
          onChange={this.onChangeUserId}
          value={userId}
        />
      </div>
    )
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  renderPin = () => {
    const {pin} = this.state
    return (
      <div className="input-container">
        <label className="label-element" htmlFor="pin">
          PIN
        </label>
        <input
          type="password"
          placeholder="Enter PIN"
          id="pin"
          className="input-element"
          value={pin}
          onChange={this.onChangePin}
        />
      </div>
    )
  }

  render() {
    const {errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-image-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            className="login-image"
            alt="website login"
          />
          <form className="form-control" onSubmit={this.submitForm}>
            <h1 className="form-heading">Welcome Back!</h1>
            {this.renderUserId()}
            {this.renderPin()}
            <button type="submit" className="login-btn">
              Login
            </button>
            {errorMsg !== '' && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
