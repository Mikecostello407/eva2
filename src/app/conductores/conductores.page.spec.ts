import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConductoresPage } from './conductores.page';

describe('ConductoresPage', () => {
  let component: ConductoresPage;
  let fixture: ComponentFixture<ConductoresPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConductoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
