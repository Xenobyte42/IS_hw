
import {
    ADD_RECORD,
    EDIT_RECORD,
    REMOVE_RECORD,
    GET_RECORDS
} from './actions';

const initialState = {
    recordsList: []
};

const isEqual = (obj1, obj2) => {
  if (obj1.patientName !== obj2.patientName) {
    return false;
  }

  if (obj1.date.getTime() !== obj2.date.getTime()) {
    return false;
  }

  return true;
};

export default function reducer(state=initialState, {type, payload}) {
    switch(type) {
      case GET_RECORDS:
        return {
          ...state,
          recordsList: payload
        }
      case ADD_RECORD:
        return {
          ...state,
          recordsList: [
            ...state.recordsList, payload
          ]
        };
      case EDIT_RECORD:
        return {
          ...state,
          recordsList: state.recordsList.map((record) => {
            if (isEqual(record, payload.record)) {
              return {
                ...record,
                patientName: payload.newName
              };
            }
            return record;
          })
        };
      case REMOVE_RECORD:
        return {
          ...state,
          recordsList: state.recordsList.filter((record) => (!isEqual(record, payload)))
        };
      default:
        return state;
    }
}
