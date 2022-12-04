import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from '@angular/material/table';
import {MatExpansionPanel} from "@angular/material/expansion";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";

import {FuelCardService} from "../../service";
import {IFuelCard} from "../../../../interfaces";
import {RegEx} from "../../../../constants";


@Component({
  selector: 'app-fuel-card',
  templateUrl: './fuel-cards.component.html',
  styleUrls: ['./fuel-cards.component.css']
})
export class FuelCardsComponent implements OnInit {

  displayedColumns: string[] = ['number', 'pin', 'active', 'station_brend', 'edit', 'delete'];

  fuelCards: MatTableDataSource<IFuelCard>;

  fuelCardsArr: IFuelCard[];

  form: UntypedFormGroup;

  forUpdate: IFuelCard | null;

  @ViewChild(MatExpansionPanel) pannel?: MatExpansionPanel;

  constructor(
    private fuelCardService: FuelCardService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
    activatedRoute.data.subscribe(value => {
      this.fuelCardsArr = value['fuelCard'];
      this.createTable()
    })
    this._createForm()
  }

  ngOnInit(): void {
  }

  _createForm(): void {
    this.form = new UntypedFormGroup({
      number: new UntypedFormControl(null, Validators.required),
      pin: new UntypedFormControl(null, [Validators.required, Validators.pattern(RegEx.pin)]),
      station_brend: new UntypedFormControl("OKKO", [Validators.required]),
      active: new UntypedFormControl(true, Validators.required),
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.fuelCards.filter = filterValue.trim().toLowerCase();
  }

  edit(card: IFuelCard): void {
    this.forUpdate = card;
    this.form.setValue({
      number: card.number,
      pin: card.pin,
      active: card.active,
      station_brend: card.station_brend
    })
    if (!this.pannel) {
      return
    }
    this.pannel.open()
  }

  delete(id: string) {
    this.fuelCardService.delete(id).subscribe(() => {
      const index = this.fuelCardsArr.findIndex(card => card.id === +id);
      this.fuelCardsArr.splice(index, 1)
      this.createTable()
    })
  }

  save(): void {

    if (!this.forUpdate) {
      this.fuelCardService.create(this.form.getRawValue()).subscribe(value => {
        this.fuelCardsArr.push(value);
        this.form.reset();
        this.form.untouched;
        this.createTable();
      })
    } else {
      this.fuelCardService.update(this.forUpdate.id, this.form.getRawValue()).subscribe(value => {
        let fuelCard = this.fuelCardsArr.find(f => f.id === this.forUpdate?.id);

        Object.assign(fuelCard!, value);
        this.forUpdate = null;
        this.form.reset();
        this.form.untouched;
        this.createTable();
      })
    }

    if (!this.pannel) return;  // перевіряю та закриваю панель редагування Карточок
    this.pannel.close();

  }


  checkUnicNumber(template: TemplateRef<any>) {
    let iFuelCard = this.fuelCardsArr.find(f => f.number === this.form.getRawValue()["number"]);
    if (iFuelCard === undefined || iFuelCard.number === this.forUpdate?.number) {
      this.save()
    } else {
      this.openDialog(template)
      console.log("Такий номер карточки існує")
    }
  }

  openDialog(template: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(template, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  createTable(): void {
    this.fuelCards = new MatTableDataSource(this.fuelCardsArr);
  }
}
