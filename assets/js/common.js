$(document).ready(function() {
    $('a.abstract').click(function() {
        $(this).parent().parent().find(".abstract.hidden").toggleClass('open');
    });
    $('a.bibtex').click(function() {
        $(this).parent().parent().find(".bibtex.hidden").toggleClass('open');
    });
    $('.navbar-nav').find('a').removeClass('waves-effect waves-light');

    fetch('https://api.cm-cloudarchitect.com/put')
    .then(() => fetch('https://api.cm-cloudarchitect.com/get'))
    .then(response => response.json())
    .then((data) => {
        document.getElementById('total-visitors').innerText = 'Total visitors since the 1st of February, 2022: ' + data.count
    })
});
