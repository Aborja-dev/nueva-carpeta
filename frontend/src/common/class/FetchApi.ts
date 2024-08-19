/* eslint-disable @typescript-eslint/no-explicit-any */
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
        return this;
    }
    public post <T>(body: T) {
        this.config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
        return this;
    }

    public delete () {
        this.config = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return this;
    }

    public patch <T>(body: T) {
        this.config = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
        return this;
    }
    protected createPath (path: string) {
        return `${this._url}/${path}`
    }
    public fetch (path: string) {
        const url = this.createPath(path);
        return fetch(url, this.config);
    }
    
}

export class FetchApiWithToken extends FetchApiRequest {
    token!: string
    constructor (url: string, token: string, config?:any) {
        super(url, config);
        this.token = token;
    }

    public fetch (path: string) {
        const url = this.createPath(path);
        return fetch(url, {
            ...this.config,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            }
        });
    }
}