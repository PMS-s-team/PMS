import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Scene3Page } from './scene3.page';

describe('Scene3Page', () => {
  let component: Scene3Page;
  let fixture: ComponentFixture<Scene3Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Scene3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
