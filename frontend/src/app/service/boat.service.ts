import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ApiResponse} from '../model/api-response.model';
import {environment} from '../../environments/environment';
import {Boat} from '../model/boat.model';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BoatService {
  // Injecting HttpClient for making API calls
  constructor(private http: HttpClient) {
  }

  /**
   * Fetches the list of all boats.
   * @returns Observable of an array of boats.
   */
  getBoats(): Observable<Boat[]> {
    return this.http.get<ApiResponse<Boat[]>>(`${environment.apiUrl}/boats`)
      .pipe(
        map(response => response.data),
        catchError(error => {
          throw error;
        })
      );
  }

  /**
   * Fetches one boat
   * @returns Observable of a boat.
   */
  getBoat(id: number): Observable<Boat> {
    return this.http.get<ApiResponse<Boat>>(`${environment.apiUrl}/boats/${id}`)
      .pipe(
        map(response => response.data),
        catchError(error => {
          throw error;
        })
      );
  }

  /**
   * Deletes a specific boat by its id.
   * @param id The id of the boat to delete.
   * @returns Observable of void.
   */
  deleteBoat(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/boats/${id}`).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  /**
   * Creates a new boat.
   * @param name The name of the boat.
   * @param description The description of the boat.
   * @returns Observable of the newly created boat.
   */
  createBoat(name: string, description: string): Observable<Boat> {
    return this.http.post<ApiResponse<Boat>>(`${environment.apiUrl}/boats`, {name, description})
      .pipe(
        map(response => response.data),
        catchError(error => {
          throw error;
        })
      );
  }

  /**
   * Updates an existing boat by its id.
   * @param name The updated name of the boat.
   * @param description The updated description of the boat.
   * @param id The id of the boat to update.
   * @returns Observable of the updated boat.
   */
  updateBoat(name: string, description: string, id: number): Observable<Boat> {
    return this.http.put<ApiResponse<Boat>>(`${environment.apiUrl}/boats/${id}`, {name, description})
      .pipe(
        map(response => response.data),
        catchError(error => {
          throw error;
        })
      );
  }
}
