import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {MatExpansionPanel} from "@angular/material/expansion";
import {MatTableDataSource} from "@angular/material/table";
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {IPosition} from "../../../../interfaces";
import {PositionService} from "../../service";

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  displayedColumns: string[] = ['position', 'edit', 'delete'];

  table: MatTableDataSource<IPosition>;

  positionList: IPosition[];

  form: UntypedFormGroup;

  forUpdate: IPosition | null;

  @ViewChild(MatExpansionPanel) pannel?: MatExpansionPanel;

  constructor(
    private positionService: PositionService,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.data.subscribe(value => {
      this.positionList = value['positions'];
      this._createTable()
    })
    this._createForm()
  }

  ngOnInit(): void {}

  private _createForm(): void  {    //ToDo Написати валідатори на всі форми
    this.form = new UntypedFormGroup({
      position: new UntypedFormControl(null, Validators.required),
    })
  }

  private _createTable(): void  {
    this.table = new MatTableDataSource(this.positionList);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.table.filter = filterValue.trim().toLowerCase();
  }

  edit(item: IPosition): void {
    this.forUpdate = item;
    this.form.setValue({
      position: item.position,
    })
    if (!this.pannel) {
      return
    }
    this.pannel.open()
  }

  delete(id: string): void {
    this.positionService.delete(id).subscribe(() => {
      const index = this.positionList.findIndex(item => item.id === Number(id));
      this.positionList.splice(index, 1)
      this._createTable()
    })
  }

  save(): void  {
    if (!this.forUpdate){
      this.positionService
        .create(this.form.getRawValue())
        .subscribe(value => {
          this.positionList.push(value);
          this.form.reset();
          this._createTable();
          this.pannel?.close()
        })
    } else {
      this.positionService
        .update(this.forUpdate.id, this.form.getRawValue())
        .subscribe(value => {
          let card = this.positionList.find(f => f.id === this.forUpdate?.id);

          Object.assign(card!, value);
          this.forUpdate = null;
          this.form.reset();
          this._createTable();
          this.pannel?.close()
        })
    }

  }

}
