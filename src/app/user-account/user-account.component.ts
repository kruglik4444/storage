import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { LoginService } from '../pages/login/login.service';
import { Storage, getDownloadURL, listAll, ref } from '@angular/fire/storage';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export class UserAccountComponent implements OnInit, OnDestroy {
  user: any;

  passportURL!: string;

  photoURL!: string;

  private destroyed$ = new Subject<void>();

  constructor(
    private storageService: StorageService,
    private loginService: LoginService,
    private storage: Storage,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loginService.user
      .pipe(
        takeUntil(this.destroyed$),
        switchMap((user) => this.storageService.getProfileData(user?.id!))
      )
      .subscribe((res) => {
        this.user = res;
        console.log(this.user);
        this.getImages();
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  getImages() {
    const imagesRef = ref(this.storage, `users/${this.user.userId}`);

    listAll(imagesRef).then(async (images) => {
      let photos = [];
      for (let image of images.items) {
        const url = await getDownloadURL(image);
        photos.push(url);
      }
      this.passportURL = photos[0];
      this.photoURL = photos[1];
    });
  }

  showPassport() {
    this.dialog.open(DialogPassport, {
      data: {
        passport: this.passportURL,
      },
    });
  }
}

@Component({
  selector: 'dialog-passport',
  template: `
     <div mat-dialog-actions align="end">
     <button mat-icon-button mat-dialog-close>
      <mat-icon>close</mat-icon>
  </button>
     </div>
     <div class="tw-overflow-hidden">
     <img src="{{ data.passport }}" />
     </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
})
export class DialogPassport {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
