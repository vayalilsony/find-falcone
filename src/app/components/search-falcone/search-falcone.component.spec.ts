import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFalconeComponent } from './search-falcone.component';

describe('FindFalconeComponent', () => {
  let component: SearchFalconeComponent;
  let fixture: ComponentFixture<SearchFalconeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFalconeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFalconeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
