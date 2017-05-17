/**
 * Função que retorna o tamanho de um objeto
 *
 * Exemplo de uso:
 *
 * objectLength({
 *   value: option,
 *   value2:option2,
 *   value3:option3,
 *   valueN:optionN
 * });
 *
 * retornará 4
 *
 * @param arg
 * @returns {number}
 */
var objectLength = function (arg) {
    var l = 0;

    for (i in arg) {
        l++;
    }

    return l;
};

/**
 * Plugin para popular um elemento tipo SELECT
 *
 * Exemplo de uso:
 *
 * $('#select').selectBoxPopulate({
 *   value: option,
 *   value2:option2,
 *   value3:option3,
 *   valueN:optionN
 * });
 *
 * @param data
 * @returns {*}
 */
$.fn.selectBoxPopulate = function (data) {
    return this.each(function () {
        var $container = $(this);

        while ($container.find('option').length > 1) {
            $container.find('option').eq($container.find('option').length - 1).remove();
        }

        if (objectLength(data) > 0) {
            for (i in data) {
                $container.append('<option value="' + i + '">' + data[i] + '</option>');
            }
        }
    });
};

/**
 * Plugin que adiciona um código html com a mensagem
 * "Aguarde..." e um spinner em SVG para deixar as
 * requisições Ajax mais amigáveis
 *
 * Exemplo de uso:
 *
 * $('#id').addLoader();
 *
 * @returns {*}
 */
$.fn.addLoader = function () {
    return this.each(function () {
        var $to = $(this);

        if(!$to.data('load-count')){
            $to.data('load-count', 0);
        }

        var loadCount = parseInt($to.data('load-count'));
        loadCount++;
        $to.data('load-count', loadCount);

        if (loadCount > 1) {
            return;
        }

        $to.addClass('loading');

        if ($to.find('#loader').length == 0) {
            $to.append('\
            <div id="loader">\
                <div class="content clearfix">\
                    <svg width="56px" height="56px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-default"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><rect  x="46.5" y="40" width="7" height="20" rx="3" ry="3" fill="#000000" transform="rotate(0 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="3" ry="3" fill="#000000" transform="rotate(30 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.08333333333333333s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="3" ry="3" fill="#000000" transform="rotate(60 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.16666666666666666s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="3" ry="3" fill="#000000" transform="rotate(90 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.25s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="3" ry="3" fill="#000000" transform="rotate(120 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.3333333333333333s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="3" ry="3" fill="#000000" transform="rotate(150 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.4166666666666667s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="3" ry="3" fill="#000000" transform="rotate(180 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="3" ry="3" fill="#000000" transform="rotate(210 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5833333333333334s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="3" ry="3" fill="#000000" transform="rotate(240 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.6666666666666666s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="3" ry="3" fill="#000000" transform="rotate(270 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.75s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="3" ry="3" fill="#000000" transform="rotate(300 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.8333333333333334s" repeatCount="indefinite"/></rect><rect  x="46.5" y="40" width="7" height="20" rx="3" ry="3" fill="#000000" transform="rotate(330 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.9166666666666666s" repeatCount="indefinite"/></rect></svg>\
                    <span class="text">Aguarde...</span>\
                </div>\
            </div>\
            ');
        }

        $to.find('#loader').fadeIn('high');
    });
};

/**
 * Plugin que remove o trecho html descrito no plugin addLoader
 *
 * Exemplo de uso:
 *
 * $('#id').removeLoader();
 *
 * @returns {*}
 */
$.fn.removeLoader = function () {
    return this.each(function () {
        var $from = $(this);

        var loadCount = parseInt($from.data('load-count'));
        loadCount--;
        $from.data('load-count', loadCount);

        if (loadCount > 0) {
            return;
        }

        $from.find('#loader').fadeOut(200, function () {
            setTimeout(function () {
                $from.find('#loader').remove();
                $from.removeClass('loading');
            }, 1);
        });
    });
};

/**
 * Facilitador para remover mensagens de erro/sucesso
 */
var removeFlashMessenger = debounce(function () {
    if ($('.alert, .validation-message').length > 0) {
        $('.alert, .validation-message').fadeOut(function () {
            $('.alert, .validation-message').remove();
        });
    }
}, 10000);

/**
 * Facilitador para mostrar mensagens de erro/sucesso
 */
var showFlashMessenger = function ($form, messages) {
    for (var i in messages) {
        var message = messages[i];

        var html = '\
        <div class="alert alert-' + message.type + ' spacer" role="alert">\
            <div class="has-icon"> \
                <i class="icon material-icons">' + message.icon + '</i> ' + message.message + '\
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                    <span aria-hidden="true">&times;</span>\
                </button>\
            </div>\
        </div>\
        ';

        $form.before(html);
    }
};

/**
 * Facilitador para mostrar mensagens de erro em campos específicos de um formulário
 */
var showInputErrorMessages = function ($input, messages) {
    var html = '\
    <ul class="validation-message">\
    ';

    for (var i in messages) {
        var message = messages[i];
        html += '\
        <li>' + message + '</li>\
        ';
    }

    html += '\
    </ul>\
    ';

    $input.closest('.form-group').append(html);
};

/**
 * Facilitador para mostrar mensagens de erro em campos de um formulário
 */
var showFormErrorMessages = function ($form, messages) {
    for (var i in messages) {
        var fieldset = messages[i];

        for (var j in fieldset) {
            var field = fieldset[j];

            if (typeof field == 'string') {
                var $input = $form.find('#element_' + i);
                var message = field;
                showInputErrorMessages($input, [message]);

                break;
            } else {
                for (var k in field) {
                    var $input = $form.find('#element_' + j);
                    var message = field[k];
                    showInputErrorMessages($input, [message]);

                    break;
                }
            }
        }
    }
};

/**
 * Plugin que faz a integração entre os formulários do front-end
 * com o processamento no back-end baseado no funcionamento do
 * Zend Framework 3.
 *
 * Exemplo de uso:
 *
 * $('#form-id').zfAjaxForm({
 *     beforeSend: function () {
 *         // callback chamado no método beforeSend do $.ajax
 *         // pode ser um $('#id').addLoader();
 *     },
 *     complete: function () {
 *         // callback chamado no método complete do $.ajax
 *         // pode ser um $('#id').removeLoader();
 *         // ou um window.location.href = '/final';
 *     },
 *     success: function (data) {
 *         // callback chamado no método success do $.ajax
 *         // pode ser um $('#id').removeLoader();
 *         // ou um window.location.href = '/sucesso';
 *         // ou um alert('Sucesso!');
 *     },
 *     error: function () {
 *         // callback chamado no método error do $.ajax
 *         // pode ser um $('#id').removeLoader();
 *         // ou um window.location.href = '/erro';
 *         // ou um alert('Erro!');
 *     }
 * });
 *
 * @param options
 * @returns {*}
 */
$.fn.zfAjaxForm = function (options) {

    var _defaults = {
        url: basePath,
        type: 'POST',
        dataType: 'json',
        async: true
    };

    return this.each(function () {
        $(this).on('submit', function (e) {
            e.preventDefault();

            var context = this;
            var $form = $(this);

            var defaults = $.extend({}, _defaults); //clona o _defaults

            var id = $.trim($form.find('input[name="id"]').val());
            defaults.url += $form.data('action');

            if (id !== '') {
                defaults.url += '/' + id;
                defaults.type = 'PUT';
            }

            options = $.extend(defaults, options);
            console.log(options);

            $.ajax({
                url: options.url,
                type: options.type,
                dataType: options.dataType,
                data: $form.serialize(),
                async: options.async,
                beforeSend: function (jqXHR) {
                    $('.alert, .validation-message').remove();

                    if (typeof options.beforeSend == 'function') {
                        options.beforeSend.apply(context, [jqXHR]);
                    }
                },
                complete: function () {
                    if (typeof options.complete == 'function') {
                        options.complete.apply(context);
                    }

                    removeFlashMessenger();
                },
                success: function (data) {
                    if (typeof options.success == 'function') {
                        options.success.apply(context, [data]);
                    }
                },
                error: function (jqXHR) {
                    if (typeof options.error == 'function') {
                        options.error.apply(context, [jqXHR]);
                    }
                }
            });
        });
    });
};

/**
 * Plugin que ajusta a altura de um ou mais elementos para que fiquem
 * todos com a mesma altura
 *
 * @param void
 */
$.fn.fixHeight = function () {
    var height = 0;

    this.each(function () {
        $(this).css('height', 'auto');
    });

    this.each(function () {
        var _height = $(this).outerHeight(false);

        if (_height > height) {
            height = _height;
        }
    });

    this.css('height', height);
};

/**
 * Plugin para popular um form
 *
 * @param data
 * @returns {*}
 */
$.fn.bindForm = function (data) {
    return this.each(function () {
        var $form = $(this);

        var $input;
        for (var i in data) {
            $input = $form.find('[name="' + i + '"]');
            if ($input.length) {
                $input.val(data[i]);
            }
        }
    });
};

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};