import { FormGroup, FormControl, Validators } from '@angular/forms';

export const formGroupProduto = new FormGroup({
    Id: new FormControl('', []),
    Situacao: new FormControl('', []),
    Tipo: new FormControl('', []),
    Estocado: new FormControl('', []),
    CategoriaId: new FormControl('', [
        Validators.required
      ]),
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
    ValorCustoProduto: new FormControl('', [
        Validators.required
    ]),
    ImagemProdutos: new FormControl('', [ ]),
    EstoqueMin: new FormControl('', [ ]),
    EstoqueMax: new FormControl('', [ ])
});
