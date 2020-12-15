const ADD_RECORD = 'ADD_RECORD';
const EDIT_RECORD = 'EDIT_RECORD';
const REMOVE_RECORD = 'REMOVE_RECORD';
const GET_RECORDS = 'GET_RECORDS';


const addRecordAction = (record) => ({
    type: ADD_RECORD,
    payload: record
});

const editRecordAction = ({ record, newName }) => ({
    type: EDIT_RECORD,
    payload: {
        record,
        newName
    }
});

const removeRecordAction = (record) => ({
    type: REMOVE_RECORD,
    payload: record
});

const getRecordsAction = (recordsList) => ({
    type: GET_RECORDS,
    payload: recordsList
});

export {
    ADD_RECORD,
    EDIT_RECORD,
    REMOVE_RECORD,
    GET_RECORDS,
    getRecordsAction,
    addRecordAction,
    editRecordAction,
    removeRecordAction
};
