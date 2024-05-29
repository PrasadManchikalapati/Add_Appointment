import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

const AppointmentList = []
class Appointments extends Component {
  state = {
    updates: AppointmentList,
    title: '',
    date: '',
    sample: true,
  }

  addAppointment = event => {
    event.preventDefault()
    const {updates, title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }
    this.setState(prev => ({
      updates: [...prev.updates, newAppointment],
      title: '',
      date: '',
    }))
  }

  func = () => {
    const {sample} = this.state
    this.setState({sample: !sample})
  }

  changeTitle = event => {
    this.setState({title: event.target.value})
  }

  changeDate = event => {
    this.setState({
      date: format(new Date(event.target.value), 'dd MMMM yyyy, EEEE'),
    })
  }

  toggleStar = id => {
    this.setState(prevState => ({
      updates: prevState.updates.map(each => {
        if (id === each.id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  render() {
    const {sample, updates, title, date} = this.state
    const filtered = updates.filter(each => each.isStarred)
    return (
      <div className="bg-container">
        <div className="container">
          <div className="section1">
            <div>
              <h1>Add Appointment</h1>
              <form onSubmit={this.addAppointment}>
                <label htmlFor="Title">Title</label>
                <br />
                <input
                  type="text"
                  name="Title"
                  placeholder="Title"
                  value={title}
                  onChange={this.changeTitle}
                />
                <br />
                <label htmlFor="date">Date</label>
                <br />
                <input
                  type="date"
                  name="date"
                  onChange={this.changeDate}
                  value={date}
                />
                <br />
                <button className="button">Add</button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-img"
            />
          </div>
          <div>
            <div className="appointList">
              <h1>Appointments</h1>
              <div>
                <button
                  className="starred"
                  onClick={this.func}
                  data-testId="star"
                >
                  Starred
                </button>
              </div>
            </div>
            <ul>
              {sample
                ? updates.map(each => (
                    <AppointmentItem
                      details={each}
                      key={each.id}
                      toggleStar={this.toggleStar}
                    />
                  ))
                : filtered.map(each => (
                    <AppointmentItem
                      details={each}
                      key={each.id}
                      toggleStar={this.toggleStar}
                    />
                  ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
