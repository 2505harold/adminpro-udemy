import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { UsuarioService } from "../services/service.index";
import { Usuario } from "../models/usuario.model";
import { Router } from "@angular/router";

declare function init_plugins();

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./login.component.css"]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }
      return {
        //el error que va a impedir que el formulario sea valido
        sonIguales: true
      };
    };
  }

  constructor(public _usuarioService: UsuarioService, public router: Router) {}

  ngOnInit() {
    init_plugins();
    this.form = new FormGroup(
      {
        nombre: new FormControl(null, Validators.required),
        correo: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        condiciones: new FormControl(false)
      },
      { validators: this.sonIguales("password", "password2") }
    );

    this.form.setValue({
      nombre: "test2",
      correo: "test2@test.com",
      password: "1234",
      password2: "1234",
      condiciones: true
    });
  }

  registrarUsuario() {
    if (this.form.invalid) {
      return;
    }
    if (!this.form.value.condiciones) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "No has aceptado las condiciones"
      });
      return;
    }

    const usuario = new Usuario(
      this.form.value.nombre,
      this.form.value.correo,
      this.form.value.password
    );

    this._usuarioService.crearUsuario(usuario).subscribe(resp => {
      this.router.navigate(["login"]);
    });
  }
}
