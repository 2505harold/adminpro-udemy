import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/app/models/usuario.model";
import { UsuarioService } from "src/app/services/service.index";
import { ReturnStatement } from "@angular/compiler";
import Swal from "sweetalert2";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: [],
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;
  constructor(public _usuarioService: UsuarioService) {
    this.usuario = _usuarioService.usuario;
  }

  ngOnInit() {}

  guardar(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(this.usuario).subscribe();
  }

  seleccionImage(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    if (archivo.type.indexOf("image") < 0) {
      Swal.fire({
        icon: "warning",
        title: "Error de imagen",
        text: "Solo se puede importar archivos del tipo imagenes",
      });
    }
    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImageTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => {
      this.imagenTemp = reader.result.toString();
    };
  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }
}
