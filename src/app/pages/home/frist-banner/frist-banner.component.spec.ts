import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FristBannerComponent } from './frist-banner.component';

describe('FristBannerComponent', () => {
  let component: FristBannerComponent;
  let fixture: ComponentFixture<FristBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FristBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FristBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
