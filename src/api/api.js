import doFetch from './ajax';


class API {

  hostPort = 'http://localhost:7355';

  _sendRequest = async (url, method, body={}) => {
    const response = await doFetch({
        path: this.hostPort + url,
        body: body,
        method: method,
      })
    if (!response.ok) {
      throw response.statusText;
    }
    const ok = response.status === 200 || response.status === 201;
    if (method === 'GET') {
      const data = await response.json();
      return {data: data, ok: ok};
    }
    return {ok : ok};
  }

  getRecords = async () => {
    const { data, ok } = await this._sendRequest('/records', 'GET');
    return { recordsList: data.map((rec) => ({...rec, date: new Date(rec.date)})), ok: ok };
  }
  
  addRecord = async (record) => {
    const response = await this._sendRequest('/records', 'POST', record);
    return response;
  }

  editRecord = async ({record, newName}) => {
    const response = await this._sendRequest('/records', 'PATCH', {record: record, newName: newName});
    return response;
  }

  removeRecord = async (record) => {
    const response = await this._sendRequest('/records', 'DELETE', record);
    return response;
  }
}

const api = new API();
export default api;