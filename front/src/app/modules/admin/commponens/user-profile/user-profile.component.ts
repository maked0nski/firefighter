import {MatExpansionPanel} from "@angular/material/expansion";
import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

import {UsersService} from "../../service";
import {DataService} from "../../../../services";
import {IUser} from "../../intesface";
import {DOCUMENT} from "@angular/common";
import {finalize, first, fromEvent, mergeMap, Subject, takeUntil} from "rxjs";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private destroy$ = new Subject<void>();
  user: IUser;
  form: FormGroup;
  @ViewChild(MatExpansionPanel) pannel?: MatExpansionPanel;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public fb: FormBuilder,
    private usersService: UsersService,
    private dataService: DataService,
  ) {
    this
      ._createForm()
  }

  ngOnInit(): void {
    this.dataService.userStorage.subscribe(value => {
      if (value) {
        this.user = value
      }
    })
  }

  _createForm(): void {
    this.form = this.fb.group({
      surename: new FormControl(null),
      name: new FormControl(null),
      fathersname: new FormControl(null),
      phone: new FormControl(null),
      birthday: new FormControl(null),
      // image: new FormControl(null),
      role: new FormControl(null),
      // positionId: new FormControl(null, Validators.required),
    })

  }

  update() {
    this.usersService.update(this.user.id, this.form.getRawValue()).subscribe(value => {
      this.dataService.userStorage.next(value)
    })
    if (!this.pannel) return;  // перевіряю та закриваю панель редагування Карточок
    this.pannel.close();
  }

  edit() {
    this.form.setValue({
      surename: this.user.surename,
      name: this.user.name,
      fathersname: this.user.fathersname,
      phone: this.user.phone,
      birthday: this.user.birthday,
      role: this.user.role,
      // positionId: this.user.positionId,
    })
  }

  uploadFile(): void {
    let fileInput = this.document.createElement('input');
    fileInput.type = 'file';

    fromEvent(fileInput, 'change')
      .pipe(
        first(),
        mergeMap((event) => {
          const target = event.target as HTMLInputElement;

          // @ts-ignore
          const selectedFile = target.files[0];
          const uploadData = new FormData();
          uploadData.append('image', selectedFile, selectedFile.name);

          return this.usersService.saveAvatar(this.user.id, uploadData)

        }),
        finalize(() => {
          // @ts-ignore
          fileInput = null;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (event) => {
          console.log("subscribe event", event);
          this.dataService.userStorage.next(event as IUser);
        },
        error: () => console.log('Upload error'),
        complete: () => console.log('Upload complete')
      });
    fileInput.click();
  }

}
