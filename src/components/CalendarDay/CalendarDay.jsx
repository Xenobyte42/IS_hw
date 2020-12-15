import { PureComponent } from 'react';
import { getTimeRange } from '../../utils';
import CalendarDayTime from '../CalendarDayTime/CalendarDayTime';
import './CalendarDay.css';

class CalendarDay extends PureComponent {

  storageStateName = 'CALENDAR_DAY_STORAGE';
  startHour = 8;
  startMinute = 0;
  endHour = 20;
  endMinute = 0;
  deltaMin = 20;

  state = {
    year: null,
    month: null,
    day: null,
  }

  saveStateLocally = () => {
    localStorage.setItem(this.storageStateName, JSON.stringify(this.state));
  };

  componentDidMount() {
    const state = this.props.location.state;
    if (state) {
      this.setState({
        ...state
      }, this.saveStateLocally);
    } else {
      this.setState({
        ...JSON.parse(localStorage.getItem(this.storageStateName))
      });
    }
  }

  render() {
    const {year, month, day} = this.state;
    const timeArr = getTimeRange(new Date(year, month, day, this.startHour, this.startMinute),
                 new Date(year, month, day, this.endHour,this.endMinute), this.deltaMin);

    return (
      <div className="cards-container">
        {timeArr.map((time, index) => <CalendarDayTime time={time} key={`time-${index}`}/>)}
      </div>
    );
  }
}

export default CalendarDay;
