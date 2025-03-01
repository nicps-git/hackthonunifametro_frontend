import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCpfFormat]'
})
export class CpfFormatDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any) {
    let value = this.el.nativeElement.value;

    // Remove tudo que não for número
    value = value.replace(/\D/g, '');

    // Limita o CPF a 11 dígitos
    if (value.length > 11) {
      value = value.substring(0, 11);
    }

    // Aplica a formatação: 000.000.000-00
    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{0,3})/, '$1.$2');
    }

    // Atualiza o valor no input
    this.el.nativeElement.value = value;
  }

}
