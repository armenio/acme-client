// variáveis globais criadas na view index.phtml

var JsonProducts = [];

/**
 * Verifica se algum produto foi marcado para remoção em massa
 */
var checkSelectedProducts = function () {
    if ($('input[name="ids[]"]:checked').length) {
        $('#products-remove-all').show();
    } else {
        $('#products-remove-all').hide();
    }
};

/**
 * Retorna o código html de um produto para exibir na listagem
 * @param product
 * @returns {string}
 */
var getProductTpl = function (product) {
    return '<tr>\
        <td class="td-checkbox">\
            <label class="custom-control custom-checkbox" for="id_' + product.id + '">\
                <input type="checkbox" name="ids[]" id="id_' + product.id + '" value="' + product.id + '" class="custom-control-input">\
                <span class="custom-control-indicator"></span>\
            </label>\
        </td>\
        <td>\
            <a class="products-view animated" href="#visualizar" data-id="' + product.id + '" data-toggle="modal" data-target="#modal-product">' + product.name + '</a>\
        </td>\
        <td class="text-center hidden-sm-down">\
            <a class="products-view animated" href="#visualizar" data-id="' + product.id + '" data-toggle="modal" data-target="#modal-product">' + (product.stock ? (product.stock + ' unidade' + (product.stock > 1 ? 's' : '')) : '<span class="text-danger">Esgotado!</span>') + '</a>\
        </td>\
        <td class="text-center">\
            <div class="actions hidden-lg-up">\
                <a class="product-edit animated" href="#editar" data-id="' + product.id + '" data-toggle="modal" data-target="#modal-products"><i class="material-icons">edit</i></a>\
                <a class="products-remove animated" href="#remover" data-id="' + product.id + '"><i class="material-icons">close</i></a>\
            </div>\
            <span class="placeholder"></span> \
        </td>\
    </tr>';
};

/**
 * Atualiza a listagem de produtos
 */
var updateProductsList = function () {

    var $list = $('#products-list tbody');

    var q = $.trim($('#element_q').val());

    $.ajax({
        url: basePath + '/products',
        type: 'GET',
        dataType: 'json',
        data: {
            q: q,
            order: 'stock',
            by: 'asc'
        },
        beforeSend: function (jqXHR) {
            jqXHR.setRequestHeader('Authorization', 'Bearer ' +  jwt.token);

            $('#app').addLoader();

            $('.error-message').remove();

            $list.hide().html('');
        },
        success: function (data) {
            JsonProducts = data;


            if (objectLength(data) > 0) {
                $list.show();

                for (var i in data) {
                    $list.append(getProductTpl(data[i]));
                }
            }
        },
        complete: function () {

            if ($.trim($list.html()) == '') {
                if (q !== '') {
                    $list.before('<p class="error-message">Nenhum produto encontrado na busca.</p>\
                    <p class="error-message"><a class="products-filter animated" href="#todos" data-id="0">Ver todos os produtos</a></p>');
                } else {
                    $list.before('<p class="error-message">Nenhum produto encontrado.</p>\
                    <p class="error-message"><a class="products-add btn btn-primary animated" href="#adicioinar-produto" data-toggle="modal" data-target="#modal-products"><i class="icon material-icons">add</i> Cadastrar um produto</a></p>');
                }
            }

            checkSelectedProducts();

            $('#app').removeLoader();
        }
    });
};

$(document).ready(function () {
    updateProductsList();

    var formDefaults = {
        id: '',
        name: '',
        description: '',
        price: '',
        stock: ''
    };

    /**
     * listener para links de cadastro produtos
     */
    $(document).on('click', '.products-add, .product-edit', function (e) {
        e.preventDefault();

        var $form = $('#modal-products form');

        if ($form.closest('.modal').find('.alert, .validation-message').length > 0) {
            $form.closest('.modal').find('.alert, .validation-message').remove();
        }

        $form.bindForm($.extend({}, formDefaults));

        setTimeout(function () {
            $form.find('#element_name').focus();
        }, 500);
    });

    /**
     * listener para formulário de cadastro de produtos
     */
    $('#modal-products form').zfAjaxForm({
        beforeSend: function (jqXHR) {
            jqXHR.setRequestHeader('Authorization', 'Bearer ' +  jwt.token);

            var $form = $(this);

            $form.closest('.modal').find('.alert, .validation-message').remove();

            $form.closest('.modal-content').addLoader();
        },
        complete: function () {
            var $form = $(this);

            $form.closest('.modal-content').removeLoader();
        },
        success: function (data) {
            var $form = $(this);

            $form.closest('.modal').modal('hide');

            updateProductsList();
        },
        error: function (jqXHR) {
            var $form = $(this);

            var data = jqXHR.responseJSON;

            if (typeof data.message == 'string') {
                showFlashMessenger($form, [{
                    type: 'danger',
                    icon: 'error',
                    message: 'Não foi possível validar os dados.'
                }]);

                removeFlashMessenger();
            }

            if (typeof data.errors == 'object') {
                showFormErrorMessages($form, data.errors);
            }
        }
    });

    /**
     * listener para links de edição de produtos
     */
    $(document).on('click', '.product-edit', function (e) {
        e.preventDefault();

        var $self = $(this);
        var $form = $('#modal-products form');

        $.ajax({
            url: basePath + '/products/' + $self.data('id'),
            type: 'GET',
            dataType: 'json',
            beforeSend: function (jqXHR) {
                jqXHR.setRequestHeader('Authorization', 'Bearer ' +  jwt.token);

                $form.closest('.modal-content').addLoader();
            },
            complete: function () {
                $form.closest('.modal-content').removeLoader();

                removeFlashMessenger();
            },
            success: function (data) {
                $form.bindForm($.extend($.extend({}, formDefaults), data));
            },
            error: function (jqXHR) {
                showFlashMessenger($form, [{
                    type: 'danger',
                    icon: 'error',
                    message: 'Produto não encontrado.'
                }]);

                removeFlashMessenger();
            }
        });
    });

    /**
     * listener para links de remoção de produtos
     */
    $(document).on('click', '.products-remove', function (e) {
        e.preventDefault();

        var $self = $(this);

        if (confirm('Deseja remover este produto?')) {
            $.ajax({
                url: basePath + '/products/' + $self.data('id'),
                type: 'DELETE',
                dataType: 'json',
                beforeSend: function (jqXHR) {
                    jqXHR.setRequestHeader('Authorization', 'Bearer ' +  jwt.token);

                    $('#app').addLoader();
                },
                complete: function () {
                    
                },
                success: function (data) {
                    updateProductsList();
                },
                error: function (jqXHR) {
                    var $form = $('main form');

                    $('#app').removeLoader();
                    
                    showFlashMessenger($form, [{
                        type: 'danger',
                        icon: 'error',
                        message: 'Produto não encontrado.'
                    }]);

                    removeFlashMessenger();
                }
            });
        }
    });

    /**
     * listener para link de remoção de produtos em massa
     */
    $(document).on('click', '#products-remove-all', function (e) {
        e.preventDefault();

        if (confirm('Deseja remover estes produtos?')) {
            $.ajax({
                url: basePath + '/products',
                type: 'DELETE',
                dataType: 'json',
                data: $('#form-products-list').serialize(),
                beforeSend: function (jqXHR) {
                    jqXHR.setRequestHeader('Authorization', 'Bearer ' +  jwt.token);

                    $('#app').addLoader();
                },
                complete: function () {

                },
                success: function (data) {
                    updateProductsList();
                },
                error: function (jqXHR) {
                    $('#app').removeLoader();

                    var $form = $('main form');
                    showFlashMessenger($form, [{
                        type: 'danger',
                        icon: 'error',
                        message: 'Produtos não encontrados.'
                    }]);

                    removeFlashMessenger();
                }
            });
        }
    });

    /**
     * listener para verificação de produtos marcados para remoção em massa
     */
    $(document).on('change', 'input[name="ids[]"]', function () {
        checkSelectedProducts();
    });

    /**
     * listener para links de visualização de produtos
     */
    $(document).on('click', '.products-view', function (e) {
        e.preventDefault();

        var $self = $(this);
        var $container = $('#modal-product .details');

        $.ajax({
            url: basePath + '/products/' + $self.data('id'),
            type: 'GET',
            dataType: 'json',
            beforeSend: function (jqXHR) {
                jqXHR.setRequestHeader('Authorization', 'Bearer ' +  jwt.token);

                $container.find('#product-name').html('');

                $container.closest('.modal-content').addLoader();
            },
            complete: function () {
                $container.closest('.modal-content').removeLoader();

                removeFlashMessenger();
            },
            success: function (data) {
                $container.find('#product-name').html(data.name);
                $container.find('#product-description').html(data.description);
                $container.find('#product-price').html(data.price);
                $container.find('#product-stock').html(data.stock);
            },
            error: function (jqXHR) {
                var $form = $('main form');
                showFlashMessenger($form, [{
                    type: 'danger',
                    icon: 'error',
                    message: 'Produto não encontrado.'
                }]);

                removeFlashMessenger();

                $container.closest('.modal').modal('hide');
            }
        });
    });

    /**
     * listener para link de envio de relatório
     */
    $(document).on('click', '#send-report', function (e) {
        e.preventDefault();

        if (confirm('Deseja gerar o relatório e encaminhá-lo por email?')) {
            $.ajax({
                url: basePath + '/products/report',
                type: 'GET',
                dataType: 'json',
                beforeSend: function (jqXHR) {
                    jqXHR.setRequestHeader('Authorization', 'Bearer ' +  jwt.token);

                    $('#app').addLoader();
                },
                complete: function () {
                    $('#app').removeLoader();

                    removeFlashMessenger();
                },
                success: function (data) {
                    var $form = $('main form');

                    showFlashMessenger($form, [{
                        type: 'success',
                        icon: 'check_circle',
                        message: 'Relatório enviado com sucesso!'
                    }]);
                },
                error: function (jqXHR) {
                    var $form = $('main form');

                    showFlashMessenger($form, [{
                        type: 'danger',
                        icon: 'error',
                        message: 'Não foi possível enviar o relatório.'
                    }]);
                }
            });
        }
    });

    /**
     * listener para formulário de busca de produtos
     */
    $('.form-search').on('submit', function (e) {
        e.preventDefault();

        var q = $.trim($(this).find('#element_q').val());
        $('input[name="q"]').val(q);

        updateProductsList();
    });

    $(document).on('click', '.products-filter', function (e) {
        e.preventDefault();

        $('input[name="q"]').val('');

        updateProductsList();
    });

    //máscara
    $('#element_price').maskMoney({
        thousands: ''
    });
});