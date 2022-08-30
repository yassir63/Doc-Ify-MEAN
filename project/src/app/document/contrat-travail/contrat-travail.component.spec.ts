import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ContratTravailComponent } from './contrat-travail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('ContratTravailComponent', () => {
  let component: ContratTravailComponent;
  let fixture: ComponentFixture<ContratTravailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        [ReactiveFormsModule],
        RouterTestingModule.withRoutes([])
      ],
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
