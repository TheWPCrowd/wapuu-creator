var wapuu_creator = wapuu_creator || {};

(function($){
    'use strict';

    wapuu_creator.app = ( function( creator ) {

        $(document).ready(function(){
            if( $('canvas.wapuu-creator').length > 0 ) {
                console.log('wapuu creator init');

                /** Event Handling **/
                $('body').on('click', '.asset-types a', function(e){
                    e.preventDefault();
                    var type = $(this).data('type'),
                        key = $(this).data('key');
                    creator.load_assets( type, key );
                });

                /** Create Fabricjs Canvas **/
                creator.canvas = new fabric.Canvas($('canvas.wapuu-creator').attr('id'));
                creator.canvas.setDimensions({
                    width: $('canvas.wapuu-creator').parents('.content').width(),
                    height: 750
                });

                /** Insert Base Wapuu **/
                creator.insertBaseWapuu();

                /** Get Assets **/
                $.get( wapuuCreatorObj.plugin_url + '/wapuu-assets/asset_db.json', function(res){
                    creator.assets = res.assets;
                    $(creator.assets).each(function(key, value){
                        $('.asset-types').append('<a href="#" data-type="' + value.type + '" data-key="' + key + '">' + value.type + '</a>');
                    });
                });

            }
        });

        /**
         * Insert Base Wapuu
         */
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

        /**
         * Load Assets into view
         * @param type
         * @param key
         */
        creator.load_assets = function( type, key ) {
            if( !creator.assets || !creator.assets[key] ) {
                return false;
            }

            var assets = creator.assets[key];
            if( type !== assets.type ) {
                return false;
            }
            $('.asset-library').empty();

            $(assets.images).each(function(key, value){
                $('.asset-library').append('<img src="' + wapuuCreatorObj.plugin_url + '/wapuu-assets/' + assets.type + '/' + value.url + '" data-type="' + assets.type + '" />');
            });
        };

        /**
         * Insert Image onto Fabric.js Canvas
         * @param image_url
         * @param image_type
         * @param image_dimensions
         * @param image_position
         */

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