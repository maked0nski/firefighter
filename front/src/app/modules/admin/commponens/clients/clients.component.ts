import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatAccordion, MatExpansionPanel} from "@angular/material/expansion";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";

import {IClient} from "../../../../interfaces";
import {ClientsService} from "../../service";

@Component({
  selector: 'app-client',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'city', 'address', 'edit', 'delete'];
  table: MatTableDataSource<IClient>;
  arrey: IClient[];
  form: UntypedFormGroup;
  forUpdate: IClient | null;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild(MatExpansionPanel) pannel?: MatExpansionPanel;


  constructor(
    private clientService: ClientsService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
    activatedRoute.data.subscribe(value => {
      this.arrey = value['clients'];
      this._createTable()
    })
    this._createForm()
  }

  ngOnInit(): void {
  }

  _createForm(): void {    //ToDo Написати валідатори на всі форми
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(null, Validators.required),
      city: new UntypedFormControl(null, [Validators.required]),
      address: new UntypedFormControl(null, [Validators.required]),
      coordinate: new UntypedFormControl(null, [Validators.required]),
      service_contract: new UntypedFormControl(null),
    })
  }

  _createTable(): void {
    this.table = new MatTableDataSource(this.arrey);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.table.filter = filterValue.trim().toLowerCase();
  }

  // create() {
  //   this.clientService
  //     .create(this.form.getRawValue())
  //     .subscribe(value => {
  //       this.arrey.push(value);
  //       this._createTable();
  //       this.pannel?.close();
  //       this.form.reset();
  //     })
  // }

  save(): void {
    if (!this.forUpdate) {
      this.clientService
        .create(this.form.getRawValue())
        .subscribe(value => {
          this.arrey.push(value);
          this.form.reset();
          // this.form.untouched;
          this._createTable();
          this.pannel?.close();
          this.form.reset();
        })
    } else {
      this.clientService
        .update(this.forUpdate.id, this.form.getRawValue())
        .subscribe(value => {
          let card = this.arrey.find(f => f.id === this.forUpdate?.id);

          Object.assign(card!, value);
          this.forUpdate = null;
          this.form.reset();
          // this.form.untouched;
          this._createTable();
          this.pannel?.close();
          this.form.reset();
        })
    }

    if (!this.pannel) return;  // перевіряю та закриваю панель редагування Карточок
    this.pannel.close();
  }

  delete(id: number, templateRef: any) {
    this.openDialog(templateRef)
  }

  openDialog(templateRef: any): void {
    this.dialog.open(templateRef, {
      width: '400px'
    });
  }


  edit(element: IClient): void {
    this.forUpdate = element;
    this.form.setValue({
      name: element.name,
      city: element.city,
      address: element.address,
      coordinate: element.coordinate,
      service_contract: element.service_contract,
    })
    if (!this.pannel) {
      return
    }
    this.pannel.open()
  }

  onNoClick(): void {
    this.dialog.closeAll();
  }

}
