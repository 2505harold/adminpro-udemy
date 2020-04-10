import { Injectable } from "@angular/core";
import { Usuario } from "src/app/models/usuario.model";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "src/app/config/config";
import { map } from "rxjs/operators";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { SubirArchivoService } from "../archivos/subir-archivo.service";

@Injectable()
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  estaLogeado() {
    return this.token.length > 5 ? true : false;
  }

  cargarStorage() {
    this.token = localStorage.getItem("token");
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
  }

  logout() {
    this.usuario = null;
    this.token = "";
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    this.router.navigate(["/login"]);
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + "/usuario";
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        Swal.fire({
          icon: "success",
          title: "Usuaio creado satisfactoriamente",
          showConfirmButton: false,
          timer: 1500,
        });

        return resp.usuario;
      })
    );
  }

  loginGoogle(token: string) {
    const url = URL_SERVICIOS + "/login/google";
    return this.http.post(url, { token }).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem("email", usuario.email);
    } else {
      localStorage.removeItem("email");
    }

    const url = URL_SERVICIOS + "/login";
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  actualizarUsuario(usuario: Usuario) {
    var url = URL_SERVICIOS + "/usuario/" + usuario._id;
    url += "?token=" + this.token;
    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
        if (usuario._id === this.usuario._id) {
          this.guardarStorage(resp.usuario._id, this.token, resp.usuario);
        }

        Swal.fire({
          icon: "success",
          title: "Usuaio actualizado satisfactoriamente",
          showConfirmButton: false,
          timer: 1500,
        });

        return true;
      })
    );
  }

  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService
      .subirArchivo(archivo, "usuarios", id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        Swal.fire({
          icon: "success",
          title: "Imagen actualizada satisfactoriamente",
          showConfirmButton: false,
          timer: 1500,
        });
        this.guardarStorage(id, this.token, this.usuario);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  cargarUsuarios(desde: number = 0) {
    const url = URL_SERVICIOS + "/usuario?desde=" + desde;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    const url = URL_SERVICIOS + "/busqueda/coleccion/usuarios/" + termino;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.usuarios;
      })
    );
  }

  borrarUsuario(id: string) {
    const url = URL_SERVICIOS + "/usuario/" + id + "?token=" + this.token;
    return this.http.delete(url);
  }
}
