import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "src/app/config/config";
import { Hospital } from "src/app/models/hospital.model";
import { Medico } from "src/app/models/medico.model";
import { Usuario } from "src/app/models/usuario.model";

@Component({
  selector: "app-busqueda",
  templateUrl: "./busqueda.component.html",
  styles: [],
})
export class BusquedaComponent implements OnInit {
  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];
  constructor(public activateRoute: ActivatedRoute, public http: HttpClient) {
    activateRoute.params.subscribe((params) => {
      let termino = params["termino"];
      this.buscar(termino);
    });
  }

  ngOnInit() {}

  buscar(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/todo/" + termino;
    this.http.get(url).subscribe((resp: any) => {
      console.log(resp);
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
      this.usuarios = resp.usuarios;
    });
  }
}
