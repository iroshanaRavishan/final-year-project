import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignersSignupComponent } from './designers-signup.component';

describe('DesignersSignupComponent', () => {
  let component: DesignersSignupComponent;
  let fixture: ComponentFixture<DesignersSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignersSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignersSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
