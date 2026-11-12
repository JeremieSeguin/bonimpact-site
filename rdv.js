/*
    Prise de rendez-vous avec Cal.com (hébergement européen).
    - [data-rdv] : bouton qui ouvre le calendrier par-dessus la page.
    - Le script de Cal.com n'est chargé qu'au premier clic.
    - Le href du bouton pointe vers la page de réservation : c'est le repli
      si le JavaScript ne tourne pas.
*/
(function () {
    'use strict';
    var CAL_LINK = 'bonimpact/appel-decouverte';
    var ORIGIN = 'https://app.cal.eu';
    var ready = false;

    function charger() {
        if (ready) { return; }
        ready = true;
        (function (C, A, L) {
            var p = function (a, ar) { a.q.push(ar); };
            var d = C.document;
            C.Cal = C.Cal || function () {
                var cal = C.Cal;
                var ar = arguments;
                if (!cal.loaded) {
                    cal.ns = {};
                    cal.q = cal.q || [];
                    d.head.appendChild(d.createElement('script')).src = A;
                    cal.loaded = true;
                }
                if (ar[0] === L) {
                    var api = function () { p(api, arguments); };
                    var namespace = ar[1];
                    api.q = api.q || [];
                    if (typeof namespace === 'string') {
                        cal.ns[namespace] = cal.ns[namespace] || api;
                        p(cal.ns[namespace], ar);
                        p(cal, ['initNamespace', namespace]);
                    } else { p(cal, ar); }
                    return;
                }
                p(cal, ar);
            };
        })(window, ORIGIN + '/embed/embed.js', 'init');
        window.Cal('init', 'rdv', { origin: ORIGIN });
        window.Cal.ns.rdv('ui', {
            theme: 'light',
            cssVarsPerTheme: { light: { 'cal-brand': '#2E5368' } },
            hideEventTypeDetails: false
        });
    }

    document.querySelectorAll('[data-rdv]').forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            charger();
            window.Cal.ns.rdv('modal', { calLink: CAL_LINK, config: { layout: 'month_view' } });
        });
    });
})();
