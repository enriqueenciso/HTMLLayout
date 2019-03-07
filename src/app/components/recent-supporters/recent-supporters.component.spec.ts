import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentSupportersComponent } from './recent-supporters.component';

describe('RecentSupportersComponent', () => {
  let component: RecentSupportersComponent;
  let fixture: ComponentFixture<RecentSupportersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentSupportersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentSupportersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
