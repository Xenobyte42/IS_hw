import { Fragment, PureComponent } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { getDaysList } from '../../utils';
import './Calendar.css';

class Calendar extends PureComponent {

  storageStateName = 'CALENDAR_STORAGE';

  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  state = JSON.parse(localStorage.getItem(this.storageStateName)) || {
    year: new Date().getFullYear(),
    month: new Date().getMonth()
  };

  saveStateLocally = () => {
    localStorage.setItem(this.storageStateName, JSON.stringify(this.state));
  };

  prevPage = () => {
    let newYear = this.state.year;
    let newMonth = this.state.month - 1;
    if (newMonth === -1) {
      newMonth = 11;
      newYear--;
    }

    this.setState({
      year: newYear,
      month: newMonth
    }, this.saveStateLocally)
  };

  nextPage = () => {
    let newYear = this.state.year;
    let newMonth = this.state.month + 1;
    if (newMonth === 12) {
      newMonth = 0;
      newYear++;
    }

    this.setState({
      year: newYear,
      month: newMonth
    }, this.saveStateLocally)
  };

  defaultPage = () => {
    this.setState({
      year: new Date().getFullYear(),
      month: new Date().getMonth()
    }, this.saveStateLocally)
  };

  isEmptyDay = (recordsList, day) => {
    const recordsOnDay = recordsList.filter((record) => (
      record.date.getDate() === day
    )).length;
    return recordsOnDay === 0;
  };

  render() {
    const { year, month } = this.state;
    const daysArray = getDaysList(year, month);
    const recordsList = this.props.recordsList.filter((record) => (
      record.date.getFullYear() === year && record.date.getMonth() === month
    ));

    return (
        <Fragment>
          <div className="toolbar">
            <div className="toolbar-arrow-left" onClick={this.prevPage}></div>
            <div className="toolbar-current-month" onClick={this.defaultPage}>{`${this.monthNames[month]} ${year}`}</div>
            <div className="toolbar-arrow-right" onClick={this.nextPage}></div>
          </div>
          <div className="calendar">
            <div className="calendar-header">
              <div>sun</div>
              <div>mon</div>
              <div>tue</div>
              <div>wed</div>
              <div>thu</div>
              <div>fri</div>
              <div>sat</div>
            </div>
            {daysArray.map((days, index) => (
      <div className="calendar-week" key={`week-${index}`}>
        {days.map((day, index) => (
          day !== -1 ? (<Link to={{pathname: '/day', state: {
                                    year: year,
                                    month: month,
                                    day: day
                                  }}} 
                                  className={`calendar-day ${this.isEmptyDay(recordsList, day) 
                                  ? '' : 'calendar-day-notempty'}`} key={`weekday-${index}`}>{day}
                        </Link>
            )
          : <div className="calendar-day calendar-day-disabled" key={`weekday-${index}`}></div>
        )
        )
        }
      </div>
    ))}
          </div> 
        </Fragment>
    );
  }
}

const mapStateToProps = ({ recordsList }) => ({ recordsList });

export default connect(
    mapStateToProps,
    null
)(withRouter(Calendar));
