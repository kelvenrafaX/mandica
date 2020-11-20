import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {Subject} from 'rxjs';

@Injectable()
export class UtilService {

  usuarioTrocouDados: Subject<any> = new Subject<any>();

  constructor(private router: Router, private _location: Location) { }

  redireciona(link: string) {
    this.router.navigate([link]);
  }

  nomeMesAbreviado(mes): string {
    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul',
      'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    return meses[mes - 1];
  }

  preencherCPF(cpf) {
    if (cpf.length < 11) {
      const digFaltantes = 11 - cpf.length;
      for (let i = 0; i < digFaltantes; i++) {
        cpf = '0' + cpf;
      }
      return cpf;
    }
    return cpf;
  }

  preencherInteiros(valor, quantidade) {
    const digFaltantes = quantidade - valor.length;
    for (let i = 0; i < digFaltantes; i++) {
      valor = '0' + valor;
    }
    return valor;
  }

  removerMascara(input: string): string {
    if (input !=  null && typeof input === 'string') {
      return input.substring(0, 14).replace(/[^\d\s]/gi, '');
    }
    return input;
  }

  removerMascaraGenerico(input: string) {
    if (input != null && input !== undefined && typeof input === 'string') {
      return input.replace(/[^\d\s]/gi, '');
    }
    return input;
  }

  validarCpf(strCPF): boolean {
    strCPF = this.removerMascara(strCPF);

    let Soma;
    let Resto;
    Soma = 0;

    if (strCPF === '00000000000' || strCPF === '22233344405') return false;

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11)) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto === 10) || (Resto === 11)) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(10, 11))) return false;
    return true;
  }

  voltarPagina(): void {
    this._location.back();
  }

  validarDatas(dataInicio: Date, dataFim: Date) {
    return dataInicio < dataFim;
  }

  validarCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj === '') return false;

    if (cnpj.length !== 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj === '00000000000000' ||
        cnpj === '11111111111111' ||
        cnpj === '22222222222222' ||
        cnpj === '33333333333333' ||
        cnpj === '44444444444444' ||
        cnpj === '55555555555555' ||
        cnpj === '66666666666666' ||
        cnpj === '77777777777777' ||
        cnpj === '88888888888888' ||
        cnpj === '99999999999999')
        return false;

    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros: any = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }

    let resultado: any = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== digitos.charAt(1))
          return false;

    return true;
  }

  mensagem(titulo, mensagem): {} {
    return {
      title: titulo,
      text: mensagem,
      type: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    };
  }

  mapearSituacaoFuncional(situacao): string {
    const situacoes = ['Em exercÃ­cio', 'Exonerado', 'Licenciado Sem RemuneraÃ§Ã£o',
      'Licenciado sem remuneraÃ§Ã£o', 'Cedido com Ã´nus', 'Cedido sem Ã´nus',
      'Requisitado com Ã´nus', 'Requisitado sem Ã´nus', 'Demitido', 'Em disponibilidade',
      'Falecido', 'Aposentado', 'Recluso', 'Reforma Militar', 'Reserva Militar',
      'Outros'];

    return situacoes[situacao - 1];
  }

  validarEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  formatarDataBR(data): string {
    if (data != null) {
      if (data.getMonth() + 1 < 10) {
        return data.getDate() + '/0' + (data.getMonth() + 1) + '/' + data.getFullYear();
      }
      return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
    }
  }

  retornaData(data){
    return new Date(data);
  }

}
