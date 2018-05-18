function displayManual() {
    function displaySlide(slide) {
        $('#slideshow').empty();
        let requestedTab;

        $('#slideshow').append('<div>' + manual[slide - 1].slide + '</div>');
        $('#slideshow').append('<p>' + manual[slide - 1].title + '</p>');
        $('#slideshow').append('<p>' + manual[slide - 1].text + '</p>');
        
        $('#slideshow').append('<button id="slideshowPrevButton">' + manual[slide - 1].previousSlide + '</button>');
        $('#slideshow').append('<button id="slideshowNextButton">' + manual[slide - 1].nextSlide + '</button>');
        
        $('#slideshowPrevButton').click(function() {
            requestedTab = $('#slideshowPrevButton').text() - 1;
            displaySlideshowButtons(requestedTab);
            editSlideContent(requestedTab);
        });
        
        $("#slideshowNextButton").click(function(){
            requestedTab = $('#slideshowNextButton').text() - 1;
            displaySlideshowButtons(requestedTab);
            editSlideContent(requestedTab);
        });
    }
    
    function editSlideContent(requestedTab) {
        $('#slideshow > div').text(manual[requestedTab].slide);
        $('#slideshow > p:first-of-type').text(manual[requestedTab].title);
        $('#slideshow > p:last-of-type').text(manual[requestedTab].text);
        $('#slideshow > button:first-of-type').text(manual[requestedTab].previousSlide);
        $('#slideshow > button:last-of-type').text(manual[requestedTab].nextSlide);
        
    }
    
    function displaySlideshowButtons(requestedTab) {
        // Slideshow limits management        
        switch (requestedTab) {
            case 0:
                $('#slideshow > button:first-of-type').css('display', 'none');
            break;

            case 1:
                $('#slideshow > button:first-of-type').css('display', 'block');
            break;

            case 3:
                $('#slideshow > button:last-of-type').css('display', 'block');
            break;
                
            case 4:
                $('#slideshow > button:last-of-type').css('display', 'none');
            break;
        }
    }
        
    // Slideshow content
    const manual = [
        {
            title: "Bienvenue sur Ve'lyon",
            text: "Réservez dès à présent votre vélo'v à Lyon en quelques étapes.",
            slide: 1,
            previousSlide: 5,
            nextSlide: 2,
            demo: ""
        },
        {
            title: "Choix de la station",
            text: "Sélectionnez une station ouverte sur la carte ci-dessous. Un drapeau rouge est une station fermée, un drepeau orange est une station sans velo'v disponible, un drapeau bleu est une station avec des velo'v disponibles.",
            slide: 2,
            previousSlide: 1,
            nextSlide: 3,
            demo: ""
        },
        {
            title: "Réservation du velo'v",
            text: "Cliquez sur 'Je réserve mon vélo'v', puis signez dans l'encart prévu à cet effet.",
            slide: 3,
            previousSlide: 2,
            nextSlide: 4,
            demo: ""
        },
        {
            title: "Récupérez votre velo'v",
            text: "Un décompte de 20 minutes vous indique le temps restant pendant lequel votre velo'v est disponible. Si celui-ci atteint 0 et que vous n'avez pas récupéré votre vélo, celle-ci sera automatiquement annulée.",
            slide: 4,
            previousSlide: 3,
            nextSlide: 5,
            demo: ""
        },
        {
            title: "Annulez votre réservation",
            text: "Vous pouvez annuler votre réservation avec le bouton prévu à cet effet sous le décompte, ou réserver un velo'v à une autre station, ce qui annulera la réservation précédente.",
            slide: 5,
            previousSlide: 4,
            nextSlide: 1,
            demo: ""
        }
    ];
    
    // Load the first slide
    displaySlide(1);
}