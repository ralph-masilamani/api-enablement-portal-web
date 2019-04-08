import axios from 'axios';

/*
* Acts as an http transport layer for REST operations.
* TODO error handling !
*/
export default class TransportLayer {

    get(url: string) {
        return axios.get(url);
    }

    post(url: string, body: any) {
        return axios.post(url, body);
    }
}