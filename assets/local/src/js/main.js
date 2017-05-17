var jwt = {};

$(document).ready(function () {
    try {
        jwt = $.parseJSON(Cookies.get('jwt'));
    } catch (e) {
        
    }

    if (typeof jwt.user == 'object') {
        $('.identity-manager.identity-false').removeClass('identity-active');
        $('.identity-manager.identity-true').addClass('identity-active');

        $('#identity-username').text(jwt.user.name.split(' ')[0]);
    }
});