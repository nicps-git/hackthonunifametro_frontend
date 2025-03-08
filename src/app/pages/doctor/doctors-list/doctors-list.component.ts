import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medico } from 'src/app/shared/model/medico.model';
import { MedicoService } from 'src/app/shared/service/medico/medico.service';
const ELEMENT_DATA: any[] = [
  { nome: 'Hydrogen', crm: 123456, email: 'teste@gmail.com', telefone: '8599999999' },
  { nome: 'Helium', crm: 123456, email: 'teste@gmail.com', telefone: '8599999999' },
  { nome: 'Lithium', crm: 123456, email: 'teste@gmail.com', telefone: '8599999999' },
  { nome: 'Beryllium', crm: 123456, email: 'teste@gmail.com', telefone: '8599999999' },
  { nome: 'Boron', crm: 123456, email: 'teste@gmail.com', telefone: '8599999999' },
  { nome: 'Carbon', crm: 123456, email: 'teste@gmail.com', telefone: '8599999999' },
  { nome: 'Nitrogen', crm: 123456, email: 'teste@gmail.com', telefone: '8599999999' },
  { nome: 'Oxygen', crm: 123456, email: 'teste@gmail.com', telefone: '8599999999' },
  { nome: 'Fluorine', crm: 123456, email: 'teste@gmail.com', telefone: '8599999999' },
  { nome: 'Neon', crm: 123456, email: 'teste@gmail.com', telefone: '8599999999' },
];

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css'],
})
export class DoctorsListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'crm', 'email', 'telefone', 'acoes'];

  dataSource: Medico[] = [];

  constructor(private router: Router, private medicoService : MedicoService){}

  ngOnInit(): void {
      this.medicoService.medicoAll().subscribe((resp => {
        this.dataSource = resp.data;
      }))
  }

  navigate(url:string){
    this.router.navigate([url]);
  }
}
