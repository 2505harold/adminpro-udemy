import { NgModule } from "@angular/core";
import { PAGES_ROUTES } from "./pages.routes";

import { SharedModule } from "../shared/shared.module";

import { FormsModule } from "@angular/forms";

// ng2-charts
import { ChartsModule } from "ng2-charts";

import { PagesComponent } from "./pages.component";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";

//temporal
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";
import { GraficarDonutsComponent } from "../components/graficar-donuts/graficar-donuts.component";

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficarDonutsComponent
  ],
  exports: [DashboardComponent, ProgressComponent, Graficas1Component],
  imports: [SharedModule, PAGES_ROUTES, FormsModule, ChartsModule]
})
export class PagesModule {}