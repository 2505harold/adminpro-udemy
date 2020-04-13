import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "src/app/config/config";
import { map } from "rxjs/operators";
import { UsuarioService } from "../usuario/usuario.service";
import Swal from "sweetalert2";
import { Medico } from "src/app/models/medico.model";

@Injectable()
export class MedicoService {
  totalMedicos: number = 0;
  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) {}

  cargarMedicos() {
    const url = URL_SERVICIOS + "/medico";
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalMedicos = resp.total;
        return resp.medicos;
      })
    );
  }

  cargarMedico(id: string) {
    const url = URL_SERVICIOS + "/medico/" + id;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.medico;
      })
    );
  }

  borrarMedicos(id: string) {
    const url =
      URL_SERVICIOS + "/medico/" + id + "?token=" + this._usuarioService.token;
    return this.http.delete(url).pipe(
      map((resp) => {
        Swal.fire({
          icon: "success",
          title: "Medico borrado",
          text: "Medico fue borrado",
        });
      })
    );
  }

  buscarMedicos(termino: string) {
    const url = URL_SERVICIOS + "/busqueda/coleccion/medicos/" + termino;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.medicos;
      })
    );
  }

  guardarMedico(medico: Medico) {
    let url = URL_SERVICIOS + "/medico";

    if (medico._id) {
      //actualizando
      url += "/" + medico._id + "?token=" + this._usuarioService.token;
      return this.http.put(url, medico).pipe(
        map((resp: any) => {
          Swal.fire({
            icon: "success",
            title: "Accion realizada",
            text: "Medico fue actualizado satisfactoriamente",
            showConfirmButton: false,
            timer: 1500,
          });
          return resp.medico;
        })
      );
    } else {
      //creando
      url += "?token=" + this._usuarioService.token;
      return this.http.post(url, medico).pipe(
        map((resp: any) => {
          Swal.fire({
            icon: "success",
            title: "Accion realizada",
            text: "Medico fue creado satisfactoriamente",
            showConfirmButton: false,
            timer: 1500,
          });
          return resp.medico;
        })
      );
    }
  }
}
