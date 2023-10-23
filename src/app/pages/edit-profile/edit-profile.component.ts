import { Component, OnInit } from '@angular/core';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  form!: UntypedFormGroup;

  userPhotoFile!: File;

  constructor(private fb: UntypedFormBuilder, private storage: Storage) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      userLastName: this.fb.control(null, [Validators.required]),
      userFirstName: this.fb.control(null, [Validators.required]),
      userMiddleName: this.fb.control(null, [Validators.required]),
      userBirthDate: this.fb.control(null, [Validators.required]),
    });
  }

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList) {
      this.userPhotoFile = fileList[0];
    }
    const imgRef = ref(this.storage, `users/${this.userPhotoFile.name}`);

    uploadBytes(imgRef, this.userPhotoFile)
      .then((x) => {
        console.log(x);
      })
      .catch((error) => console.log(error));
  }
}
