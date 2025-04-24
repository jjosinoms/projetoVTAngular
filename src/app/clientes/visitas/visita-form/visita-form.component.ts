import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VisitaService } from '../../../services/visita.service';
import { Visita } from '../../../models/visita.model';

@Component({
  selector: 'app-visita-form',
  templateUrl: './visita-form.component.html',
  styleUrls: ['./visita-form.component.css'],
  standalone: false
})
export class VisitaFormComponent implements OnInit {
  visitaForm: FormGroup;
  mode: 'add' | 'edit';

  constructor(
    private fb: FormBuilder,
    private visitaService: VisitaService,
    public dialogRef: MatDialogRef<VisitaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      mode?: 'add' | 'edit',
      clienteId: number,
      visita?: Visita
    }
  ) {
    this.mode = data.mode ?? 'add';

    this.visitaForm = this.fb.group({
      data: [null, Validators.required],
      tecnico: ['', Validators.required],
      descricao: ['', Validators.required],
      observacoes: ['']
    });
  }

  ngOnInit(): void {
    console.log('Modo:', this.mode);

    if (this.mode === 'edit' && this.data.visita) {
      const dataISO = new Date(this.data.visita.data).toISOString().split('T')[0];
      console.log('Data convertida para o form:', dataISO);

      this.visitaForm.patchValue({
        ...this.data.visita,
        data: dataISO
      });
    }
  }

  onSubmit(): void {
    console.log('Submit acionado');

    if (this.visitaForm.invalid) {
      console.warn('Formulário inválido');
      return;
    }

    const visitaData = {
      ...this.visitaForm.value,
      clienteId: this.data.clienteId,
      data: new Date(this.visitaForm.value.data).toISOString()
    };

    if (this.mode === 'add') {
      this.visitaService.addVisita(visitaData).subscribe({
        next: () => {
          console.log('Visita cadastrada com sucesso!');
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Erro ao cadastrar visita:', err);
        }
      });
    } else if (this.mode === 'edit' && this.data.visita?.id) {
      this.visitaService.updateVisita(this.data.visita.id, visitaData).subscribe({
        next: () => {
          console.log('Visita atualizada com sucesso!');
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Erro ao atualizar visita:', err);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
