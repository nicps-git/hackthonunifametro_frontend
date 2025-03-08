import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamentosPacienteComponent } from './agendamentos-paciente.component';

describe('AgendamentosPacienteComponent', () => {
  let component: AgendamentosPacienteComponent;
  let fixture: ComponentFixture<AgendamentosPacienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgendamentosPacienteComponent]
    });
    fixture = TestBed.createComponent(AgendamentosPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
