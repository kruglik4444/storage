import { Component, OnDestroy, OnInit } from '@angular/core';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subject, take, takeUntil } from 'rxjs';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  form!: UntypedFormGroup;

  userPhotoFile!: File;

  userId: string | undefined;

  genders = [
    {
      value: 'Мужской'
    },
    {
      value: 'Женский'
    }
  ]

  private destroyed$ = new Subject<void>();

  constructor(
    private fb: UntypedFormBuilder,
    private storage: Storage,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loginService.user
      .pipe(takeUntil(this.destroyed$))
      .subscribe((user) => {
        this.userId = user?.id;
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  initForm(): void {
    this.form = this.fb.group({
      userLastName: this.fb.control(null, [Validators.required]),
      userFirstName: this.fb.control(null, [Validators.required]),
      userMiddleName: this.fb.control(null, [Validators.required]),
      userBirthDate: this.fb.control(null, [Validators.required]),
      userSnils: this.fb.control(null, [Validators.required]),
      userGender: this.fb.control(null, [Validators.required]),
      userPhone: this.fb.control(null, [Validators.required]),
      userAddress: this.fb.control(null, [Validators.required]),
      userPhoto: this.fb.control(null, Validators.required),
      userPassport: this.fb.control(null, Validators.required),
    });
  }

  onFileSelected(event: Event, type: string) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    let imgRef;

    if (fileList) {
      this.userPhotoFile = fileList[0];
    }

    if (type === 'photo') {
      imgRef = ref(this.storage, `users/${this.userId}/photo`);
    } else {
      imgRef = ref(this.storage, `users/${this.userId}/passport`);
    }

    uploadBytes(imgRef, this.userPhotoFile)
      .then((x) => {
        console.log(x);
        if (type === 'photo') {
          this.form.patchValue({ userPhoto: this.userPhotoFile });
        } else {
          this.form.patchValue({ userPassport: this.userPhotoFile });
        }
      })
      .catch((error) => console.log(error));
  }

  next() {
    const userData = { ...this.form.value, userId: this.userId };
    this.loginService.registerNewUser(userData, this.userId!).subscribe((res) => {
      this.router.navigate(['/user-account'])
    });
  }
}
