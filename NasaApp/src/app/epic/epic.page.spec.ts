import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicPage } from './epic.page';

describe('EpicPage', () => {
  let component: EpicPage;
  let fixture: ComponentFixture<EpicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpicPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
