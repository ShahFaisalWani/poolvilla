<?php

/*
 * enqueue child css
 *
 */
add_action( 'wp_enqueue_scripts', function() {
	wp_enqueue_style( 'search-react-style', get_stylesheet_directory_uri() . "/build/main-brikk.css", [], date("h:i:s"), false);
	wp_enqueue_style( 'brk-child-style', get_template_directory_uri() . '/style.css', ['brk-style'] );
});

add_action('init', function(){
	add_rewrite_rule( 'house/([a-zA-Z0-9-]+)/?$','index.php?house=$matches[1]', 'top' );
});

add_filter( 'query_vars', function( $query_vars ) {
	$query_vars[] = 'house';
	return $query_vars;
} );

add_action( 'template_include', function( $template ) {

	if ( get_query_var( 'house' ) == false || get_query_var( 'house' ) == '' ) {
			return $template;
	}

	return get_stylesheet_directory() . '/house_page.php';
} );

wp_enqueue_script( 'react-search', get_stylesheet_directory_uri() . "/build/main-brikk.js", [], true);

function custom_title( $title ) {
	$url = $_SERVER['REQUEST_URI'];

	// Check if the URL matches the pattern /house/*
	if (strpos($url, '/house/') !== false) {
			$parts = explode('/', $url);
			$city_code = '';

			foreach ($parts as $part) {
					if (strpos($part, 'CITY-') !== false) {
							$city_code = $part;
							break;
					}
			}

			$title1 = $title;
			if (!empty($city_code)) { 
					$api_url = 'https://api.poolvillacity.co.th/next-villapaza/api/customer/house/info/' . strtoupper($city_code);
					$response = wp_remote_get($api_url);
					if (!is_wp_error($response)) {
							$data = json_decode(wp_remote_retrieve_body($response), true);
							$data = $data["result"];
							$house =  $data["house"];
							$name =  $house["name"];
							
							$title1 = "{$house['name']} {$house['location']['name']} {$house['code']} | {$house['number_of_bedrooms']} ห้องนอน Casa Poolvilla";    
					}
			}

			return $title1;
	}

	return $title;
}

function custom_desc( $description ) {
	$url = $_SERVER['REQUEST_URI'];

	if (strpos($url, '/house/') !== false) {
			return false; 
	}

	return $description;
}

add_filter('rank_math/frontend/title', 'custom_title');
add_filter('rank_math/frontend/description', 'custom_desc');
add_filter('rank_math/opengraph/facebook/og_description', 'custom_desc');
add_filter('rank_math/opengraph/twitter/twitter_description', 'custom_desc');