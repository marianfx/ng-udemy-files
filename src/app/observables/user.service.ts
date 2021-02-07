import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class UserService {
  activatedEmitter = new Subject<boolean>();
}
