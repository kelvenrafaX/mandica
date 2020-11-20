export class Categoria {
  Id: number;
  Descricao: string;
  Ativa: boolean;
  Add: boolean;
  Edit: boolean;
  categoriasFilhas: Categoria[];
  CategoriaPaiId: number;
}
