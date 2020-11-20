import { FormGroup, FormControl, Validators } from '@angular/forms';

export const formGroupServico = new FormGroup({
    Id: new FormControl('', []),
    Situacao: new FormControl('', []),
    Tipo: new FormControl('', []),
    Estocado: new FormControl('', []),
    CategoriaId: new FormControl('', [
        Validators.required
      ]),
    FornecedorId: new FormControl('', []),
    Nome: new FormControl('', [
        Validators.required
    ]),
    Descricao : new FormControl(''),
    ValorUnitarioLocacao: new FormControl('', [
        Validators.required
    ]),
    ValorUnitarioReposicao: new FormControl('', []),
    ValorCustoProduto: new FormControl('', []),
    ImagemProdutos: new FormControl('', [ ])
});
