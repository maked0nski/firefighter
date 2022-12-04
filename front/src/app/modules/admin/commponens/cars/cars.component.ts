import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatExpansionPanel} from "@angular/material/expansion";
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute} from "@angular/router";

import {ICar} from "../../../../interfaces";
import {CarsService} from "../../service";
import * as moment from "moment";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  displayedColumns: string[] = ['model', 'insurance', 'edit', 'delete'];

  table: MatTableDataSource<ICar>;

  list: ICar[];

  form: FormGroup;

  forUpdate: ICar | null;

  @ViewChild(MatExpansionPanel) pannel?: MatExpansionPanel;

  constructor(
    private carsService: CarsService,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.data.subscribe(value => {
      this.list = value['cars'];
      this._createTable();
    })
    this._createForm()
  }

  ngOnInit(): void {
    //
    //
    // let day = this.currentDate.date();
    // let month = this.currentDate.month()+1;
    // let year = this.currentDate.year();
    //
    //

  }

  private _createForm(): void {
    this.form = new FormGroup({
      vin: new FormControl(null, Validators.required),
      model: new FormControl(null, Validators.required),
      fuel: new FormControl(null, Validators.required),
      year: new FormControl(null, Validators.required),
      passport_car: new FormControl(null, Validators.required),
      oddometr: new FormControl(null, Validators.required),
      insurance: new FormControl(null, Validators.required),
    })
  }

  private _createTable(): void {
    this.table = new MatTableDataSource(this.list);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.table.filter = filterValue.trim().toLowerCase();
  }

  save(): void {

    if (!this.forUpdate) {
      this.carsService
        .create(this.form.getRawValue())
        .subscribe(value => {
          this.list.push(value);
          this.form.reset();
          this._createTable();
          this.pannel?.close()
        })
    } else {

      this.carsService
        .update(this.forUpdate.id, this.form.getRawValue())
        .subscribe(value => {
          let item = this.list.find(f => f.id === this.forUpdate?.id);
          Object.assign(item!, value);
          this.forUpdate = null;
          this.form.reset();
          this._createTable();
          this.pannel?.close()
        })
    }
  }

  edit(item: ICar): void {
    this.forUpdate = item;
    this.form.setValue({
      vin: item.vin,
      model: item.model,
      fuel: item.fuel,
      year: item.year,
      passport_car: item.passport_car,
      oddometr: item.oddometr,
      insurance: item.insurance,
    })
    if (!this.pannel) {
      return
    }
    this.pannel.open()
  }

  delete(id: string): void {
    this.carsService.delete(id).subscribe(() => {
      const index = this.list.findIndex(item => item.id === Number(id));
      this.list.splice(index, 1);
      this._createTable()
    })
  }
}
