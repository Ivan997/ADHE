import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioFormatoComponent } from './formulario-formato.component';

describe('FormularioFormatoComponent', () => {
  let component: FormularioFormatoComponent;
  let fixture: ComponentFixture<FormularioFormatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioFormatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioFormatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
