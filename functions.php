<?php
/**
 * astra-child Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package astra-child
 * @since 1.0.0
 */

/**
 * Define Constants
 */
define( 'CHILD_THEME_ASTRA_CHILD_VERSION', '1.0.0' );

/**
 * Enqueue styles
 */
function child_enqueue_styles() {
	wp_enqueue_style( 'search-react-style', get_stylesheet_directory_uri() . "/build/main-astra.css", array(), date('H:i:s'));
	wp_enqueue_style( 'astra-child-theme-css', get_stylesheet_directory_uri() . '/style.css', array('astra-theme-css'), CHILD_THEME_ASTRA_CHILD_VERSION, 'all' );
	
}

add_action( 'wp_enqueue_scripts', 'child_enqueue_styles', 15 );

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

wp_enqueue_script( 'react-search', get_stylesheet_directory_uri() . '/build/main.js', array(), date('H:i:s') );
