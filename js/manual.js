function displayManual() {
    function displaySlide(slide) {
        $('#slideshow').empty();
        let requestedTab;

        // Slide info
        $('#slideshow').append('<div>' + manual[slide - 1].slide + '</div>');
        $('#slideshow').append('<p>' + manual[slide - 1].title + '</p>');
        $('#slideshow').append('<p>' + manual[slide - 1].text + '</p>');
        $('#slideshow').append('<div class="legende"><img src="images/markers/blue_flag.png" /><span>Station ouverte</span></div>');
        $('#slideshow').append('<div class="legende"><img src="images/markers/yellow_flag.png" /><span>Station sans vélo disponible</span></div>');
        $('#slideshow').append('<div class="legende"><img src="images/markers/red_flag.png" /><span>Station fermée</span></div>');       
        
        // Slide navigation
        $('#slideshow').append('<button>&#10094;</button>');
        $('#slideshow').append('<span>Précédent</span>');
        $('#slideshow').append('<span>Suivant</span>');
        $('#slideshow').append('<button>&#10095;<//button>');
        
        // Slide navigation through buttons
        $('#slideshow > button:first-of-type').click( () => {
            requestedTab = $('#slideshow > div:nth-child(1)').text() - 2;
            displayInteractiveElements(requestedTab);
            editSlideContent(requestedTab);
        });
        
        $('#slideshow > button:last-of-type').click( () => {
            requestedTab = Number($('#slideshow > div:nth-child(1)').text());
            displayInteractiveElements(requestedTab);
            editSlideContent(requestedTab);
        });
        
        // Slide navigation through keyboard events
        $(document).keyup(function(e) {
            if ((e.keyCode === KeyCode.KEY_LEFT) && ($('#slideshow div:nth-child(1)').text()) != 1) {
                requestedTab = $('#slideshow > div:nth-child(1)').text() - 2;
                displayInteractiveElements(requestedTab);
                editSlideContent(requestedTab);
            } else if ((e.keyCode === KeyCode.KEY_RIGHT) && ($('#slideshow div:nth-child(1)').text()) != 5) {
                requestedTab = Number($('#slideshow > div:nth-child(1)').text());
                displayInteractiveElements(requestedTab);
                editSlideContent(requestedTab);
            }
        });
    }
    
    // Slide editing
    function editSlideContent(requestedTab) {
        $('#slideshow div:nth-child(1)').text(manual[requestedTab].slide);
        $('#slideshow p:nth-child(2)').text(manual[requestedTab].title);
        $('#slideshow p:nth-child(3)').text(manual[requestedTab].text);
    }
    
    function displayInteractiveElements(requestedTab) {
        // Slideshow limits management
        switch (requestedTab) {
            case 0:
                $('#slideshow > button:first-of-type').css('display', 'none');
                $('#slideshow > span:first-of-type').css('display', 'none');
                $('.legende').css('display', 'none');
            break;

            case 1:
                $('#slideshow > button:first-of-type').css('display', 'block');
                $('#slideshow > span:first-of-type').css('display', 'block');
                $('.legende').css('display', 'flex');
            break;

            case 2:
                $('.legende').css('display', 'none');
                break;
                
            case 3:
                $('#slideshow > span:last-of-type').css('display', 'block')
                $('#slideshow > button:last-of-type').css('display', 'block');
            break;
                
            case 4:
                $('#slideshow > span:last-of-type').css('display', 'none');
                $('#slideshow > button:last-of-type').css('display', 'none');
            break;
        };
    }
        
    // Slideshow content
    const manual = [
        {
            title: "Bienvenue sur Ve'lyon",
            text: "Réservez dès à présent votre vélo'v à Lyon en quelques étapes.",
            slide: 1,
            previousSlide: 5,
            nextSlide: 2
        },
        {
            title: "Choix de la station",
            text: "Sélectionnez une station ouverte sur la carte :",
            slide: 2,
            previousSlide: 1,
            nextSlide: 3
        },
        {
            title: "Réservation du velo'v",
            text: "Cliquez sur 'Je réserve mon vélo'v', puis signez dans l'encart prévu à cet effet.",
            slide: 3,
            previousSlide: 2,
            nextSlide: 4
        },
        {
            title: "Récupération de votre velo'v",
            text: "Un décompte de 20 minutes s'affiche pour vous indiquer le temps restant sur votre réservation",
            slide: 4,
            previousSlide: 3,
            nextSlide: 5
        },
        {
            title: "Annulation d'une réservation",
            text: "Vous pouvez à tout moment annuler votre réservation grâce au bouton 'Annulez ma réservation' sous le décompte, ou en réservant un vélo'v à une autre station.",
            slide: 5,
            previousSlide: 4,
            nextSlide: 1
        }
    ];
    
    // Load the first slide
    displaySlide(1);
}