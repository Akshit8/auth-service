import { Response } from 'express';
/*
    meta body interface
*/
interface metaInterface {
    msg: string;
    statusCode: number;
    error: boolean;
}
/*
    Http response template
*/
export class HttpResponse {
    data: any;

    meta: metaInterface;

    constructor(statusCode: number, data: any) {
        this.data = data;
        this.meta = {
            msg: 'SUCCESS',
            statusCode,
            error: false
        };
    }
}
/*
    Http response handler
*/
export const HttpResponseHandler = (response: HttpResponse, res: Response) => {
    const { data, meta } = response;
    if (data == null) {
        res.status(meta.statusCode).send(meta);
        return;
    }
    res.status(meta.statusCode).send({
        data,
        meta
    });
};
