import { Pipe, PipeTransform } from "@angular/core";
import { URL_SERVICIOS } from "../config/config";
import Swal from "sweetalert2";

@Pipe({
  name: "imagen",
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: string = "usuarios"): any {
    var url = URL_SERVICIOS + "/img";
    if (!img) {
      return url + "/usuarios/xxx";
    }

    if (img.indexOf("https") >= 0) {
      return img;
    }

    const tiposPermitidos = ["usuarios", "medicos", "hospitales"];

    if (tiposPermitidos.indexOf(tipo) < 0) {
      Swal.fire({
        icon: "warning",
        title: "Error",
        text:
          "Los tipos permitidos son " +
          tiposPermitidos.join(", ") +
          " y le ingresado fue " +
          tipo +
          " " +
          tiposPermitidos.indexOf(tipo),
      });
      return url + "/usuarios/xxx";
    }

    return url + "/" + tipo + "/" + img;
  }
}
