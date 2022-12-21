import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";

import {ClientContactService, ClientsService} from "../../service";
import {IClient, IClientContact} from "../../../../interfaces";
import {DataService} from "../../../../services";

@Component({
    selector: 'app-client-details',
    templateUrl: './client-details.component.html',
    styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

    clientForm: FormGroup;
    form: FormGroup;
    client: IClient;

    // @ViewChild(MatExpansionPanel) pannel?: MatExpansionPanel;
    @ViewChild(MatAccordion) accordion: MatAccordion;

    constructor(
        private clientsService: ClientsService,
        private clientContactService: ClientContactService,
        private activatedRoute: ActivatedRoute,
        private dataService: DataService,
        public dialog: MatDialog
    ) {
        activatedRoute.data.subscribe(value => {
            this.client = value['allData'];
            this.dataService.clientStorage.next(value['allData']);
            this.dataService.simCardFreeStorage.next(value['allData']);
            this._createForm();
        })
    }

    ngOnInit(): void {
    }


    _createForm(): void {    //ToDo Написати валідатори на всі форми
        this.clientForm = new FormGroup({
            name: new FormControl(this.client.name),
            city: new FormControl(this.client.city),
            address: new FormControl(this.client.address),
            coordinate: new FormControl(this.client.coordinate),
            service_contract: new FormControl(this.client.service_contract),
        })
        this.form = new FormGroup({
            name: new FormControl(null),
            phone: new FormControl(null),
            position: new FormControl(null),
            email: new FormControl(null),
        })
    }

    _fillContectForm(person: IClientContact): void {
        this.form.setValue({
            name: person.name,
            phone: person.phone,
            position: person.position,
            email: person.email,
        })
    }

    addContact() {
        let contact = this.form.getRawValue();
        contact = {...contact, firmId: this.client.id}
        this.clientContactService
            .create(contact)
            .subscribe(value => {
                this.client.contact_person?.push(value);
                this.form.reset();
                this.accordion.closeAll()
            })
    }

    editContact(item: IClientContact) {
        let contact = {
            ...this.form.getRawValue(),
            id: item.id,
            firmId: item.firmId
        }
        this.clientContactService.update(contact.id, contact)
            .subscribe(value => {
                const find = this.client.contact_person?.find(f => f.id === item.id);
                Object.assign(find!, value);
                this.form.reset();
                this.accordion.closeAll()
            })
    }


    delete(id: number) {
        this.clientContactService
            .delete(id)
            .subscribe(()=>{
                this.form.reset();
                this.accordion.closeAll()
            })
    }
}
