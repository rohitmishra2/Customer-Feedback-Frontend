import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFeedback } from './user-feedback';

describe('UserFeedback', () => {
  let component: UserFeedback;
  let fixture: ComponentFixture<UserFeedback>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFeedback]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFeedback);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
