
const Home = {
    text: 'Home',
    link: '/home',
    icon: 'icon-home'
};

const Pedidos = {
  text: 'Pedidos/Orçamentos',
  link: '/pedidos',
  icon: 'icon-doc',
  submenu: [
      {
        text: 'Painel Geral',
        link: '/pedidos/consultar'
      },
      {
        text: 'Gerar Orçamento',
        link: '/cadastros/orcamento'
      },
      {
        text: 'Gerar Pedido',
        link: '/cadastros/pedido'
      },
      {
        text: 'Entrega / Devolução',
        link: '/pedidos/consultar'
      }
  ]
};

const Compras = {
  text: 'Compras',
  link: '/cadastros/compra',
  icon: 'icon-basket-loaded'
};

const Estoque = {
  text: 'Estoque',
  link: '/estoque',
  icon: 'icon-social-dropbox',
  submenu: [
      {
        text: 'Acervo',
        link: '/cadastros/estoque'
      },
      {
        text: 'Produto',
        link: '/cadastros/estoque'
      },
  ]
};

const Cadastros = {
    text: 'Cadastros',
    link: '/cadastros',
    icon: 'icon-plus',
    submenu: [
        {
          text: 'Clientes',
          link: '/cadastros/cliente'
        },
        {
          text: 'Funcionario',
          link: '/cadastros/funcionario'
        },
        {
          text: 'Fornecedores',
          link: '/cadastros/fornecedor'
        },
        {
          text: 'Cargos',
          link: '/cadastros/cargo'
        },
        {
          text: 'Categorias',
          link: '/cadastros/categoria'
        },
        {
          text: 'Acervo',
          link: '/cadastros/acervo'
        },
        {
          text: 'Produto',
          link: '/cadastros/produto'
        },
        {
          text: 'Serviço',
          link: '/cadastros/servico'
        },
        {
          text: 'Forma de Pagamento',
          link: '/cadastros/forma-de-pagamento'
        },
        {
          text: 'Fretes',
          link: '/cadastros/fretes'
        }
    ]
};

const Financeiro = {
  text: 'Financeiro',
  link: '/financeiro',
  icon: 'icon-wallet',
  submenu: [
    {
      text: 'Resumo',
      link: '/financeiro/resumo'
    },
    {
      text: 'Transações',
      link: '/financeiro/transacoes'
    },
    {
      text: 'Contas a Pagar',
      link: '/financeiro/contas-a-pagar'
    },
    {
      text: 'Contas a Receber',
      link: '/financeiro/contas-a-receber'
    }
  ]
};

const Configuracoes = {
  text: 'Configurações',
  link: '/configuracoes',
  icon: 'icon-settings',
  submenu: [
    {
      text: 'Dados da Empresa',
      link: '/configuracoes/dados-empresa'
    },
    {
      text: 'Usuários',
      link: '/configuracoes/usuarios'
    },
    {
      text: 'Ajustes',
      link: '/configuracoes/ajustes'
    },
    {
      text: 'Importar / Exportar',
      link: '/configuracoes/importar-exportar'
    },
    {
      text: 'Backup',
      link: '/configuracoes/backup'
    }
  ]
};
const ControleAcesso = {
  text: 'Controle de Acesso',
  link: '/controle-acesso',
  icon: 'icon-user-follow',
  // submenu: [
  //   {
  //     text: 'Dados da Empresa',
  //     link: '/configuracoes/dados-empresa'
  //   },
  // ]
};

export const menu = [
    Home,
    Pedidos,
    Compras,
    Estoque,
    Cadastros,
    Financeiro,
    Configuracoes,
    ControleAcesso
];
