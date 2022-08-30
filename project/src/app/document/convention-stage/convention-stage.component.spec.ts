import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ConventionStageComponent } from './convention-stage.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('ConventionStageComponent', () => {
  let component: ConventionStageComponent;
  let fixture: ComponentFixture<ConventionStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
          RouterTestingModule.withRoutes([]),
          [ReactiveFormsModule]
      ],
      declarations: [ ConventionStageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConventionStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
