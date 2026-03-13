import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Roomlist } from './roomlist';

describe('Roomlist', () => {
  let component: Roomlist;
  let fixture: ComponentFixture<Roomlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Roomlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Roomlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
