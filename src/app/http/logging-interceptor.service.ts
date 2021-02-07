import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { tap } from "rxjs/operators";

export class LoggingInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Request passed: " + req.url);
    return next.handle(req).pipe(tap(event => {
      if (event.type === HttpEventType.Response)
        console.log("Response coming: " + req.url);
    }));
  }
}
