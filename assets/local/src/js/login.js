$(document).ready(function () {

    Cookies.remove('jwt');

    if($.url().param('logout') == 'now'){
        showFlashMessenger($('#login form'), [{
            type: 'success',
            icon: 'check_circle',
            message: 'Logout efetuado com sucesso.'
        }]);

        removeFlashMessenger();
    }

    /**
     * listener para formulário de login
     */
    $('#login form').zfAjaxForm({
        beforeSend: function (jqXHR) {
            $('body').addLoader();
        },
        complete: function () {

        },
        success: function (data) {
            var $form = $(this);

            if (typeof data == 'object' && typeof data.token == 'string') {
                Cookies.set('jwt', data);

                window.location.href = 'index.html';
            } else {
                $('body').removeLoader();

                showFlashMessenger($form, [{
                    type: 'danger',
                    icon: 'error',
                    message: 'Ocorreu um erro durante o login.'
                }]);

                removeFlashMessenger();
            }
        },
        error: function (jqXHR) {
            $('body').removeLoader();

            var $form = $(this);
            var data = jqXHR.responseJSON;

            showFlashMessenger($form, [{
                type: 'danger',
                icon: 'error',
                message: 'Dados inválidos.'
            }]);

            removeFlashMessenger();

            if (typeof data.errors == 'object') {
                showFormErrorMessages($form, data.errors);
            }
        }
    });
});