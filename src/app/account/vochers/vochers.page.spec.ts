import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VochersPage } from './vochers.page';

describe('VochersPage', () => {
  let component: VochersPage;
  let fixture: ComponentFixture<VochersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VochersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VochersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
