import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectDobPage } from './select-dob.page';

describe('SelectDobPage', () => {
  let component: SelectDobPage;
  let fixture: ComponentFixture<SelectDobPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SelectDobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
