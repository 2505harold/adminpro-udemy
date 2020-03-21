import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-promesas",
  templateUrl: "./promesas.component.html",
  styles: []
})
export class PromesasComponent implements OnInit {
  constructor() {
    //realizar cundo un intervalo de tiempo cumple 3 segundos

    this.contar3segundos()
      .then(() => console.log("termino"))
      .catch(error => console.log("Ocurrio in error, " + error));
  }

  ngOnInit() {}

  contar3segundos(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let contador = 0;

      let intervalo = setInterval(() => {
        contador += 1;
        console.log(contador);
        if (contador === 3) {
          resolve(true);
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }
}
