import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScondeBannerComponent } from './sconde-banner.component';

describe('ScondeBannerComponent', () => {
  let component: ScondeBannerComponent;
  let fixture: ComponentFixture<ScondeBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScondeBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScondeBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
