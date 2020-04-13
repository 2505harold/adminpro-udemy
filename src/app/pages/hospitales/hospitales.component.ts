import { Component, OnInit } from "@angular/core";
import { Hospital } from "src/app/models/hospital.model";
import Swal from "sweetalert2";
import { HospitalService } from "src/app/services/service.index";
import { ModalUploadService } from "src/app/components/modal-upload/modal-upload.service";

@Component({
  selector: "app-hospitales",
  templateUrl: "./hospitales.component.html",
  styles: [],
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(() => {
      this.cargarHospitales();
    });
  }

  cargarHospitales() {
    this._hospitalService.cargarHospitales().subscribe((resp: any) => {
      this.hospitales = resp;
    });
  }

  buscarHospital(valor: string) {
    if (valor.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this._hospitalService.buscarHospital(valor).subscribe((resp) => {
      this.hospitales = resp;
    });
  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital).subscribe();
  }

  borrarHospital(hospital: Hospital) {
    Swal.fire({
      title: "Estas seguro?",
      text: "Esta accion no podra ser invertida!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si borrarlo!",
    }).then((result) => {
      if (result.value) {
        this._hospitalService.borrarHospital(hospital._id).subscribe(
          (resp) => {
            this.cargarHospitales();
            Swal.fire(
              "Borrado!",
              "El hospital " + hospital.nombre + " fue borrado",
              "success"
            );
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  async crearHospital(hospital: Hospital) {
    const { value: text } = await Swal.fire({
      input: "text",
      inputPlaceholder: "Type your message here...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    });

    if (text) {
      const hospital = new Hospital(text, localStorage.getItem("id"));
      this._hospitalService.crearHospital(hospital).subscribe(
        (hospital) => {
          this.cargarHospitales();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal("hospitales", id);
  }
}
