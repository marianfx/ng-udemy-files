import { TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { UserService } from './user.service';

describe('UserComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent]
    });
  });

  it('should create the user component', () => {
    let fixture = TestBed.createComponent(UserComponent);
    let userComp = fixture.debugElement.componentInstance;
    expect(userComp).toBeTruthy();
  });

  it('should use the username from the service', () => {
    let fixture = TestBed.createComponent(UserComponent);
    let userComp = fixture.debugElement.componentInstance as UserComponent;
    let userService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();// detect how page is now after render
    expect(userService.user.name).toEqual(userComp.user.name);
  });

  it('should display the username if user is logged in', () => {
    let fixture = TestBed.createComponent(UserComponent);
    let userComp = fixture.debugElement.componentInstance as UserComponent;
    userComp.isLoggedIn = true;
    fixture.detectChanges();// detect how page is now after render
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain(userComp.user.name);
  });

  it('should not display the username if user is not logged in', () => {
    let fixture = TestBed.createComponent(UserComponent);
    let userComp = fixture.debugElement.componentInstance as UserComponent;
    userComp.isLoggedIn = false;
    fixture.detectChanges();// detect how page is now after render
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).not.toContain(userComp.user.name);
  });
});
