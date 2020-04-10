import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/app/models/usuario.model";
import { UsuarioService } from "src/app/services/service.index";
import Swal from "sweetalert2";
import { ModalUploadService } from "src/app/components/modal-upload/modal-upload.service";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styles: [],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistro: number = 0;
  cargando: boolean = true;
  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarUsuario();
    this._modalUploadService.notificacion.subscribe((resp) => {
      this.cargarUsuario();
    });
  }
  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal("usuarios", id);
  }

  cargarUsuario() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      this.totalRegistro = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }
  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if (desde >= this.totalRegistro) {
      return;
    }
    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuario();
  }

  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuario();
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuarios(termino).subscribe((usuarios) => {
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      Swal.fire({
        icon: "info",
        title: "Precaucion",
        text: "No puede borrarse asi mismo",
      });

      return;
    }

    Swal.fire({
      title: "Esta seguro?",
      text: "Esta a punto de borrar a " + usuario.nombre,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrarlo!",
    }).then((result) => {
      if (result.value) {
        this._usuarioService.borrarUsuario(usuario._id).subscribe((resp) => {
          this.cargarUsuario();
        });
        Swal.fire("Eliminado!", "El usuario fue eliminado", "success");
      }
    });
  }

  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }
}
