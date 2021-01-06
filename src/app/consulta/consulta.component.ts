import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsultaService } from '../services/consulta.service';
import { Consulta } from '../models/consulta';
import { DatePipe } from '@angular/common';
import { AlertService } from '../_alert';

@Component({
  selector: 'app-consulta-add-edit',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  consultaId: number;
  errorMessage: any;
  consulta = new Consulta;
  dataPipe = new DatePipe('en-US');

  constructor(private consultaService: ConsultaService, private avRoute: ActivatedRoute, private router: Router, private alertService: AlertService) {

    this.form = new FormGroup({
      consultaId: new FormControl(),
      dataInicial: new FormControl(),
      horaInicial: new FormControl(),
      dataFinal: new FormControl(),
      horaFinal: new FormControl(),
      nome: new FormControl(),
      dataNascimento: new FormControl(),
      observacoes: new FormControl()
    })

    const idParam = 'id';
    this.actionType = 'Nova';

    if (this.avRoute.snapshot.params[idParam]) {
      this.consultaId = this.avRoute.snapshot.params[idParam];
    }  
  }

  ngOnInit() {
    if (this.consultaId > 0) {     
      this.actionType = 'Editar';
      this.consultaService.getConsulta(this.consultaId)
        .subscribe(data => (
          this.consulta = data
        ));
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.consulta.dataFinal < this.consulta.dataInicial) {
      this.alertService.error('A data e hora inicial deve ser menor que a final.');
      return;
    }

    this.consultaService.validateConsulta(this.consulta)
      .subscribe((data) => {
        if (!data) {
          this.alertService.error('Já existe uma consulta marcada neste mesmo dia e horário.');
          return;
        } else {
          if (this.actionType === 'Nova') {
            this.consultaService.saveConsulta(this.consulta)
              .subscribe((data) => {
                this.router.navigate(['/consulta', data.id, "savedSuccessfully"]);
              });
          }

          if (this.actionType === 'Editar') {
            this.consultaService.updateConsulta(this.consulta.id, this.consulta)
              .subscribe(() => {
                this.alertService.success('Consulta salva com sucesso.', { autoClose: true });
                //this.router.navigate([this.router.url]);
              });
          }
        }
      });
  }

  cancel() {
    this.router.navigate(['/']);
  }
}