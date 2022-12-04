import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";

import {IImpregnation} from "../../../../interfaces";
import {DataService} from "../../../../services";
import {ImpregnationService} from "../../service";

@Component({
  selector: 'app-fire-resistant-impregnation',
  templateUrl: './fire-resistant-impregnation.component.html',
  styleUrls: ['./fire-resistant-impregnation.component.css']
})
export class FireResistantImpregnationComponent implements OnInit {

  clientId: number | undefined
  impregnation: IImpregnation | undefined;
  form: UntypedFormGroup;

  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(
    private dataService: DataService,
    private impregnationService: ImpregnationService,
  ) {
    this.dataService.clientStorage.subscribe(value => {
      this.impregnation = value?.fire_resistant_impregnation;
      this.clientId = value?.id;
    })
    this._createForm()
  }

  ngOnInit(): void {
  }

  _createForm(): void {
    this.form = new UntypedFormGroup({
      seepage_liquid: new UntypedFormControl(this.impregnation?.seepage_liquid, Validators.required),
      area: new UntypedFormControl(this.impregnation?.area, [Validators.required]),
      next_check: new UntypedFormControl(this.impregnation?.next_check, [Validators.required]),
    })
  }


  edit() {
    if (this.impregnation && this.clientId) {
      let impregnation = {
        id: Number(this.impregnation?.id),
        reminding: true,
        seepage_liquid: this.form.getRawValue().seepage_liquid,
        area: Number(this.form.getRawValue().area),
        next_check: this.form.getRawValue().next_check,
        firmId: Number(this.clientId)
      }
      this.impregnationService
        .update(impregnation.id, impregnation)
        .subscribe(value => {

          Object.assign(this.impregnation!, value);
          this.accordion.closeAll()
        })
    } else {
      let impregnation = {
        reminding: true,
        seepage_liquid: this.form.getRawValue().seepage_liquid,
        area: Number(this.form.getRawValue().area),
        next_check: this.form.getRawValue().next_check,
        firmId: Number(this.clientId)
      }
      this.impregnationService
        .create(impregnation)
        .subscribe(value => {
          this.impregnation = value;
          this.accordion.closeAll()
        })

    }
  }

  delete(id: number) {
    this.impregnationService.delete(id).subscribe(() => {
      this.impregnation = undefined;
      this.form.reset();
      this.accordion.closeAll();
    })
  }


}
