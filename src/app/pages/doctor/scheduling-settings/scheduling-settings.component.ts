import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DoctorScheduleService } from 'src/app/shared/service/doctor-schedule-service/doctor-schedule.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-scheduling-settings',
  templateUrl: './scheduling-settings.component.html',
  styleUrls: ['./scheduling-settings.component.css']
})
export class SchedulingSettingsComponent {

  scheduleForm: FormGroup;
  schedule:{weekDay:string, time:string}[] = [];

  constructor(private fb: FormBuilder, private scheduleService:DoctorScheduleService, private snackBar: MatSnackBar,) {
    this.scheduleForm = this.fb.group({
      Segunda: [false],
      Terca: [false],
      Quarta: [false],
      Quinta: [false],
      Sexta: [false],
      Sabado: [false],
      Domingo: [false],

      horarioSegunda: ['', Validators.required],
      horarioTerca: [''],
      horarioQuarta: [''],
      horarioQuinta: [''],
      horarioSexta: [''],
      horarioSabado: [''],
      horarioDomingo: ['']
    });

    this.scheduleForm.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

  addWeekAndTime(weekDay:string, time:string){
    const formatedWeekday = weekDay.slice(0,3).toUpperCase();
    const idMedico = localStorage.getItem(environment.userIdKey);

    if(idMedico){
      this.scheduleService.setSchedule([
        {
          idMedico: idMedico,
          diaSemana:formatedWeekday,
          horario: time
        }
      ]
      ).subscribe({
        next: (res) => {
          this.schedule.push({
            weekDay: formatedWeekday,
            time: time
          })
        },
        error: (err) => {
          let errorMessage = "";
          if(err.status === 0){
            errorMessage = "Sistema temporatiamente indisponível";
          }
          console.log(err);
          this.snackBar.open(errorMessage, undefined, {duration: 3000});
        }
      })
    }
  }

  filterByWeekDay(weekDay:String){
    const formatedWeekday = weekDay.slice(0,3).toUpperCase();
    return this.schedule.filter(item => item.weekDay === formatedWeekday);
  }

  removeFromSchedule(item: {weekDay:string, time:string}){
    this.schedule = this.schedule.filter(sliceItem => item !== sliceItem);
  }

  saveAvailability() {
    const availabilityData = this.scheduleForm.value;
    console.log('Dados salvos: ', availabilityData);
  }
  
}
