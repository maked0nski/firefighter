import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../../../services";
import {IClient, Ifire_extinguishers, IFireExtinguishers} from "../../../../interfaces";
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatExpansionPanel} from "@angular/material/expansion";
import {FireExtinguishersService} from "../../service";

@Component({
  selector: 'app-fire-extinguishers',
  templateUrl: './fire-extinguishers.component.html',
  styleUrls: ['./fire-extinguishers.component.css']
})
export class FireExtinguishersComponent implements OnInit {

  displayedColumns: string[] = ['model', 'quantity', 'next_check', 'edit', 'delete'];


  client: IClient | undefined;
  form: UntypedFormGroup;
  table: MatTableDataSource<IFireExtinguishers>;

  fire_extinguishers: IFireExtinguishers[] = [];

  forUpdate: IFireExtinguishers | null;

  @ViewChild(MatExpansionPanel) pannel?: MatExpansionPanel;



  list_fire_extinguishers: Ifire_extinguishers[] = [
    {value: 'ВП-1', viewValue: 'ВП-1'},
    {value: 'ВП-2', viewValue: 'ВП-2'},
    {value: 'ВП-3', viewValue: 'ВП-3'},
    {value: 'ВП-5', viewValue: 'ВП-5'},
    {value: 'ВП-6', viewValue: 'ВП-6'},
    {value: 'ВП-9', viewValue: 'ВП-9'},
    {value: 'ВП-45', viewValue: 'ВП-45'},
    {value: 'ВП-90', viewValue: 'ВП-90'},
    {value: 'ВВК-1,4', viewValue: 'ВВК-1,4'},
    {value: 'ВВК-3,5', viewValue: 'ВВК-3,5'},
    {value: 'ВВК-5', viewValue: 'ВВК-5'},
    {value: 'ВВК-18', viewValue: 'ВВК-18'},
    {value: 'ВВК-28', viewValue: 'ВВК-28'},
    {value: 'ВВК-56', viewValue: 'ВВК-56'},
  ];

  constructor(
    private dataService: DataService,
    private fireExtinguishersService: FireExtinguishersService
  ) {
    this.dataService.clientStorage.subscribe(value => {
      this.client = value
      if (value?.fire_extinguishers) {
        this.fire_extinguishers = value?.fire_extinguishers;
      }

      this._createTable()
    })
    this._createForm()
  }

  _createTable(): void {
    this.table = new MatTableDataSource(this.fire_extinguishers);
  }

  ngOnInit(): void {}

  save(): void {
    let rawValue = this.form.getRawValue();
    // console.log(rawValue)
    rawValue = {
      ...rawValue,
      reminding: true,
      quantity: Number(rawValue.quantity),
      firmId: this.client?.id
    }
    // console.log(rawValue)
    if (!this.forUpdate) {
      this.fireExtinguishersService
        .create(rawValue)
        .subscribe(value => {
          this.fire_extinguishers.push(value);
          this._createTable();
          this.pannel?.close();
          this.form.reset();
        })
    } else {
      rawValue = {
        ...rawValue,
        reminding: true,
        quantity: Number(rawValue.quantity),
        firmId: this.client?.id,
        id: Number(this.forUpdate.id)
      }
      this.fireExtinguishersService
        .update(this.forUpdate.id, rawValue)
        .subscribe(value => {
          let find = this.fire_extinguishers.find(f => f.id === this.forUpdate?.id);
          Object.assign(find!, value);
          this.forUpdate = null;
          this._createTable();
          this.pannel?.close();
          this.form.reset();
        })
    }
  }

  _createForm(): void {
    this.form = new UntypedFormGroup({
      model: new UntypedFormControl(null, Validators.required),
      quantity: new UntypedFormControl(null, Validators.required),
      next_check: new UntypedFormControl(null, [Validators.required]),
    })
  }

  edit(element: IFireExtinguishers): void {
    this.forUpdate = element
    this.form.setValue({
      model: this.forUpdate.model,
      quantity: Number(this.forUpdate.quantity),
      next_check: this.forUpdate.next_check
    })
    if (!this.pannel) {
      return
    }
    this.pannel.open()
  }

  delete(id: number) {
    this.fireExtinguishersService
      .delete(id)
      .subscribe(() => {
        let index = this.fire_extinguishers.findIndex(item => item.id===id);
        this.fire_extinguishers.splice(index,1);
        this._createTable();
      })
  }
}
