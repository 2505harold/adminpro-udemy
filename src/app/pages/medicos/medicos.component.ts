import { Component, OnInit } from "@angular/core";
import { MedicoService } from "src/app/services/service.index";
import { Medico } from "src/app/models/medico.model";

@Component({
  selector: "app-medicos",
  templateUrl: "./medicos.component.html",
  styles: [],
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  constructor(public _medicoService: MedicoService) {}

  ngOnInit() {
    this.cargarMedicos();
  }

  editarMedico() {}

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this._medicoService.buscarMedicos(termino).subscribe((resp) => {
      this.medicos = resp;
    });
  }

  borrarMedico(medico: Medico) {
    this._medicoService.borrarMedicos(medico._id).subscribe(() => {
      this.cargarMedicos();
    });
  }

  crearMedico() {}

  cargarMedicos() {
    this._medicoService.cargarMedicos().subscribe((resp) => {
      this.medicos = resp;
    });
  }
}
