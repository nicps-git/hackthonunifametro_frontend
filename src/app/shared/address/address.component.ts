import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AddressService } from '../service/address-service/address.service';
import { estados } from '../util/mock-address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent {
  @Input() form!: FormGroup;

  public estados = estados
  public cidades: string[] = []

  constructor(private addressService: AddressService) {}

  searchByCep(cep: string) {
    if (cep.length >= 8) {
      this.addressService.getByCep(cep).subscribe((resp) => {
        this.cidadePorEstado(resp.state)
        this.form.get('endereco')?.get('logradouro')?.patchValue(resp.street)
        this.form.get('endereco')?.get('bairro')?.patchValue(resp.neighborhood)
        this.form.get('endereco')?.get('estado')?.patchValue(resp.state)
        this.form.get('endereco')?.get('cidade')?.patchValue(resp.city)
        console.log(this.form)
      });
    }
  }

  cidadePorEstado(uf: any){
    console.log(uf)
    const cidadePorEstado = this.estados.find(e => e.sigla == uf.value)?.cidades || [];
    console.log(this.estados.find(e => e.sigla == uf.value))
    this.cidades = cidadePorEstado;
  }
}
