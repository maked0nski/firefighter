import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";

import {IClient, IObservation, ISimCard} from "../../../../interfaces";
import {DataService} from "../../../../services";
import {ObservationService, SimCardService} from "../../service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-observation',
    templateUrl: './observation.component.html',
    styleUrls: ['./observation.component.css']
})
export class ObservationComponent implements OnInit {

    client: IClient | undefined;
    simCartList: ISimCard[]  | undefined;
    form: UntypedFormGroup;
    observation: IObservation | undefined;

    @ViewChild(MatAccordion) accordion: MatAccordion;

    constructor(
        private dataService: DataService,
        private observationService: ObservationService,
        private simCardService: SimCardService,
    ) {
        this.dataService.clientStorage.subscribe(value => {
            this.client = value;
            this.observation = value?.observation;
        })
        this._createForm()
    }


    ngOnInit(): void {
        this.simCardService.findFree().subscribe(value => this.simCartList = value)

    }

    _createForm(): void {

        this.form = new UntypedFormGroup({
            number: new UntypedFormControl(null, Validators.required),
            contract: new UntypedFormControl(null, [Validators.required]),
            sim_cardId: new UntypedFormControl(null, [Validators.required]),
        })
    }

    edit() {
        if (this.observation && this.client?.id) {
            let data = {
                id: this.observation.id,
                number: Number(this.form.getRawValue().number),
                contract: this.form.getRawValue().contract,
                sim_cardId: this.form.getRawValue().sim_cardId,
            }
            this.observationService
                .update(data.id, data)
        }
    }

    _fildForm() {
        console.log(this.simCartList)
        console.log(this.observation)
        if (this.observation) {
            this.form.setValue({
                number: this.observation.number,
                contract: this.observation.contract,
                sim_cardId: this.observation.sim_cardId,
            })
        }

    }


}
