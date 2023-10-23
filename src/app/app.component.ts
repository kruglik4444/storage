import { Component } from '@angular/core';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private storage: Storage) {}

  title = 'storage';

  sendData(event: any) {
    const file = event.target.files[0];
    const imageRef = ref(this.storage, `images/${file.name}`);

    uploadBytes(imageRef, file).then(x => {
      console.log(x);
    }).catch(error => console.log(error));
  }
}
