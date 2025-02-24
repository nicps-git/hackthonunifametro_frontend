import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-with-loading',
  templateUrl: './button-with-loading.component.html',
  styleUrls: ['./button-with-loading.component.css']
})
export class ButtonWithLoadingComponent {

  @Input()
  isLoading:Boolean = false;

  @Input()
  isDisabled:Boolean = false;

  @Input()
  text:string = "Click me";

  @Output()
  clicked = new EventEmitter<void>();
}
