import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingSettingsComponent } from './scheduling-settings.component';

describe('SchedulingSettingsComponent', () => {
  let component: SchedulingSettingsComponent;
  let fixture: ComponentFixture<SchedulingSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchedulingSettingsComponent]
    });
    fixture = TestBed.createComponent(SchedulingSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
