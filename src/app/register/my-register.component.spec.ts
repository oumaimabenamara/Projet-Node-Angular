import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRegisterComponent } from './my-register.component';

describe('MyRegisterComponent', () => {
  let component: MyRegisterComponent;
  let fixture: ComponentFixture<MyRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
