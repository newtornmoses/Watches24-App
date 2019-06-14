import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCollectionPage } from './product-collection.page';

describe('ProductCollectionPage', () => {
  let component: ProductCollectionPage;
  let fixture: ComponentFixture<ProductCollectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCollectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCollectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
