import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialogComponent } from 'src/app/shared/components/custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private dialog:MatDialog){}

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
}
