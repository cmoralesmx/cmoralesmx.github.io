$(document).ready(function() {
    $('a.abstract').click(function() {
        $(this).parent().parent().find(".abstract.hidden").toggleClass('open');
    });
    $('a.bibtex').click(function() {
        $(this).parent().parent().find(".bibtex.hidden").toggleClass('open');
    });
    $('.navbar-nav').find('a').removeClass('waves-effect waves-light');

    fetch('https://rqv1z9daf2.execute-api.us-east-1.amazonaws.com/Prod/put')
    .then(() => fetch('https://rqv1z9daf2.execute-api.us-east-1.amazonaws.com/Prod/get'))
    .then(response => response.json())
    .then((data) => {
        document.getElementById('total-visitors').innerText = 'Total visitors: ' + data.count
    })
});
