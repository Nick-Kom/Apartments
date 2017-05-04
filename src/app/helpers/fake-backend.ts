import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export const fakeBackendProvider = {
    // provide: Http,
    // useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
    //
    //     // configure fake backend
    //     backend.connections.subscribe((connection: MockConnection) => {
    //         let testUser = {id: 1, email: 'admin', password: 'admin', firstName: 'admin', lastName: 'admin' };
    //
    //         setTimeout(() => {
    //
    //             // fake authenticate api end point
    //             if (connection.request.url.endsWith('/api/login') && connection.request.method === RequestMethod.Post) {
    //                 let params = JSON.parse(connection.request.getBody());
    //
    //                 // check user credentials and return fake jwt token if valid
    //                 if (params.email === testUser.email && params.password === testUser.password) {
    //                     connection.mockRespond(new Response(
    //                         new ResponseOptions({ status: 200, body: { token: 'fake-jwt-token' } })
    //                     ));
    //                 } else {
    //                     connection.mockRespond(new Response(
    //                         new ResponseOptions({ status: 200 })
    //                     ));
    //                 }
    //             }
    //
    //             if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
    //                 // check for fake auth token in header and return test users if valid, this security is implemented server side
    //                 // in a real application
    //                 if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
    //                     connection.mockRespond(new Response(
    //                         new ResponseOptions({ status: 200, body: [testUser] })
    //                     ));
    //                 } else {
    //                     // return 401 not authorised if token is null or invalid
    //                     connection.mockRespond(new Response(
    //                         new ResponseOptions({ status: 401 })
    //                     ));
    //                 }
    //             }
    //
    //         }, 500);
    //
    //     });
    //
    //     return new Http(backend, options);
    // },
    // deps: [MockBackend, BaseRequestOptions]
};