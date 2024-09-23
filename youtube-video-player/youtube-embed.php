<?php

/**
 * Plugin Name: YouTube Embed WpDevArt
 * Plugin URI: https://wpdevart.com/wordpress-youtube-embed-plugin
 * Description: YouTube Embed plugin is a convenient tool for adding videos to your website. Use the YouTube Embed plugin to add YouTube videos in posts/pages, widgets.
 * Version: 2.6.5
 * Author: wpdevart
 * Author URI:    https://wpdevart.com
 * License URI: GPLv3 http://www.gnu.org/licenses/gpl-3.0.html
 */


class youtube_embed {
	// required variables for YouTube Embed plugin

	private $plugin_url;

	private $plugin_path;

	public $options;

	/*############ Construct Function ##################*/

	function __construct() {
		//
		define("wpdevart_youtube_support_url", "https://wordpress.org/support/plugin/youtube-video-player");

		$this->plugin_url  = trailingslashit(plugins_url('', __FILE__));
		$this->plugin_path = trailingslashit(plugin_dir_path(__FILE__));
		$this->call_base_filters();
		$this->create_admin_menu();
		$this->front_end();
	}

	/*############ Create admin menu Function ##################*/

	private function create_admin_menu() {

		require_once($this->plugin_path . 'admin/admin_menu.php');

		$admin_menu = new youtube_admin_menu(array('plugin_url' => $this->plugin_url, 'plugin_path' => $this->plugin_path));

		add_action('admin_menu', array($admin_menu, 'create_menu'));
	}

	/*############ Front-end Function ##################*/

	public function front_end() {

		require_once($this->plugin_path . 'front_end/front_end.php');
		$youtube_embed_front_end = new youtube_embed_front_end(array('menu_name' => 'Youtube', 'plugin_url' => $this->plugin_url, 'plugin_path' => $this->plugin_path));

		require_once($this->plugin_path . 'front_end/front_end_widget.php');
		add_action('widgets_init', array($this, "youtube_widget"));
	}

	/*############ Widget Function ##################*/

	public function youtube_widget() {
		return register_widget("youtube_embed_widget");
	}
	/*############ Register required scripts Function ##################*/

	public function register_required_scripts() {
		wp_register_script('youtube_front_end_api_js', $this->plugin_url . 'front_end/scripts/youtube_embed_front_end.js', array('jquery'));
		wp_register_script('youtube_api_js', "https://www.youtube.com/iframe_api", array('youtube_front_end_api_js'));
		wp_register_style('admin_style_youtube_embed', $this->plugin_url . 'admin/styles/admin_themplate.css');
		wp_register_style('front_end_youtube_style', $this->plugin_url . 'front_end/styles/baze_styles_youtube.css');
		wp_register_style('jquery-ui-style', $this->plugin_url . 'admin/styles/jquery-ui.css');
		wp_register_script('wpda_youtube_gutenberg_js', $this->plugin_url . 'admin/gutenberg/block.js', array('wp-element', 'wp-blocks', 'wp-i18n',  'wp-editor', 'underscore'));
		wp_register_style('wpda_youtube_gutenberg_css', $this->plugin_url . 'admin/gutenberg/style.css');
	}

	/*############ Enqueue Requeried Scripts Function ##################*/

	public function enqueue_required_scripts() {
		wp_enqueue_style("jquery-ui-style");
		wp_enqueue_script("jquery-ui-slider");
	}

	/*############ Base Filters Function ##################*/

	public function call_base_filters() {
		add_action('init',  array($this, 'register_required_scripts'));
		add_action('admin_head',  array($this, 'enqueue_required_scripts'));
		//for_upgrade
		add_filter('plugin_action_links_' . plugin_basename(__FILE__), array($this, 'plugin_activate_sublink'));
	}

	/*############ Activate Sublink Function ##################*/

	public function plugin_activate_sublink($links) {
		$plugin_submenu_added_link = array();
		$added_link = array(
			'<a target="_blank" style="color: #7052fb; font-weight: bold; font-size: 13px;" href="http://wpdevart.com/wordpress-youtube-embed-plugin">Upgrade to Pro</a>',
		);
		$plugin_submenu_added_link = array_merge($plugin_submenu_added_link, $added_link);
		$plugin_submenu_added_link = array_merge($plugin_submenu_added_link, $links);
		return $plugin_submenu_added_link;
	}
}
$youtube_embed = new youtube_embed();