<?php
class wpda_youtube_gutenberg{	
	private $plugin_url;
	function __construct($plugin_url){
		$this->plugin_url=$plugin_url;
		$this->hooks_for_gutenberg();
	}
	
    /*############  Gutenberg hooks function ################*/	
	
	private function hooks_for_gutenberg(){
		add_action( 'init', array($this,'guthenberg_init') );
	}
	
    /*############  Initialization of Gutenberg ################*/		
	
	public function guthenberg_init(){
		if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
		}
		register_block_type( 'wpdevart-youtube/youtube', array(
			'style' => 'wpda_youtube_gutenberg_css',
			'editor_script' => 'wpda_youtube_gutenberg_js',
		) );
		wp_add_inline_script(
			'wpda_youtube_gutenberg_js',
			sprintf('var wpda_youtube_gutenberg = { default_parametrs: %s,other_data: %s};',json_encode($this->default_parametrs(),JSON_PRETTY_PRINT),json_encode($this->other_dates(),JSON_PRETTY_PRINT)),
			'before'
		);
	}

    /*############  Function for the other data ################*/	
	
	private function other_dates(){
		$array=array('icon_src'=>$this->plugin_url."admin/images/icon.svg","content_icon"=>$this->plugin_url."admin/images/icon-youtsube.png");
		return $array;
	}
	
    /*############  Default parameters function ################*/	
	
	private function default_parametrs(){
		$array=array();
		$initial_values= array( 
			"youtube_embed_width"  				=> "640",
			"youtube_embed_height"  				=> "385",
			"youtube_embed_align"  				=> "left",
			"youtube_embed_caption"  			=> "",
			"youtube_embed_autoplay"  			=> "0",
			"youtube_embed_theme"  				=> "dark",
			"youtube_embed_loop_video"  			=> "0",
			"youtube_embed_enable_fullscreen"  	=> "1",
			"youtube_embed_show_related"  		=> "1",	
			"youtube_embed_show_popup"  			=> "0",		
				"youtube_embed_thumb_popup_width"  	=> "213",
				"youtube_embed_thumb_popup_height"  	=> "128",
			"youtube_embed_show_youtube_icon"  	=> "1",
			"youtube_embed_show_annotations"  	=> "1",
			"youtube_embed_show_progress_bar_color" => "red",
			"youtube_embed_autohide_parameters"  	=> "1",
			"youtube_embed_set_initial_volume" => "",
				"youtube_embed_initial_volume" 		=> "100",
			"youtube_embed_disable_keyboard"  	=>"0"
		);
		foreach($initial_values as $key => $value){
			if(!(get_option($key,12365498798465132148947984651)==12365498798465132148947984651))
				$array[$key]=esc_html(get_option($key));
			else
				$array[$key]=$value;
		}
		return $array;
	}
	
}

