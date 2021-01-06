import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ConsultaService } from '../services/consulta.service';
import { Consulta } from '../models/consulta';
import { ConsultaByFilteredSearch} from '../models/consultaByFilteredSearch';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss']
})
export class ConsultasComponent implements OnInit {
  form: FormGroup;
  consultas$: Observable<Consulta[]>;
  dataPipe = new DatePipe('en-US');

  consultaId: number;
  dataInicial: Date;
  dataFinal: Date;
  nome: string;
  dataNascimento: Date;
  observacoes: string;

  constructor(private consultaService: ConsultaService) {
    this.form = new FormGroup({
      consultaId: new FormControl(),
      dataInicial: new FormControl(),
      dataFinal: new FormControl(),
      nome: new FormControl(),
      dataNascimento: new FormControl(),
      observacoes: new FormControl()
    })
  }

  ngOnInit() {
    this.loadConsultas();
  }

  loadConsultas() {
    this.consultas$ = this.consultaService.getConsultas();
  }

  filteredSearch() {
    if (this.consultaId != undefined || this.dataInicial != undefined || this.dataFinal != undefined || this.nome != undefined || this.dataNascimento != undefined || this.observacoes != undefined) {
      this.consultaId = this.consultaId == undefined ? null : this.consultaId;
      this.dataInicial = this.dataInicial == undefined ? null : this.dataInicial;
      this.dataFinal = this.dataFinal == undefined ? null : this.dataFinal;
      this.nome = this.nome == undefined ? null : this.nome;
      this.dataNascimento = this.dataNascimento == undefined ? null : this.dataNascimento;
      this.observacoes = this.observacoes == undefined ? null : this.observacoes;
      let consulta = new ConsultaByFilteredSearch();
      consulta.dataFinal = this.dataFinal;
      consulta.dataInicial = this.dataInicial;
      consulta.dataNascimento = this.dataNascimento;
      consulta.id = this.consultaId;
      consulta.nome = this.nome;
      consulta.observacoes = this.observacoes;
      this.consultas$ = this.consultaService.getFilteredConsultas(consulta);
    }
  }

  delete(id) {
    const ans = confirm('Deseja excluir a consulta com Id: ' + id);
    if (ans) {
      this.consultaService.deleteConsulta(id).subscribe((data) => {
        this.loadConsultas();
      });
    }
  }
}