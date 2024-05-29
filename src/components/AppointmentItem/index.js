import './index.css'

const AppointmentItem = props => {
  const {details, toggleStar} = props
  const {updates, title, date, id, isStarred} = details
  const func = () => {
    toggleStar(id)
  }

  const starred = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li>
      <div className="appList">
        <p>
          <b>{title}</b>
        </p>
        <button type="button" className="star" onClick={func}>
          <img src={starred} alt="star" />
        </button>
      </div>
      <p style={{marginTop: '-10px', fontSize: '10px'}}>Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
