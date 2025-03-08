import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DoctorScheduleService } from 'src/app/shared/service/doctor-schedule-service/doctor-schedule.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-scheduling-settings',
  templateUrl: './scheduling-settings.component.html',
  styleUrls: ['./scheduling-settings.component.css']
})
export class SchedulingSettingsComponent implements OnInit{

  scheduleForm: FormGroup;
  schedule:{weekDay:string, time:string}[] = [];
  availableTime:string[] = []

  constructor(private fb: FormBuilder, private scheduleService:DoctorScheduleService, private snackBar: MatSnackBar,) {
    this.scheduleForm = this.fb.group({
      horarioSegunda: ['', Validators.required],
      horarioTerca: ['', Validators.required],
      horarioQuarta: ['', Validators.required],
      horarioQuinta: ['', Validators.required],
      horarioSexta: ['', Validators.required],
      horarioSabado: ['', Validators.required],
      horarioDomingo: ['', Validators.required]
    });

    for(let i = 0;i<=24;i++){
      let time = `${i}`
      if(i < 10){
        time = `0${i}`
      }
      this.availableTime.push(`${time}:00`)
    }

    this.scheduleForm.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

  
  ngOnInit(): void {
    const idMedico = localStorage.getItem(environment.userIdKey);
    console.log(idMedico)
    if(idMedico)
      this.scheduleService.getSchedule(idMedico, 0, 50).subscribe({
        next: res => {
          for(let item of res.data){
            this.schedule.push({weekDay: item.diaSemana, time: item.horario})
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
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
          else {
            errorMessage = "Horário inválido"
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
    const idMedico = localStorage.getItem(environment.userIdKey);
    if(idMedico){
      this.scheduleService.removeFromSchedule(idMedico, item.weekDay, item.time).subscribe({
        next: (res) =>{
          this.schedule = this.schedule.filter(sliceItem => item !== sliceItem);
        },
        error: (err) => {
          let errorMessage = "";
          if(err.status === 0){
            errorMessage = "Sistema temporatiamente indisponível";
          }
          else {
            errorMessage = "Não foi pssível completar solicitação"
          }
          console.log(err);
          this.snackBar.open(errorMessage, undefined, {duration: 3000});
        }
      })
      
    }
  }

  saveAvailability() {
    const availabilityData = this.scheduleForm.value;
    console.log('Dados salvos: ', availabilityData);
  }
  
}
