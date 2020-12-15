import { Fragment, PureComponent } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import './App.css';
import '../../common.css';

import { connect } from 'react-redux';
import { getRecordsAction } from '../../store/actions';

import Calendar from '../Calendar/Calendar';
import CalendarDay from '../CalendarDay/CalendarDay';
import api from '../../api/api';


class App extends PureComponent {
  async componentDidMount() {
    const { recordsList, ok }  = await api.getRecords();
    if (!ok) {
      return;
    }
    this.props.getReportsDispatch(recordsList);
  }

  render() {
    return (
      <Fragment>
        <Router>
          <header id="main-header">
              <Link to='/' id="main-header-title">
              Hospital
              </Link>
          </header>
          <main id="main-container">
            <Switch>
              <Route exact path="/" component={Calendar} />
              <Route path="/day" component={CalendarDay} />
            </Switch>
          </main>
        </Router>
      </Fragment>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  getReportsDispatch: (records) => dispatch(getRecordsAction(records)),
});

export default connect(
  null,
  mapDispatchToProps
)(App);
