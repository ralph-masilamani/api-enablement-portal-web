

export class EnvConfig {

    public baseApiUrl: string

    constructor(
        public apiUrl: any,
        public homeUri: any,
       
    ) {
        console.log('configured env api url', this.apiUrl)
        console.log('configured env home uri', this.homeUri)
        if (this.apiUrl && this.homeUri) {
            this.baseApiUrl = this.apiUrl + this.homeUri;
        } else {
            this.baseApiUrl = 'NOT SET'
        }
    }
}

const environment: EnvConfig = new EnvConfig(
    process.env.REACT_APP_BASE_API_URL,
    process.env.REACT_APP_PLATFORM_HOME_URI
)

export default environment;
