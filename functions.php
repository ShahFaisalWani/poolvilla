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
