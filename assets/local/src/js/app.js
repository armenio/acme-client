$(document).ready(function () {
    if (typeof jwt.user != 'object') {
        $('body').css('min-height', $(window).height());
        $('*').removeLoader();
        $('body').addLoader();

        window.location.href = 'login.html';
    }

    // ajusta a altura do app
    var fixAppHeight = function () {
        var windowHeight = $(window).height();
        var headerHeight = $('#header').height();
        var appHeight = windowHeight - headerHeight;

        $('#app').height(appHeight);
    };

    fixAppHeight();

    $(window).on('resize', function () {
        fixAppHeight();
    });

    // esconde a barra de navegação
    var hideNavBar = function () {
        if ($('.navbar-toggler').is(':visible')) {
            $('.navbar-toggler').trigger('click');
        }
    };

    $('aside .form-search').on('submit', function (e) {
        hideNavBar();
    });

    $(document).on('click', 'aside a', function (e) {
        hideNavBar();
    });
});