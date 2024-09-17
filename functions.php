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

function custom_rankmath_title( $title ) {
	$url = $_SERVER['REQUEST_URI'];

	// Check if the URL matches the pattern /house/*
	if (strpos($url, '/house/') !== false) {
		$parts = explode('/', $url);
		$city_code = '';

		// Extract city code from the URL
		foreach ($parts as $part) {
			if (strpos($part, 'CITY-') !== false) {
				$city_code = $part;
				break;
			}
		}

		// Default title if no city code is found
		$title1 = $title;

		if (!empty($city_code)) { 
			// Construct API URL
			$api_url = 'https://api.poolvillacity.co.th/next-villapaza/api/customer/house/info/' . strtoupper($city_code);
			
			// Fetch API data
			$response = wp_remote_get($api_url);

			// Check for errors in the API request
			if (is_wp_error($response)) {
				error_log('API Request Error: ' . $response->get_error_message());
				return $title1; // Return original title if API fails
			}

			// Decode API response
			$body = wp_remote_retrieve_body($response);
			$data = json_decode($body, true);

			// Validate the structure of the API response
			if (isset($data["result"]) && isset($data["result"]["house"])) {
				$house = $data["result"]["house"];
				$name = $house["name"];

				// Build the custom title
				$title1 = "{$house['name']} {$house['location']['name']} {$house['code']} | {$house['number_of_bedrooms']} ห้องนอน Casa Poolvilla";
			} else {
				// Log if the response structure is not as expected
				error_log('Invalid API Response Structure: ' . $body);
			}
		}

		return $title1;
	}

	// Return original title for non-house pages
	return $title;
}

function custom_rankmath_desc( $description ) {
	$url = $_SERVER['REQUEST_URI'];

	// Check if the URL matches the pattern /house/*
	if (strpos($url, '/house/') !== false) {
		// Return an empty string instead of false to remove the description
		return ''; 
	}

	// Return the original description for non-house pages
	return $description;
}

add_filter( 'rank_math/frontend/title', 'custom_rankmath_title' );
add_filter('rank_math/frontend/description', 'custom_rankmath_desc');
add_filter('rank_math/opengraph/facebook/og_description', 'custom_rankmath_desc');
add_filter('rank_math/opengraph/twitter/twitter_description', 'custom_rankmath_desc');