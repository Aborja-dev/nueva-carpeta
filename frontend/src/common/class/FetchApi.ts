export class FetchApiRequest {
    config!: any
    _url!: string
    constructor (url: string, config?:any) {
        this._url = url;
        this.config = config;
    }
    public get () {
        this.config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return new FetchApiRequest(this._url, this.config);
    }
    public post <T>(body: T) {
        this.config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
        return new FetchApiRequest(this._url, this.config);
    }
    private createPath (path: string) {
        return `${this._url}/${path}`
    }
    public fetch (path: string) {
        const url = this.createPath(path);
        return fetch(url, this.config);
    }
}