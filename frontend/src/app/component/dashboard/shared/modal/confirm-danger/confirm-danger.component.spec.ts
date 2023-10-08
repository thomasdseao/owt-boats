import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDangerComponent } from './confirm-danger.component';

describe('ConfirmDangerComponent', () => {
  let component: ConfirmDangerComponent;
  let fixture: ComponentFixture<ConfirmDangerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDangerComponent]
    });
    fixture = TestBed.createComponent(ConfirmDangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
