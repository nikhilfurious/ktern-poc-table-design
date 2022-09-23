import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRowExpandComponent } from './table-row-expand.component';

describe('TableRowExpandComponent', () => {
  let component: TableRowExpandComponent;
  let fixture: ComponentFixture<TableRowExpandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableRowExpandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRowExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
