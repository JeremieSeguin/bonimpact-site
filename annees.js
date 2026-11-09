/*
    Dates qui se mettent à jour seules.
    - [data-years-since="AAAA-MM"] : nombre d'années pleines depuis ce mois
      (septembre 2015 = début de carrière).
    - [data-current-year] : année en cours (pied de page).
    La valeur écrite dans le HTML sert de repli si le JavaScript ne tourne pas.
*/
(function () {
    'use strict';
    var now = new Date();

    document.querySelectorAll('[data-years-since]').forEach(function (el) {
        var parts = el.getAttribute('data-years-since').split('-');
        var years = now.getFullYear() - parseInt(parts[0], 10);
        if (now.getMonth() + 1 < parseInt(parts[1], 10)) { years -= 1; }
        el.textContent = years;
    });

    document.querySelectorAll('[data-current-year]').forEach(function (el) {
        el.textContent = now.getFullYear();
    });
})();
