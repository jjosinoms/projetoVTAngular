import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EquipamentoService } from '../../../services/equipamento.service';
import { Equipamento } from '../../../models/equipamento.model';

@Component({
  selector: 'app-equipamento-form',
  templateUrl: './equipamento-form.component.html',
  styleUrls: ['./equipamento-form.component.css'],
  standalone: false
})
export class EquipamentoFormComponent implements OnInit {
  equipamentoForm: FormGroup;
  mode: 'add' | 'edit';  // Definido explicitamente como tipo

  constructor(
    private fb: FormBuilder,
    private equipamentoService: EquipamentoService,
    public dialogRef: MatDialogRef<EquipamentoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      mode: 'add' | 'edit', 
      clienteId: number, 
      equipamento?: Equipamento 
    }
  ) {
    this.mode = data.mode ?? 'add';  // Garantir que `mode` tenha valor (se não passar 'add' por padrão)
    
    // Inicializando o formulário
    this.equipamentoForm = this.fb.group({
      inmetro: ['', Validators.required],
      serie: ['', Validators.required],
      nomeEquipamento: ['', Validators.required],
      modelo: ['', Validators.required],
      numeroOs: [''],
      dataAquisicao: ['']
    });
  }

  ngOnInit(): void {
    console.log('Modo:', this.mode); // Log para depuração - Verificar o modo recebido
    if (this.mode === 'edit' && this.data.equipamento) {
      // Preenche o formulário com os dados do equipamento para edição
      this.equipamentoForm.patchValue(this.data.equipamento);
    }
  }

  onSubmit(): void {
    console.log('Submetendo formulário de equipamento...'); // Log de envio
    if (this.equipamentoForm.invalid) {
      console.warn('Formulário inválido', this.equipamentoForm.value); // Log de erro se o formulário for inválido
      return;
    }

    const equipamentoData = {
      ...this.equipamentoForm.value,
      clienteId: this.data.clienteId
    };

    if (this.mode === 'add') {
      this.equipamentoService.addEquipamento(equipamentoData).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Erro ao cadastrar equipamento:', err)
      });
    } else if (this.mode === 'edit' && this.data.equipamento?.id) {
      this.equipamentoService.updateEquipamento(
        this.data.equipamento.id, 
        equipamentoData
      ).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error('Erro ao atualizar equipamento:', err)
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false); // Fechar dialog sem ação
  }
}
