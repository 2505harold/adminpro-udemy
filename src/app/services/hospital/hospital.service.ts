import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "src/app/config/config";
import { Hospital } from "src/app/models/hospital.model";
import { map } from "rxjs/operators";
import Swal from "sweetalert2";
import { UsuarioService } from "../usuario/usuario.service";

@Injectable()
export class HospitalService {
  //propiedades del servicio
  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) {}

  cargarHospitales(desde: number = 0) {
    const url = URL_SERVICIOS + "/hospital?desde=" + desde;
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalHospitales = resp.total;
        return resp.hospitales;
      })
    );
  }

  obtenerHospital(id: string) {
    const url = URL_SERVICIOS + "/hospital/" + id;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.hospital;
      })
    );
  }

  borrarHospital(id: string) {
    const url =
      URL_SERVICIOS +
      "/hospital/" +
      id +
      "?token=" +
      this._usuarioService.token;
    return this.http.delete(url);
  }

  crearHospital(hospital: Hospital) {
    const url = URL_SERVICIOS + "/hospital?token=" + this._usuarioService.token;
    return this.http.post(url, hospital).pipe(
      map((resp: any) => {
        Swal.fire({
          icon: "success",
          title: "Accion realizada",
          text: "Hospital fue creado satisfactoriamente",
          showConfirmButton: false,
          timer: 1500,
        });
        return resp.hospital;
      })
    );
  }

  buscarHospital(termino: string) {
    const url = URL_SERVICIOS + "/busqueda/coleccion/hospitales/" + termino;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.hospitales;
      })
    );
  }

  actualizarHospital(hospital: Hospital) {
    const url =
      URL_SERVICIOS +
      "/hospital/" +
      hospital._id +
      "?token=" +
      this._usuarioService.token;
    return this.http.put(url, hospital).pipe(
      map((resp: any) => {
        Swal.fire({
          icon: "success",
          title: "Accion realizada",
          text: "Hospital fue actualizado satisfactoriamente",
          showConfirmButton: false,
          timer: 1500,
        });
        return resp.hospital;
      })
    );
  }
}
