import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCheckComponent } from './table-check.component';

describe('TableCheckComponent', () => {
  let component: TableCheckComponent;
  let fixture: ComponentFixture<TableCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
