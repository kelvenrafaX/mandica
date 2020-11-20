import { FormGroup, FormControl, Validators } from '@angular/forms';

export const formGroupAcervo = new FormGroup({
    Id: new FormControl('', []),
    Situacao: new FormControl('', []),
    Tipo: new FormControl('', []),
    Estocado: new FormControl('', []),
    Categoria: new FormGroup({
        Descricao: new FormControl()
    }),
    CategoriaId: new FormControl('', [
        Validators.required
      ]),
    Fornecedor: new FormGroup({
        Pessoa: new FormGroup({
            Nome: new FormControl()
        })
    }),
    FornecedorId: new FormControl('', [
        Validators.required
    ]),
    Nome: new FormControl('', [
        Validators.required
    ]),
    Descricao : new FormControl(''),
    ValorUnitarioLocacao: new FormControl('', [
        Validators.required
    ]),
    ValorUnitarioReposicao: new FormControl('', [
        Validators.required
    ]),
    ValorCustoProduto: new FormControl('', [
        Validators.required
    ]),
    ImagemProdutos: new FormControl('', [ ])
});
