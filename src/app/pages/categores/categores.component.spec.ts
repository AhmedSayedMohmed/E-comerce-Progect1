import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoresComponent } from './categores.component';

describe('CategoresComponent', () => {
  let component: CategoresComponent;
  let fixture: ComponentFixture<CategoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
