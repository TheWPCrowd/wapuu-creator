<?php

class wapuu_creator_shortcode {

	function wapuu_shortcode_init( $atts ) {
		$a = shortcode_atts( array(
			'name' => 'wapuu-creator'
		), $atts);
		return '<canvas class="wapuu-creator" id="' . $a['name'] . '"></canvas>';
	}
}