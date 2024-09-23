<?php
class youtube_embed_front_end {
	private $menu_name;
	private $plugin_url;
	private $plugin_path;
	private $params;
	public static $statatic_id_number;

	/*############ Construct function ##################*/

	function __construct($params) {
		self::$statatic_id_number = 1;
		if (isset($params['plugin_url']))
			$this->plugin_url = $params['plugin_url'];
		else
			$this->plugin_url = trailingslashit(dirname(plugins_url('', __FILE__)));
		// Set the plugin path
		if (isset($params['plugin_path']))
			$this->plugin_path = $params['plugin_path'];
		else
			$this->plugin_path = trailingslashit(dirname(plugin_dir_path(__FILE__)));

		add_filter('wp_head', array($this, 'script_and_styles'), 1);
		add_shortcode('wpdevart_youtube', array($this, 'shortcode'));
	}

	/*############  Function for the shortcode ################*/

	public function shortcode($atts, $content) {
		if (!$content) {
			return '<span style="color:red; font-size:16px">Set Vidio id</span>';
		}
		$voloutput = '';


		$initial_values = array(
			"youtube_embed_width"  				=> "640",
			"youtube_embed_height"  			=> "360",
			"youtube_embed_align"  				=> "left",
			"youtube_embed_caption"  			=> "",
			"youtube_embed_autoplay"  			=> "0",
			"youtube_embed_theme"  				=> "dark",
			"youtube_embed_loop_video"  		=> "0",
			"youtube_embed_enable_fullscreen"  	=> "1",
			"youtube_embed_show_title"  		=> "1",
			"youtube_embed_show_youtube_icon"  	=> "1",
			"youtube_embed_show_annotations"  	=> "0",
			"youtube_embed_show_progress_bar_color" => "red",
			"youtube_embed_autohide_parameters"  	=> "1",
			"youtube_embed_set_initial_volume" => "",
			"youtube_embed_initial_volume" 		=> "90",
			"youtube_embed_disable_keyboard"  	=> "0"
		);
		if (!is_array($atts)) {
			$atts = array();
		}
		foreach ($initial_values as $key => $value) {
			if (!(get_option($key, 12365498798465132148947984651) == 12365498798465132148947984651)) {
				$coming_key = str_replace('youtube_embed_', '', $key);
				if (!isset($atts[$coming_key]) || $atts[$coming_key] == "")
					$atts[$coming_key] = get_option($key);
			} else {
				$coming_key = str_replace('youtube_embed_', '', $key);
				$$key = $value;
				if (!isset($atts[$coming_key])  || $atts[$coming_key] == "")
					$atts[$coming_key] = $value;
			}
		}

		$allowfullScreen = '';
		$voloutput = '';
		if ($atts['set_initial_volume'] == 'true' || $atts['set_initial_volume'] == '1')
			$voloutput = ' data-volume="' . intval($atts['initial_volume']) . '" ';
		if ($atts['enable_fullscreen'] == '1')
			$allowfullScreen = ' allowFullScreen="true"';
		$parametrs = array(
			'autoplay' => intval($atts['autoplay']),
			'theme' => 'dark',
			'loop' => intval($atts['loop_video']),
			'fs' => intval($atts['enable_fullscreen']),
			'showinfo' => intval($atts['show_title']),
			'modestbranding' => $atts['show_youtube_icon'] ? '0' : '1',
			'iv_load_policy' => $atts['show_annotations'] ? '1' : '3',
			'color' => ($atts['show_progress_bar_color']=='white')?'white':'red',
			'autohide' => intval($atts['autohide_parameters']),
			'disablekb' => intval($atts['disable_keyboard']),
			'enablejsapi' => '1',
			'version' => '3',
		);
		$link_youtube = 'https://www.youtube.com/embed/' . $content;
		$link_youtube = add_query_arg($parametrs, $link_youtube);
		$code = '<div style="text-algn:' . $this->correct_align($atts['align']) . '"><span style="display:inline-block;text-align:center;"><iframe allow="autoplay" class="youtube_embed_iframe"   ' . $voloutput . $allowfullScreen . ' style="width:' . intval($atts['width']) . 'px; height:' . intval($atts['height']) . 'px" src="' . $link_youtube . '"></iframe></span></div>';
		return $code;
	}

	/*#################### Script and Styles functions ########################*/

	public function script_and_styles() {
		add_thickbox();
		wp_enqueue_script('jquery');
		wp_enqueue_script('youtube_front_end_api_js');
		wp_enqueue_script('youtube_api_js');
		wp_enqueue_style('front_end_youtube_style');
	}

	/*#################### Functions for correcting the alignment ########################*/
	
	private function correct_align($align){
		if($align == 'left' || $align == 'center' ||$align == 'right'){
			return $align;
		}
		return 'left';
	}

}
