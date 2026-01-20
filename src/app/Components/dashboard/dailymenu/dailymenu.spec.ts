import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dailymenu } from './dailymenu';

describe('Dailymenu', () => {
  let component: Dailymenu;
  let fixture: ComponentFixture<Dailymenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dailymenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dailymenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
