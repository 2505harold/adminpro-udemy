import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from "@angular/core";

@Component({
  selector: "app-incrementador",
  templateUrl: "./incrementador.component.html",
  styles: []
})
export class IncrementadorComponent implements OnInit {
  @Input() porcentaje: number = 50;
  @Input("nombre") leyenda: string = "Leyenda";
  @ViewChild("txtProgress", { static: false }) txtProgress: ElementRef;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    console.log("Leyenda:", this.leyenda);
  }

  ngOnInit() {}

  onChanges(newValue: number) {
    //let elemHTML: any = document.getElementsByName("progreso")[0];
    //console.log(this.txtProgress);

    if (newValue >= 100) {
      this.porcentaje = 100;
    } else if (newValue <= 0) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = newValue;
    }
    //elemHTML.value = this.porcentaje;
    this.txtProgress.nativeElement.value = this.porcentaje;

    this.cambioValor.emit(this.porcentaje);
  }

  cambiarvalor(valor) {
    if (this.porcentaje >= 100 && valor == 5) {
      this.porcentaje = 100;
      return;
    }
    if (this.porcentaje <= 0 && valor == -5) {
      this.porcentaje = 0;
      return;
    }
    this.porcentaje = this.porcentaje + valor;
    this.cambioValor.emit(this.porcentaje);
    this.txtProgress.nativeElement.focus()
  }
}
