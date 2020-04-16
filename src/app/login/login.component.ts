import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UsuarioService } from "../services/service.index";
import { Usuario } from "../models/usuario.model";
import Swal from "sweetalert2";

declare function init_plugins();

declare const gapi: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  recuerdame: boolean = false;
  auth2: any;
  email: string;
  constructor(public router: Router, public _usuarioService: UsuarioService) {}

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem("email") || "";
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load("auth2", () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          "421910354465-pcgukgl5hr2q5bj471mehldb8neu40k7.apps.googleusercontent.com",
        cookiepolicy: "single_host_origin",
        scope: "profile email",
      });

      this.attachSignin(document.getElementById("btn-google"));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      //const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle(token).subscribe((resp) => {
        if (resp) window.location.href = "#/dashboard";
      });
    });
  }

  ingresar(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const usuario = new Usuario(null, form.value.email, form.value.password);
    this._usuarioService
      .login(usuario, form.value.recuerdame)
      .subscribe((resp) => {
        this.router.navigate(["/dashboard"]);
      });
    //this.router.navigate(["/dashboard"]);
  }
}
