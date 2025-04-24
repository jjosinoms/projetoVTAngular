import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
  standalone: false
})
export class ClienteFormComponent implements OnInit {
  clienteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    public dialogRef: MatDialogRef<ClienteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'add' | 'edit', cliente?: Cliente }
  ) {
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      razao_social: ['', Validators.required],
      cnpj: ['', Validators.required],
      telefone: [''],
      telefone2: [''],
      email: ['', Validators.email],
      cep: [''],
      estado: [''],
      cidade: [''],
      bairro: [''],
      endereco: ['']
    });
  }

  ngOnInit(): void {
    if (this.data.mode === 'edit' && this.data.cliente) {
      this.clienteForm.patchValue(this.data.cliente);
    }
  }

  onSubmit(): void {
    if (this.clienteForm.invalid) return;

    const clienteData = this.clienteForm.value;

    if (this.data.mode === 'add') {
      this.clienteService.addCliente(clienteData).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Erro ao cadastrar cliente:', err)
      });
    } else if (this.data.mode === 'edit' && this.data.cliente?.id) {
      this.clienteService.updateCliente(this.data.cliente.id, clienteData).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Erro ao atualizar cliente:', err)
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}