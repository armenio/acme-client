$(document).ready(function () {
    if (typeof jwt.user == 'object') {
        $('#register form').bindForm(jwt.user);
        $('#register form').find('#element_username').prop('disabled', true);
    }

    /**
     * listener para formulário de cadastro
     */
    $('#register form').zfAjaxForm({
        beforeSend: function (jqXHR) {
            if (typeof jwt.token == 'string') {
                jqXHR.setRequestHeader('Authorization', 'Bearer ' + jwt.token);
            }

            $('body').addLoader();
        },
        complete: function () {

        },
        success: function (data) {
            var $form = $(this);

            if (typeof jwt.token == 'string' && typeof data == 'object' && typeof data.username == 'string') {
                jwt.user = data;
                Cookies.set('jwt', jwt);

                window.location.href = 'index.html';
            } else if (typeof data == 'object' && typeof data.token == 'string') {
                Cookies.set('jwt', data);

                window.location.href = 'index.html';
            } else {
                $('body').removeLoader();

                showFlashMessenger($form, [{
                    type: 'danger',
                    icon: 'error',
                    message: 'Ocorreu um erro durante o cadastro.'
                }]);

                removeFlashMessenger();
            }
        },
        error: function (jqXHR) {
            $('body').removeLoader();

            var $form = $(this);
            var data = jqXHR.responseJSON;

            if (typeof data == 'object' && typeof data.errors == 'object' && typeof data.errors.errors == 'object' && typeof data.errors.errors[0] == 'string') {
                showFlashMessenger($form, [{
                    type: 'danger',
                    icon: 'error',
                    message: data.errors.errors[0]
                }]);

                removeFlashMessenger();
            } else {
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
});