import { Injectable } from "@angular/core";
import { Usuario } from "src/app/models/usuario.model";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "src/app/config/config";
import { map } from "rxjs/operators";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Injectable()
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router) {
    console.log("servicio de usuario listo");
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
}
