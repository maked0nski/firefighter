import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion, MatExpansionPanel} from "@angular/material/expansion";

import {IClient, IObservation, ISimCard} from "../../../../interfaces";
import {DataService} from "../../../../services";
import {ObservationService, SimCardService} from "../../service";

@Component({
    selector: 'app-observation',
    templateUrl: './observation.component.html',
    styleUrls: ['./observation.component.css']
})
export class ObservationComponent implements OnInit {

    client: IClient | undefined;
    simCartList: ISimCard[] | undefined;
    form: UntypedFormGroup;
    observation: IObservation | undefined;

    @ViewChild(MatAccordion) accordion: MatAccordion;
    @ViewChild(MatExpansionPanel) pannel?: MatExpansionPanel;

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

    // edit(): void {
    //     if (this.observation && this.client?.id) {
    //         let data = {
    //             id: this.observation.id,
    //             number: Number(this.form.getRawValue().number),
    //             contract: this.form.getRawValue().contract,
    //             sim_cardId: this.form.getRawValue().sim_cardId,
    //         }
    //         console.log(data)
    //         this.observationService
    //             .update(data.id, data)
    //     }
    // }

    compareFn(optionOne: any, optionTwo: any): boolean {
        return optionOne?.number === optionTwo?.number;
    }

    save() {
        let data = {
            ...this.form.getRawValue(),
            number: Number(this.form.getRawValue().number),
            firmId: this.client?.id
        }
        if (!this.observation) {
            console.log("save")
            this.observationService
                .create(data)
                .subscribe(value => {
                    this.observation = value;
                    this.form.reset();
                    this.pannel?.close()
                })
        } else {
            console.log("edit")
            data = {
                ...data,
                id: this.observation.id,
            }
            this.observationService
                .update(this.observation.id, data)
                .subscribe(value => {
                    this.observation = value;
                    this.form.reset();
                    this.pannel?.close();
                })
            console.log(data)
        }

    }

    _fildForm() {
        if (this.observation && this.observation?.sim_card ) {
            this.simCartList?.push(this.observation?.sim_card)
            console.log(this.observation)
            this.form.setValue({
                number: this.observation.number.toString(),
                contract: this.observation.contract,
                sim_cardId: this.observation.sim_card?.number,
                // select.value = this.observation?.sim_card?.number
            })
        }

    }


    delete(id: number) {
        this.observationService.delete(id);
    }


}
