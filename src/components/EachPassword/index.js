import './index.css'

const PasswordItem = props => {
  const {Details, deletePassword, showPassword} = props
  const {id, website, username, password, initialClassName} = Details
  const initial = website ? website[0].toUpperCase() : ''
  const onDeletePassword = () => {
    deletePassword(id)
  }
  return (
    <li className="comment-item" key={id}>
      <div className="comment-container">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div className="username-time-container">
          <p className="comment">{website}</p>
          <p className="comment">{username}</p>
          {showPassword ? (
            <p className="comment">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="starsImg"
            />
          )}
        </div>
        <div className="buttons-container">
          <button
            className="button"
            type="button"
            onClick={onDeletePassword}
            data-testid="delete"
          >
            <img
              className="delete"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
              alt="delete"
            />
          </button>
        </div>
      </div>
    </li>
  )
}

export default PasswordItem
