import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";

import {IFireHydrantUpdate} from "../../../../interfaces";
import {DataService} from "../../../../services";
import {FireHydrantService} from "../../service";
import * as moment from "moment/moment";

@Component({
  selector: 'app-fire-hydrant',
  templateUrl: './fire-hydrant.component.html',
  styleUrls: ['./fire-hydrant.component.css']
})
export class FireHydrantComponent implements OnInit {

  clientId: number | undefined
  hydrant: IFireHydrantUpdate | undefined;
  form: UntypedFormGroup;

  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(
    private dataService: DataService,
    private fireHydrantService: FireHydrantService
  ) {
    this.dataService.clientStorage.subscribe(value => {
      let tmp = value?.fire_hydrant;
      if (tmp){
        this.hydrant={
          ...tmp,
          timeLeft:this.timeCalc(tmp.next_check)
        }
      }
      // console.log(this.hydrant)
      this.clientId = value?.id;
    })
    this._createForm()
  }

  ngOnInit(): void {
  }

  _createForm(): void {
    this.form = new UntypedFormGroup({
      quantity: new UntypedFormControl(this.hydrant?.quantity, Validators.required),
      next_check: new UntypedFormControl(this.hydrant?.next_check, [Validators.required]),
    })
  }

  edit() {

    if (this.hydrant && this.clientId) {
      let hydrant = {
        id: Number(this.hydrant?.id),
        reminding: true,
        quantity: Number(this.form.getRawValue().quantity),
        next_check: this.form.getRawValue().next_check,
        firmId: this.clientId
      }
      this.fireHydrantService
        .update(hydrant.id, hydrant)
        .subscribe(value => {

          Object.assign(this.hydrant!, {...value, timeLeft: this.timeCalc(value.next_check)});
          this.accordion.closeAll()
        })
    } else {
      let hydrant = {
        reminding: true,
        quantity: Number(this.form.getRawValue().quantity),
        next_check: this.form.getRawValue().next_check,
        firmId: Number(this.clientId)
      }
      this.fireHydrantService
        .create(hydrant)
        .subscribe(value => {
          this.hydrant = {...value, timeLeft: this.timeCalc(value.next_check)};
          this.accordion.closeAll()
        })

    }
  }

  delete(id: number) {
    this.fireHydrantService.delete(id).subscribe(() => {
      this.hydrant = undefined;
      this.form.reset();
      this.accordion.closeAll();
    })
  }

  timeCalc(date: string) {
    let str = moment(date).locale("uk").endOf('day').fromNow();
    return str.includes('тому') ? `Протерміновано ${str}` : `Повірити ${str}`
  }
}
