import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { AlertModule } from './_alert';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { ConsultaService } from './services/consulta.service';

@NgModule({
  declarations: [
    AppComponent,
    ConsultasComponent,
    ConsultaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule
  ],
  providers: [
    ConsultaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
