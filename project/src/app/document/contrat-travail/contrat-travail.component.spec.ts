import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratTravailComponent } from './contrat-travail.component';

describe('ContratTravailComponent', () => {
  let component: ContratTravailComponent;
  let fixture: ComponentFixture<ContratTravailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratTravailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
