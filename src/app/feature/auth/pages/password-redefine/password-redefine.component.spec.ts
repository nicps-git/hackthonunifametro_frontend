import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRedefineComponent } from './password-redefine.component';

describe('PasswordRedefineComponent', () => {
  let component: PasswordRedefineComponent;
  let fixture: ComponentFixture<PasswordRedefineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordRedefineComponent]
    });
    fixture = TestBed.createComponent(PasswordRedefineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
