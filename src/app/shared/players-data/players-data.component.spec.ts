import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersDataComponent } from './players-data.component';

describe('PlayersDataComponent', () => {
  let component: PlayersDataComponent;
  let fixture: ComponentFixture<PlayersDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayersDataComponent]
    });
    fixture = TestBed.createComponent(PlayersDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
