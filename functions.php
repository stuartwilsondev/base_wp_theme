<?php

/**
 * wp_enqueue_style( $handle, $src, $deps, $ver, $media )
 * @see https://codex.wordpress.org/Function_Reference/wp_enqueue_style#Parameters
 */
function ee_base_theme_styles()
{
    $cssFolder = get_template_directory_uri().'assets/css';

    //Include other css files here
    wp_enqueue_style('bootstrap_css', $cssFolder.'/bootstrap.min.css');
    wp_enqueue_style('fontawesome_css', $cssFolder.'/font-awesome.min.css');
    wp_enqueue_style('ee_main_css', $cssFolder.'/main.min.css');
    wp_enqueue_style('google_fonts_css', '//fonts.googleapis.com/css?family=Open+Sans:400,300,600,700');
    //wp_enqueue_style('style_css', get_template_directory_uri().'style.css');

}
//wp hook
add_action('wp_enqueue_scripts', 'ee_base_theme_styles');

// add ie conditional html5 shim to header
function ee_base_add_ie_html5_shim () {
    echo '<!--[if lt IE 9]>';
    echo '<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>';
    echo '<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.j"></script>';
    echo '<![endif]-->';
}
add_action('wp_head', 'ee_base_add_ie_html5_shim');

/**
 * wp_enqueue_script( $handle, $src, $deps, $ver, $in_footer );
 * @see https://codex.wordpress.org/Function_Reference/wp_enqueue_scripts#Parameters
 */
function ee_base_theme_js()
{
    $jsFolder = get_template_directory_uri().'/js';
    //Jquery is loaded in Wordpress by default and is loaded differently so ne need to include it here

    //footer
    wp_enqueue_script('bootstrap_js', $jsFolder.'/bootstrap.min.js', array('jquery'), '', true);
    wp_enqueue_script('ee_main_js', $jsFolder.'/main.min.js', array('jquery'), '', true);

}
//wp hook
add_action('wp_enqueue_scripts', 'ee_base_theme_js');