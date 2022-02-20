import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsSignupComponent } from './shops-signup.component';

describe('ShopsSignupComponent', () => {
  let component: ShopsSignupComponent;
  let fixture: ComponentFixture<ShopsSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopsSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopsSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
