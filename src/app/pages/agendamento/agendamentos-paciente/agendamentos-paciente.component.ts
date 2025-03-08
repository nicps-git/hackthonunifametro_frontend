import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomDialogComponent } from 'src/app/shared/components/custom-dialog/custom-dialog.component';
import { AgendamentosPorPaciente } from 'src/app/shared/model/agendamento.model';
import { AgendamentoService } from 'src/app/shared/service/agendamento/agendamento.service';
import { AuthService } from 'src/app/shared/service/auth-service/auth.service';

@Component({
  selector: 'app-agendamentos-paciente',
  templateUrl: './agendamentos-paciente.component.html',
  styleUrls: ['./agendamentos-paciente.component.css']
})
export class AgendamentosPacienteComponent implements OnInit {

  public agendamentos: AgendamentosPorPaciente[] = []
  private _snackBar = inject(MatSnackBar);
  

  constructor(private agendamentoService: AgendamentoService, private authService : AuthService, private dialog:MatDialog){}

  ngOnInit(): void {
    this.getAgendamentos()
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 30000,
    });
  }

  getAgendamentos(){
    this.agendamentoService.agendamentosPorPaciente(this.authService.idUser()).subscribe(
      {
        next: (resp: any) => {
          if (resp?.data) {
            this.agendamentos = resp.data;
          }
        },
        error: (err) => {
          console.error('Erro ao trazer agendamentos:', err);
          this.openSnackBar(
            'Erro ao trazer agendamentos. Tente novamente.',
            'Fechar'
          );
        },
      }
    )
  }


   launchCancelDialog(idAgendamento: string){
      const dialogRef = this.dialog.open(CustomDialogComponent, {
        data:{
          title:"Cancelar agendamento",
          message:"Tem certeza que deseja cancelar esse agendamento?"
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.agendamentoService.cancelarAgendamento(idAgendamento).subscribe({
            next: (resp: any) => {
              if (resp?.data) {
                this.openSnackBar(
                  'Agendamento cancelado com sucesso!.',
                  ''
                );
                this.getAgendamentos();
              }
            },
            error: (err) => {
              console.error('Erro ao trazer agendamentos:', err);
              this.openSnackBar(
                'Erro ao trazer agendamentos. Tente novamente.',
                'Fechar'
              );
            },
          })
        }
        else {
          console.log("não excluir")
        }
      })
    }
}
