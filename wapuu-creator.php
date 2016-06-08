<?php
/*
Plugin Name: WAPUU Avatar Creator
Description: Create Your Own WAPUU!
Version:     1.0.0
Plugin URI:  https://thewpcrowd.com/wapuu-creator
Author:      The WP Crowd
Author URI:  https://www.thewpcrowd.com
Text Domain: wapuu-creator
Domain Path: /languages/
License:     GPL v3 or later
*/

define( 'WAPUU_CREATOR_DIR', plugin_dir_path( __FILE__ ) );
define( 'WAPUU_CREATOR_URL', plugin_dir_url( __FILE__ ) );
define( 'WAPUU_CREATOR_VERSION', '1.0.0' );
define( 'WAPUU_CREATOR_FILE', __FILE__ );

class wapuu_creator {

	function wapuu_creator_scripts() {
		wp_enqueue_script( 'wapuu-creator-js', WAPUU_CREATOR_URL . '/build/js/wapuu-creator.js', array( 'jquery' ), WAPUU_CREATOR_VERSION false );
	}

}

$wapuuCreator = new wapuu_creator();

add_action( 'wp_enqueue_scripts', array( $wapuuCreator, 'wapuu_creator_scripts' ) );


?>