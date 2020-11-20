import { FormGroup, FormControl, Validators } from '@angular/forms';

export const formGroupCompra = new FormGroup({
  Id: new FormControl('', []),
  NumDocumento: new FormControl('', []),
  ProdutoId: new FormControl('', [
    Validators.required
  ]),
  Quantidade: new FormControl('', [
    Validators.required,
    Validators.minLength(1)
  ]),
  DataCompra: new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9]')
  ]),
  FornecedorId: new FormControl('', [ ])
});
