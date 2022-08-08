import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConventionStageComponent } from './convention-stage.component';

describe('ConventionStageComponent', () => {
  let component: ConventionStageComponent;
  let fixture: ComponentFixture<ConventionStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
