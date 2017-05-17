# Gerenciador de produtos Acme Zend 3

Cliente para Api para gestão de produtos da empresa Acme

#### Tecnologias utilizadas
- Bower como gerenciador de dependências de assets
- Grunt para automação de tarefas
- Bootstrap 4.0.0-alpha.4
- Jquery
- Sass (css)

## Instalação do projeto

    $ git clone https://github.com/armenio/acme-client.git aplicacao
    $ cd aplicacao
    $ bower install

- Não conhece o bower? [Veja aqui](https://bower.io/#install-bower) como usá-lo

## Agendamento de envio de relatórios

basta adicionar o seguinte comando na crontab:


    $ php /caminho/do/aplicacao/report.php seu_username seu_password

## Rodando a aplicação

     $ cd /caminho/da/aplicacao
     $ php -S 127.0.0.1:8000