import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonWithLoadingComponent } from './button-with-loading.component';

describe('ButtonWithLoadingComponent', () => {
  let component: ButtonWithLoadingComponent;
  let fixture: ComponentFixture<ButtonWithLoadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonWithLoadingComponent]
    });
    fixture = TestBed.createComponent(ButtonWithLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
