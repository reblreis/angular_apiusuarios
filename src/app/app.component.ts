import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  mensagem_criarconta: string = '';


  constructor(
    private httpClient: HttpClient //injeção de dependência
  ) {


  }


  //criando um objeto para capturar os
  //campos do formulário de criação de usuário
  formCriarConta = new FormGroup({
    nome: new FormControl('', []), //campo 'nome'
    email: new FormControl('', []), //campo 'email'
    senha: new FormControl('', []) //campo 'senha'
  });


  //criando um objeto para capturar os
  //campos do formulário de autenticação
  formAutenticar = new FormGroup({
    email: new FormControl('', []), //campo 'email'
    senha: new FormControl('', []) //campo 'senha'
  });


  //criando um objeto para capturar os
  //campos do formulário de recuperação de senha
  formRecuperarSenha = new FormGroup({
    email: new FormControl('', []), //campo 'email'
  });


  //função para capturar o SUBMIT do formulário
  criarConta(): void {
    //capturando os valores preenchidos no formulário
    var dados = this.formCriarConta.value;
    //executando a chamada para a API
    this.httpClient.post(environment.apiUsuarios + 'api/criar-conta', dados)
      .subscribe({ //capturando a resposta da API
        next: (data: any) => { //sucesso!
          this.mensagem_criarconta = data.mensagem;
          this.formCriarConta.reset(); //limpar o formulário
        },
        error: (e) => { //erro!
          if(e.error.mensagem){
            this.mensagem_criarconta = e.error.mensagem;
          }
          else if(e.error.errors){
            this.mensagem_criarconta = e.error.errors;
          }
        }
      });
  }


  //função para capturar o SUBMIT do formulário
  autenticar(): void {
    //capturando os valores preenchidos no formulário
    var dados = this.formAutenticar.value;
    //executando a chamada para a API
    this.httpClient.post(environment.apiUsuarios + 'api/autenticar', dados)
      .subscribe({ //capturando a resposta da API
        next: (data) => { //sucesso!
          alert(JSON.stringify(data));
        },
        error: (e) => { //erro!
          alert(JSON.stringify(e.error));
        }
      });
  }


  //função para capturar o SUBMIT do formulário
  recuperarSenha(): void {
    //capturando os valores preenchidos no formulário
    var dados = this.formRecuperarSenha.value;
    //executando a chamada para a API
    this.httpClient.post(environment.apiUsuarios + 'api/recuperar-senha', dados)
      .subscribe({ //capturando a resposta da API
        next: (data) => { //sucesso!
          alert(JSON.stringify(data));
        },
        error: (e) => { //erro!
          alert(JSON.stringify(e.error));
        }
      });
  }


}