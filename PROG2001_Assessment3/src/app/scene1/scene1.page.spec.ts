import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Scene1Page } from './scene1.page';

describe('Scene1Page', () => {
  let component: Scene1Page;
  let fixture: ComponentFixture<Scene1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Scene1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
