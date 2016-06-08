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

            /** TESTING ADDING A HAT **/
            creator.insertImage( wapuuCreatorObj.plugin_url + '/wapuu-assets/hats/gradcap.svg', 'hat', {width:400,height:110}, false );
        };

        creator.insertImage = function( image_url, image_type, image_dimensions, image_position ) {

            image_dimensions = image_dimensions || {};
            image_dimensions.width = image_dimensions.width || 400;
            image_dimensions.height = image_dimensions.height || 400;

            image_position = image_position || creator.getDefaultPos( image_type );

            fabric.Image.fromURL( image_url, function(oImg) {
                oImg.width = image_dimensions.width;
                oImg.height = image_dimensions.height;
                oImg.set( 'selectable', false );
                oImg.top = image_position.top;
                creator.canvas.add(oImg);
                oImg.centerH();
            });
        };

        creator.getDefaultPos = function( image_type ) {
            var dimensions = {};
            switch( image_type ){
                case 'hat':
                    dimensions = { top: 70 }
                    break;
            }
            return dimensions;
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