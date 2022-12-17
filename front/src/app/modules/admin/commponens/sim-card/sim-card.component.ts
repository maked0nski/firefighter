import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatExpansionPanel} from "@angular/material/expansion";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute} from "@angular/router";

import {SimCardService} from "../../service";
import {ISimCard} from "../../../../interfaces";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-sim-card',
  templateUrl: './sim-card.component.html',
  styleUrls: ['./sim-card.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class SimCardComponent implements OnInit {
  dataSource : ISimCard[];
  columnsToDisplay: string[] = ['number', 'operator', 'active', 'edit', 'delete'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement:ISimCard | null;



  displayedColumns: string[] = ['number', 'operator', 'active', 'edit', 'delete'];

  simCards: ISimCard[]

  simCardsTable: MatTableDataSource<ISimCard>;

  form: UntypedFormGroup;

  simForUpdate: ISimCard | null;

  @ViewChild(MatExpansionPanel) pannel?: MatExpansionPanel;


  constructor(
    private simCardService: SimCardService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
    activatedRoute.data.subscribe(value => {
      this.simCards = value['simCard'];
      this.dataSource = value['simCard'];
      this._createTable()
    })
    this._createForm()
  }

  ngOnInit(): void {
  }

  _createForm(): void {
    this.form = new UntypedFormGroup({
      number: new UntypedFormControl(null, Validators.required),
      operator: new UntypedFormControl("Kyivstar", [Validators.required]),
      active: new UntypedFormControl(true, Validators.required)
    })
  }

  _createTable(): void {
    this.simCardsTable = new MatTableDataSource(this.simCards);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.simCardsTable.filter = filterValue.trim().toLowerCase();
  }

  save(): void {
    if (!this.simForUpdate) {
      this.simCardService
        .create(this.form.getRawValue())
        .subscribe(value => {
          this.simCards.push(value);
          this.form.reset();
          this._createTable();
          this.pannel?.close()
        })
    } else {
      this.simCardService
        .update(this.simForUpdate.id, this.form.getRawValue())
        .subscribe(value => {
          let card = this.simCards.find(f => f.id === this.simForUpdate?.id);

          Object.assign(card!, value);
          this.simForUpdate = null;
          this.form.reset();
          this._createTable();
          this.pannel?.close()
        })
    }
  }

  edit(simcard: ISimCard): void {
    this.simForUpdate = simcard;

    this.form.setValue({
      number: simcard.number,
      operator: simcard.operator,
      active: simcard.active
    })
    if (!this.pannel) {
      return
    }
    this.pannel.open()
  }

  delete(id: string) {
    this.simCardService.delete(id).subscribe(() => {
      const index = this.simCards.findIndex(card => card.id === Number(id));
      this.simCards.splice(index, 1);
      this._createTable();
    })
  }

  checkUnicNumber(template: TemplateRef<any>) {
    let iFuelCard = this.simCards.find(f => f.number === this.form.getRawValue()["number"]);
    if (iFuelCard === undefined || iFuelCard.number === this.simForUpdate?.number) {
      this.save()
    } else {
      this.openDialog(template)
      console.log("Такий номер карточки існує")
    }
  }

  openDialog(template: TemplateRef<any>) {
    const dialogRef = this.dialog.open(template, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
