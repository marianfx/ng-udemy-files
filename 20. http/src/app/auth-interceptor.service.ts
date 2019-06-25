import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // control access based on url.
    // can modify the req, but clone it first
    const modifiedReq = req.clone( { headers: req.headers.append("Auth", 'xyz') } );

    // runs right before the request leaves the app
    console.log("Auth headers was set");
    return next.handle(modifiedReq);
  }
}
