
export class EnvConfig {

    public apiUrl: any
    public homeUri: any
    public baseApiUrl: string

    constructor() {
        this.apiUrl = process.env.REACT_APP_BASE_API_URL;
        this.homeUri = process.env.REACT_APP_PLATFORM_HOME_URI;
        console.log('configured env api url ', this.apiUrl)
        console.log('configured env home uri ', this.homeUri)
        if (this.apiUrl && this.homeUri) {
            this.baseApiUrl = this.apiUrl + this.homeUri;
        } else {
            this.baseApiUrl = 'NOT SET'
            throw new Error('Unable to start application as env variables REACT_APP_BASE_API_URL and REACT_APP_PLATFORM_HOME_URI are not set' )
        }
    }
}

const environment: EnvConfig = new EnvConfig()

export default environment;
