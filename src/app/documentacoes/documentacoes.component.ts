import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Documentation {
  id: number;
  title: string;
  model: string;
  description: string;
  pdfPath: string;
}

@Component({
  selector: 'app-documentacoes',
  templateUrl: './documentacoes.component.html',
  styleUrls: ['./documentacoes.component.css'],
  standalone: false
})
export class DocumentacoesComponent {
  searchTerm: string = '';
  selectedModel: string = 'all';
  selectedDoc: Documentation | null = null;
  pdfUrl: string = '';
  safePdfUrl?: SafeResourceUrl;


  availableModels: string[] = [
    'Prix 5 Plus',
    'Prix 4 Uno',
    'Prix 4 Duo',
    'Prix 3',
    'UPX Thunder com Torre',
    'Prix 8217',
    'UPX Wind DR3 com Thunder Box'
  ];

  documentationList: Documentation[] = [
    {
      id: 1,
      title: 'Configuração Prix 5 Plus',
      model: 'Prix 5 Plus',
      description: 'Passo a passo completo para configuração da balança Prix 5 Plus.',
      pdfPath: 'assets/docs/prix5.pdf'
    },
    {
      id: 2,
      title: 'Configuração Prix 4 Uno',
      model: 'Prix 4 Uno',
      description: 'Tutorial detalhado de configuração da balança Prix 4 Uno.',
      pdfPath: 'assets/docs/prix5.pdf'
    },
    {
      id: 3,
      title: 'Configuração Prix 4 Due',
      model: 'Prix 4 Due',
      description: 'Guia técnico de instalação e configuração do modelo Prix 4 Due.',
      pdfPath: 'assets/docs/prix5.pdf'
    },
        {
      id: 4,
      title: 'Documentação de Configuração Balança e Software UPX Thunder com Torre',
      model: 'UPX Thunder com Torre',
      description: 'Guia técnico de instalação e configuração do modelo UPX Thunder com Torre.',
      pdfPath: 'assets/docs/thundertorre.pdf'
    },
    {
      id: 5,
      title: 'Documentação de Configuração UPX Wind DR3 com Thunder Box, Impressora e Balança._',
      model: 'UPX Thunder Wind DR3',
      description: 'Guia técnico de instalação e configuração do modelo UPX Thunder Wind DR3.',
      pdfPath: 'assets/docs/thunderboxDR3.pdf'
    },
    {
      id: 6,
      title: 'Documentação de Configuração PRIX 3 Plus',
      model: 'Prix 3 Plus',
      description: 'Guia técnico de instalação e configuração do modelo Prix 3 Plus.',
      pdfPath: 'assets/docs/prix3.pdf'
    },
    {
      id: 7,
      title: 'Documentação de Configuração Balança Checkout 8217 Toledo',
      model: 'Toledo Checkout 8217',
      description: 'Guia técnico de instalação e configuração do modelo Toledo Checkout 8217.',
      pdfPath: 'assets/docs/checkout8217.pdf'
    },
  ];

  filteredDocs: Documentation[] = [...this.documentationList];

  @ViewChild('documentacaoDetalheDialog', { static: true }) documentacaoDetalheDialog: any;

  constructor(private dialog: MatDialog, private sanitizer: DomSanitizer) {
    this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl('');
  }
  applyFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    const model = this.selectedModel;

    this.filteredDocs = this.documentationList.filter(doc => {
      const matchesSearch = term ? doc.title.toLowerCase().includes(term) || doc.description.toLowerCase().includes(term) : true;
      const matchesModel = model === 'all' || doc.model === model;
      return matchesSearch && matchesModel;
    });
  }

// Modifique o openDialog:
openDialog(doc: Documentation): void {
  this.selectedDoc = doc;
  this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(doc.pdfPath);
  this.dialog.open(this.documentacaoDetalheDialog, {
    width: '80%',
    height: '80%'
  });
}
}
