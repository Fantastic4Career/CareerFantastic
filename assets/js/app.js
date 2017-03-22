    function rotateCard(button){
        var $card = $(button).closest('.card-container');
        console.log($card);
        if($card.hasClass('hover')){
            $card.removeClass('hover');
        } else {
            $card.addClass('hover');
        }
    }

    $(document).on('click', '.btn', function(){
    	console.log(this);
    	rotateCard(this);
     });