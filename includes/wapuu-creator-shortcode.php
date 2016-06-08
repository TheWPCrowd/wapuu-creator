<?php

class wapuu_creator_shortcode {

	function wapuu_shortcode_init( $atts ) {
		$a = shortcode_atts( array(
			'name' => 'wapuu-creator'
		), $atts);
		return '<div id="wapuu-creator-wrapper"><canvas class="wapuu-creator" id="' . $a['name'] . '"></canvas><div class="row"><div class="col-sm-4 asset-types"></div><div class="col-sm-8 asset-library"></div></div></div>';
	}
}