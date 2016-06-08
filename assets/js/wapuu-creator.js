var wapuu_creator = wapuu_creator || {};

(function($){
    'use strict';

    wapuu_creator.app = ( function( creator ) {

        fabric.Canvas.prototype.getItemByName = function( name ) {
            var object = null,
                objects = this.getObjects();

            for (var i = 0, len = this.size(); i < len; i++) {
                if (objects[i].name && objects[i].name === name) {
                    object = objects[i];
                    break;
                }
            }

            return object;
        };


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

                $('body').on('click', '.asset-library img', function(e){
                    e.preventDefault();

                    var dimensions = false;
                    if( creator.assets[$(this).data('assetkey')].images[$(this).data('imagekey')].image_dimensions ) {
                        dimensions = creator.assets[$(this).data('assetkey')].images[$(this).data('imagekey')].image_dimensions;
                    }
                    var position = false;
                    if( creator.assets[$(this).data('assetkey')].images[$(this).data('imagekey')].image_position ) {
                        position = creator.assets[$(this).data('assetkey')].images[$(this).data('imagekey')].image_position;
                    }
                    creator.insertImage( $(this).attr('src'), $(this).data('type'), dimensions, position );
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
                oImg.name = 'base-wapuu',
                oImg.width = 500;
                oImg.height = 500;
                oImg.set( 'selectable', false );
                creator.canvas.add(oImg);
                oImg.center();
            });
        };

        /**
         * Load Assets into view
         * @param type
         * @param key
         */
        creator.load_assets = function( type, assets_key ) {
            if( !creator.assets || !creator.assets[assets_key] ) {
                return false;
            }

            var assets = creator.assets[assets_key];
            if( type !== assets.type ) {
                return false;
            }
            $('.asset-library').empty();

            $(assets.images).each(function(key, value){
                $('.asset-library').append('<img src="' + wapuuCreatorObj.plugin_url + '/wapuu-assets/' + assets.type + '/' + value.url + '" data-type="' + assets.type + '" data-assetkey="' + assets_key + '" data-imagekey="' + key + '" />');
            });
        };

        /**
         * Remove Image by type
         * @param image_type
         */
        creator.removeImage = function( image_type ) {
            if( creator.canvas.getItemByName( image_type ) ) {
                creator.canvas.getItemByName( image_type ).remove();
            }
        };

        /**
         * Insert Image onto Fabric.js Canvas
         * @param image_url
         * @param image_type
         * @param image_dimensions
         * @param image_position
         */

        creator.insertImage = function( image_url, image_type, image_dimensions, image_position ) {

            // First remove
            creator.removeImage( image_type );

            image_dimensions = image_dimensions || creator.getDefaultDimensions( image_type );
            image_position = image_position || creator.getDefaultPos( image_type );

            fabric.Image.fromURL( image_url, function(oImg) {
                oImg.name = image_type;
                oImg.width = image_dimensions.width;
                oImg.height = image_dimensions.height;
                oImg.set( 'selectable', false );
                oImg.top = image_position.top;
                creator.canvas.add(oImg);
                oImg.centerH();

                if( image_type == 'mustaches' ) {
                    oImg.setLeft( oImg.left - 60 );
                    var curAngle = oImg.getAngle();
                    oImg.setAngle(curAngle-10);
                    creator.canvas.renderAll();
                }
            });
        };

        creator.getDefaultPos = function( image_type ) {
            var position = {};
            switch( image_type ){
                case 'hats':
                    position = { top: 70 };
                    break;
                case 'mustaches':
                    position = { top: 200 };
                    break;
            }
            return position;
        };

        creator.getDefaultDimensions = function( image_type ) {
            var dimensions = {};
            switch( image_type ) {
                case 'hats':
                    dimensions = { width: 400, height: 110 };
                    break;
                case 'mustaches':
                    dimensions = { width: 300, height: 50 };
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