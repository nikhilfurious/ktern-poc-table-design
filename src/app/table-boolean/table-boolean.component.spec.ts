import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBooleanComponent } from './table-boolean.component';

describe('TableBooleanComponent', () => {
  let component: TableBooleanComponent;
  let fixture: ComponentFixture<TableBooleanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableBooleanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBooleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
