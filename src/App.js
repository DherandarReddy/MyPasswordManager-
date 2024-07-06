import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'
import PasswordItem from './components/EachPassword'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class App extends Component {
  state = {
    Count: 0,
    PasswordsList: [],
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    showPassword: false,
    searchItem: '',
  }

  ChangeCount = () => {
    this.setState(prev => ({
      Count: prev.Count + 1,
    }))
  }

  ChangeWebsite = event => {
    const {websiteInput} = this.state
    this.setState({websiteInput: event.target.value})
    console.log(websiteInput)
  }

  ChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  ChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newPassword = {
      id: v4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      PasswordsList: [...prevState.PasswordsList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  renderPasswordList = () => {
    const {PasswordsList, showPassword} = this.state

    return PasswordsList.map(each => (
      <PasswordItem
        key={each.id}
        Details={each}
        showPassword={showPassword}
        deletePassword={this.deletePassword}
      />
    ))
  }

  deletePassword = Id => {
    const {PasswordsList} = this.state

    this.setState({
      PasswordsList: PasswordsList.filter(pass => pass.id !== Id),
    })
  }

  TogglePassword = () => {
    const {showPassword} = this.state
    this.setState({showPassword: !showPassword})
  }

  SearchPassword = event => {
    const {searchItem, PasswordsList} = this.state
    this.setState({searchItem: event.target.value})
    const NewList = PasswordsList.filter(each =>
      each.website.toLowerCase().includes(searchItem.toLowerCase()),
    )
    this.setState({PasswordsList: NewList})
  }

  render() {
    const {
      Count,
      websiteInput,
      usernameInput,
      passwordInput,
      PasswordsList,
      showPassword,
      searchItem,
    } = this.state
    return (
      <div className="wholeContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="appLogo"
        />
        <form onSubmit={this.onAddPassword}>
          <div className="topContainer">
            <div className="leftContainer">
              <h1 className="AddNewPassword">Add New Password</h1>
              <div className="websiteCont">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  className="websiteImg"
                  alt="website"
                />
                <input
                  type="text"
                  value={websiteInput}
                  placeholder="Enter Website"
                  className="websiteInput"
                  onChange={this.ChangeWebsite}
                />
              </div>
              <div className="websiteCont">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  className="websiteImg"
                  alt="username"
                />
                <input
                  type="text"
                  value={usernameInput}
                  placeholder="Enter Username"
                  className="websiteInput"
                  onChange={this.ChangeUsername}
                />
              </div>
              <div className="websiteCont">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  className="websiteImg"
                  alt="password"
                />
                <input
                  type="password"
                  value={passwordInput}
                  placeholder="Enter Password"
                  className="websiteInput"
                  onChange={this.ChangePassword}
                />
              </div>
              <div className="btnContainer">
                <button
                  type="submit"
                  className="addBtn"
                  onClick={this.ChangeCount}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="rightContainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                className="passwordManagerImg"
                alt="password manager"
              />
            </div>
          </div>
        </form>
        <div className="bottomContainer">
          <div className="upperDownPart">
            <div className="CountWholeContainer">
              <h1 className="PasswordCount">Your Passwords</h1>
              <button type="button" className="countDisplayCont">
                <p>{Count}</p>
              </button>
            </div>
            <div className="SearchContainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="searchImg"
              />
              <input
                type="search"
                value={searchItem}
                className="searchInput"
                placeholder="Search"
                onChange={this.SearchPassword}
              />
            </div>
          </div>
          <hr className="hrLine" />
          <label>
            <input
              type="checkbox"
              checked={showPassword}
              onClick={this.TogglePassword}
            />
            Show passwords
          </label>
          {PasswordsList.length > 0 ? (
            <ul className="comments-list">{this.renderPasswordList()}</ul>
          ) : (
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p>No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
