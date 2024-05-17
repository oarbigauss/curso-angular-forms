import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MaiorIdadeDirective } from '../directives/maior-idade.directive';
import { ConsultaCepService } from '../service/consulta-cep.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
// 01000-000
  constructor(
    private router: Router,
    private serviceCEP: ConsultaCepService 
  ) {}

  ngOnInit(): void {}

  cadastrar(form: NgForm){
    if (form.valid) {
      this.router.navigate(['./sucesso']);
    }else{
      alert('Formulário inválido');
    }
      console.log(form);
  }

  consultaCEP(ev:any, f: NgForm){
    console.log(f);
    
    const cep = ev.target.value;
    if (cep !== '') {
      this.serviceCEP.getConsultaCep(cep).subscribe((data)=>{
        console.log(data);
        this.populandoEndereco(data, f);
      });
      
    }
  }
  populandoEndereco(dados: any, f: NgForm) {
    f.form.patchValue({
      endereco: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    })
  }
}
