import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomDialogComponent } from 'src/app/shared/components/custom-dialog/custom-dialog.component';
import { AgendamentoService } from 'src/app/shared/service/agendamento/agendamento.service';
import { AuthService } from 'src/app/shared/service/auth-service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  agendamentos: any = []

  constructor(private dialog:MatDialog, private router: Router, private agendamentoService: AgendamentoService, private authService : AuthService){}

  launchCancelDialog(){
    const dialogRef = this.dialog.open(CustomDialogComponent, {
      data:{
        title:"Cancelar agendamento",
        message:"Tem certeza que deseja cancelar esse agendamento?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log("Excluir")
      }
      else {
        console.log("não excluir")
      }
    })
  }

    ngOnInit(): void {
        this.agendamentoService.agendamentosPorMedico(this.authService.idUser()).subscribe((resp => {
          this.agendamentos = resp.data;
        }))
    }

  navigate(url:string){
    this.router.navigate([url]);
  }
}
