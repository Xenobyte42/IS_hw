import { PureComponent } from 'react';
import { addRecordAction, editRecordAction, removeRecordAction } from '../../store/actions';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import './CalendarDayTime.css';

import api from '../../api/api';


class CalendarDayTime extends PureComponent {

  state = {
    isInputState: false,
    inputValue: ''
  }

  onEdit = () => {
    const record = this.getRecordByTime();
    if (record) {
      this.setState({
        inputValue: record.patientName
      });
    }
    this.setState({
      isInputState: true
    });
  };

  onChange = (event) => {
    this.setState({
      inputValue: event.target.value
    });
  };

  onKeyDown = async (event) => {
    if (event.key === 'Escape') {
      this.setState({
        isInputState: false,
        inputValue: ''
      });
    }

    if (event.key === 'Enter') {
      const record = this.getRecordByTime();
      const newName = this.state.inputValue.trim()
      this.setState({
        isInputState: false,
        inputValue: ''
      });

      if (newName) {
        if (record) {
          const { ok } = await api.editRecord({record, newName});
          if (!ok) {
            return;
          }
          this.props.editRecordDispatch({
            record,
            newName
          });
        } else {
          const { ok } = await api.addRecord({
            patientName: newName,
            date: this.props.time
          })
          if (!ok) {
            return;
          }
          this.props.addRecordDispatch({
            patientName: newName,
            date: this.props.time
          });
        }
      }
    }
  };

  onRemove = async () => {
    const record = this.getRecordByTime();
    const { ok } = await api.removeRecord(record);
    if (!ok) {
      return;
    }
    this.props.removeRecordDispatch(record);
  };

  getRecordByTime = () => {
    return this.props.recordsList.find((record) => (
      record.date.getFullYear() === this.props.time.getFullYear() && 
      record.date.getMonth() === this.props.time.getMonth() && 
      record.date.getDate() === this.props.time.getDate() && 
      record.date.getHours() === this.props.time.getHours() && 
      record.date.getMinutes() === this.props.time.getMinutes()
    ));
  };

  render() {
    const { time } = this.props;
    const { isInputState, inputValue } = this.state;
    const record = this.getRecordByTime();

    return (
      <div className={`cards-day ${record ? '' : 'cards-day-free'}`}>
        <div className="cards-day-time">
          {`${time.getHours() < 10 ? `0${time.getHours()}` : `${time.getHours()}`}:${
            time.getMinutes() < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()}`}`}
        </div>
        {isInputState 
           ? <input className="cards-patient-input" type="text" placeholder="Имя пациента" 
              value={inputValue} onChange={this.onChange} onKeyDown={this.onKeyDown}/>
           : <div className="cards-day-patient">{record ? record.patientName : ''}</div>}
        <div className="cards-day-controls">
          <div className="cards-day-edit" onClick={this.onEdit}></div>
          {record && <div className="cards-day-remove" onClick={this.onRemove}></div>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ recordsList }) => ({ recordsList });
const mapDispatchToProps = dispatch => ({
  addRecordDispatch: (props) => dispatch(addRecordAction(props)),
  editRecordDispatch: (props) => dispatch(editRecordAction(props)),
  removeRecordDispatch: (props) => dispatch(removeRecordAction(props))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CalendarDayTime));
