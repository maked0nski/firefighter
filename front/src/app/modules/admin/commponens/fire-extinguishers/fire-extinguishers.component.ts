import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {MatExpansionPanel} from "@angular/material/expansion";
import {MatTableDataSource} from "@angular/material/table";
import {Component, OnInit, ViewChild} from '@angular/core';
import * as moment from "moment";

import {IClient, Ifire_extinguishers, IFireExtinguishers} from "../../../../interfaces";
import {FireExtinguishersService} from "../../service";
import {DataService} from "../../../../services";

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
                let list_fire_ext = value.fire_extinguishers
                this.fire_extinguishers = list_fire_ext.map(val => {
                    return {
                        ...val,
                        // next_check: moment(val.next_check, "DD.MM.YYYY", "uk").toString(),
                        timeLeft: this.timeCalc(val.next_check)
                    }
                });
            }

            this._createTable()
        })
        this._createForm()
    }

    _createTable(): void {
        this.table = new MatTableDataSource(this.fire_extinguishers);
    }

    ngOnInit(): void {
    }

    save(): void {
        let rawValue = this.form.getRawValue();
        rawValue = {
            ...rawValue,
            // next_check: moment(rawValue.next_check, "DD-MM-YYYY", 'uk'),
            reminding: true,
            quantity: Number(rawValue.quantity),
            firmId: this.client?.id
        }

        if (!this.forUpdate) {
            this.fireExtinguishersService
                .create(rawValue)
                .subscribe(value => {
                    this.fire_extinguishers.push({...value, timeLeft: this.timeCalc(value.next_check)});
                    this._createTable();
                    this.pannel?.close();
                    this.form.reset();
                })
        } else {
            rawValue = {
                ...rawValue,
                id: Number(this.forUpdate.id)
            }
            this.fireExtinguishersService
                .update(this.forUpdate.id, rawValue)
                .subscribe(value => {
                    let find = this.fire_extinguishers.find(f => f.id === this.forUpdate?.id);
                    Object.assign(find!, {...value, timeLeft: this.timeCalc(value.next_check)});
                    this.forUpdate = null;
                    this._createTable();
                    this.pannel?.close();
                    this.form.reset();
                })
        }
    }

    _createForm(): void {    //ToDo Написати валідатори на всі форми
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
                let index = this.fire_extinguishers.findIndex(item => item.id === id);
                this.fire_extinguishers.splice(index, 1);
                this._createTable();
            })
    }

    timeCalc(date: string) {
        let str = moment(date).locale("uk").endOf('day').fromNow();
        return str.includes('тому') ? `Протерміновано ${str}` : `Повірити ${str}`
    }
}
