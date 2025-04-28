import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentacoesComponent } from './documentacoes.component';

describe('DocumentacoesComponent', () => {
  let component: DocumentacoesComponent;
  let fixture: ComponentFixture<DocumentacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
