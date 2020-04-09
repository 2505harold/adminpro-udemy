import { NgModule } from "@angular/core";
import { ImagenPipe } from "./imagen.pipe";
//import { CommonModule } from '@angular/common'; //ngif, ngfor

@NgModule({
  declarations: [ImagenPipe],
  imports: [],
  exports: [ImagenPipe],
})
export class PipesModule {}
