import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AddressService } from '../service/address-service/address.service';
import { estados } from '../util/mock-address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  @Input() form!: FormGroup;

  public estados = estados
  public cidades: string[] = []

  constructor(private addressService: AddressService, private cr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.form.get('endereco')?.get('estado')?.valueChanges.subscribe(uf => {
      const cidadePorEstado = this.estados.find(e => e.sigla == uf)?.cidades || [];
      this.cidades = cidadePorEstado;
    })  }

  searchByCep(cep: string) {
    if (cep.length >= 8) {
      this.addressService.getByCep(cep).subscribe((resp) => {
        this.form.get('endereco')?.get('logradouro')?.patchValue(resp.street)
        this.form.get('endereco')?.get('bairro')?.patchValue(resp.neighborhood)
        this.form.get('endereco')?.get('estado')?.patchValue(resp.state)
        this.form.get('endereco')?.get('cidade')?.patchValue(resp.city)
      });
    }
  }

  cidadePorEstado(uf: any){
    const cidadePorEstado = this.estados.find(e => e.sigla == uf.value)?.cidades || [];
    this.cidades = cidadePorEstado;
  }

}
