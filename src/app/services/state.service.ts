import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private currentPageSubject = new BehaviorSubject<string>('inicio');
  currentPage$ = this.currentPageSubject.asObservable();

  setCurrentPage(pagina: string): void {
    console.log(pagina);
    this.currentPageSubject.next(pagina);
  }
}
