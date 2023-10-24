import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private http: HttpClient) {}

  getProfileData(id: string) {
    return this.http
      .get<any>(
        `https://storage-b8c7b-default-rtdb.firebaseio.com/clients/${id}.json`
      )
      .pipe(
        map((responseData) => {
          return Object.values(responseData)[0];
        })
      );
  }
}
