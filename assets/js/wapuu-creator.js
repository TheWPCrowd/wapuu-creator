var wapuu_creator = wapuu_creator || {};

(function($){
    'use strict';

    wapuu_creator.app = ( function( creator ) {

        $(document).ready(function(){
            if( $('canvas.wapuu-creator').length > 0 ) {
                console.log('wapuu creator init');
                creator.canvas = new fabric.Canvas($('canvas.wapuu-creator').attr('id'));
                creator.canvas.setDimensions({
                    width: $(window).width(),
                    height: 750
                });
                creator.insertBaseWapuu();
            }
        });

        creator.insertBaseWapuu = function() {
            fabric.Image.fromURL( wapuuCreatorObj.plugin_url + '/wapuu-assets/base-wapuu.svg', function(oImg) {
                oImg.width = 500;
                oImg.height = 500;
                oImg.set( 'selectable', false );
                creator.canvas.add(oImg);
                oImg.center();
            });
        };

        creator.downloadJPG = function() {
            var image = creator.canvas.toDataURL({
                format: 'jpeg',
                quality: 0.6
            });
            window.open(image);
        };

        return creator;
    }( wapuu_creator.app || {} ));

}(jQuery));