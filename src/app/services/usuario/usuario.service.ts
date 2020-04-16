import { Injectable } from "@angular/core";
import { Usuario } from "src/app/models/usuario.model";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "src/app/config/config";
import { map, catchError } from "rxjs/operators";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { SubirArchivoService } from "../archivos/subir-archivo.service";
import { Observable } from "rxjs/internal/Observable";
import { throwError } from "rxjs";

@Injectable()
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any[] = [];

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
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      this.menu = JSON.parse(localStorage.getItem("menu"));
    } else {
      this.token = "";
      this.usuario = null;
      this.menu = [];
    }
  }

  logout() {
    this.usuario = null;
    this.token = "";
    this.menu = [];
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("menu");
    this.router.navigate(["/login"]);
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("menu", JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
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
      }),
      catchError((err) => {
        Swal.fire({
          icon: "error",
          title: err.error.mensaje,
          text: err.error.errors.message,
        });
        return throwError(err);
      })
    );
  }

  loginGoogle(token: string) {
    const url = URL_SERVICIOS + "/login/google";
    return this.http.post(url, { token }).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
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
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      }),
      catchError((err) => {
        Swal.fire({
          icon: "error",
          title: "Ocurrio un problema",
          text: err.error.mensaje,
        });
        return throwError(err);
      })
    );
  }

  actualizarUsuario(usuario: Usuario) {
    var url = URL_SERVICIOS + "/usuario/" + usuario._id;
    url += "?token=" + this.token;
    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
        if (usuario._id === this.usuario._id) {
          this.guardarStorage(
            resp.usuario._id,
            this.token,
            resp.usuario,
            this.menu
          );
        }

        Swal.fire({
          icon: "success",
          title: "Usuaio actualizado satisfactoriamente",
          showConfirmButton: false,
          timer: 1500,
        });

        return true;
      }),
      catchError((err) => {
        Swal.fire({
          icon: "error",
          title: err.error.mensaje,
          text: err.error.errors.message,
        });
        return throwError(err);
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
        this.guardarStorage(id, this.token, this.usuario, this.menu);
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
