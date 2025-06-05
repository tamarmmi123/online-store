import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockRouter = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: mockRouter },
        {
          provide: UserService,
          useValue: {
            isLoggedIn: () => true
          }
        }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if user is logged in', () => {
    expect(guard.canActivate()).toBeTrue();
  });

  it('should deny activation and redirect if user is not logged in', () => {
    TestBed.overrideProvider(UserService, {
      useValue: {
        isLoggedIn: () => false
      }
    });

    const newGuard = TestBed.inject(AuthGuard);

    expect(newGuard.canActivate()).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});