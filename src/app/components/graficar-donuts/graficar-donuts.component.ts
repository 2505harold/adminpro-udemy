import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Label, MultiDataSet } from "ng2-charts";
import { ChartType } from "chart.js";

@Component({
  selector: "app-graficar-donuts",
  templateUrl: "./graficar-donuts.component.html",
  styles: []
})
export class GraficarDonutsComponent implements OnInit {
  @Input() ChartLabels: Label[];
  @Input() ChartData: MultiDataSet = [];
  @Input() ChartType: ChartType;

  constructor() {}

  ngOnInit() {}
}
