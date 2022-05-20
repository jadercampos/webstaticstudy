(function (w, d, s, u) {
    w.gbwawc = {
    url: u,
    options: {
            waId: "+55 (11) 97828-5612",
            siteName: "Hospital Veterinário VIDAS",
            siteTag: "Estamos Online!",
            siteLogo: "https://webstaticstudy-cda1c.web.app/assets/img/logo/Logo.png",
            widgetPosition: "RIGHT",
            triggerMessage: "Chamar no WhatsApp",
            welcomeMessage: "Olá, td bem?",
            brandColor: "#25D366",
            messageText: "Estou entrando em contato pelo site VIDAS, e gostaria de:\n",
            replyOptions: ['Atendimento de Emergência','Agendar uma consulta','Suporte ao Veterinário','Trabalhe conosco','Outros assuntos'],
        },
    };
    var h = d.getElementsByTagName(s)[0],
    j = d.createElement(s);
    j.async = true;
    j.src = u + "/whatsapp-widget.min.js?_=" + Math.random();
    h.parentNode.insertBefore(j, h);
    })(window, document, "script", "https://waw.gallabox.com");