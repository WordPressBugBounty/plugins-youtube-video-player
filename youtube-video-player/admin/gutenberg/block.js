( function( blocks, editor, i18n, element, components, _ ) {
	var el = element.createElement;
	var RichText = editor.RichText;
	var MediaUpload = editor.MediaUpload;
	var pro_feature_text="If you want to use this feature upgrade to YouTube Pro";
	
	var icon_iamge = el( 'img', {
      width: 24,
      height: 24,
      src: window['wpda_youtube_gutenberg']["other_data"]["icon_src"],
	  className: "wpda_youtube_gutenberg_icon"
    } );
	
	blocks.registerBlockType( 'wpdevart-youtube/youtube', {
		title: 'WpDevArt YouTube',
		icon: icon_iamge ,
		category: 'embed',
		keywords:['youtube','embed','video'],
		attributes: {			
			open_or_close: {
				type: 'boolean',
				value: true,
				default: true
			},
			version: {
				type: 'string',
				value: "",
				default: ""
			},
			youtube_embed_video:{
				type: 'string',
				value: "",
				default: "",
			},
			youtube_embed_playlist:{
				type: 'string',
				value: "",
				default: "",
			},
			youtube_embed_width:{
				type: 'string',
				value: "",
				default: "",
			},
			youtube_embed_height:{
				type: 'string',
				value: "",
				default: "",
			},
			youtube_embed_align:{
				type: 'string',
				value: "",
				default: "",
			},
			youtube_embed_caption:{
				type: 'string',
				value: "",
				default: "",
			},
			youtube_embed_autoplay:{
				type: 'string',
				value: "",
				default: "",
			},
			youtube_embed_theme:{
				type: 'string',
				value: "",
				default: "",
			},
			youtube_embed_loop_video:{
				type: 'string',
				value: "",
				default: "",
			},
			youtube_embed_enable_fullscreen:{
				type: 'string',
				value: "",
				default: "",
			},
			youtube_embed_show_related:{
				type: 'string',
				value: "",
				default: "",
			},
			youtube_embed_show_popup:{
				type: 'string',
				value: "",
				default: "",
			},
			youtube_embed_thumb_popup_width:{
				type: 'string',
				value: "",
				default: "",
			},
			youtube_embed_thumb_popup_height:{
				type: 'string',
				value: "",
				default: "",
			},
			youtube_embed_show_title:{
				type: 'string',
				value: "",
				default: "",
			},
			youtube_embed_show_youtube_icon:{
				type: 'string',
				value: "",
				default: "",
			},
			youtube_embed_show_annotations:{
				type: 'string',
				value: "",
				default: "",
			},
			youtube_embed_show_progress_bar_color:{
				type: 'string',
				value: "",
				default: "",
			},
			youtube_embed_autohide_parameters:{
				type: 'string',
				value: "",
				default: "",
			},			
			youtube_embed_set_initial_volume:{
				type: 'string',
				value: "",
				default: "",
			},
			youtube_embed_initial_volume:{
				type: 'string',
				value: "",
				default: "",
			},
			youtube_embed_disable_keyboard:{
				type: 'string',
				value: "",
				default: "",
			},
		},
		edit: function( props ) {
			Object.keys(wpda_youtube_gutenberg["default_parametrs"]).map(function(objectKey, index) {
				var value = wpda_youtube_gutenberg["default_parametrs"][objectKey];
				if(props.attributes[objectKey]===''){
					var initial_parametrs={};
					initial_parametrs[objectKey]=value;
					props.setAttributes(initial_parametrs)
				}
			});
			props.setAttributes({version:'1.0'})// begin is genereting save function;
			return el( 'span', { },create_open_hide_block()
					 
					 );			
			
			function create_open_hide_block(){
				var open_or_close_class="";
				if(props.attributes.open_or_close===false){
					open_or_close_class=" closed_params";
				}
				return el("div",{className:"wpdevart_youtube_main_collapsible_element"+open_or_close_class},create_head(),create_content())
			}
			
			function create_head(){
				return el("div",{className:"head_block",onClick:function(value){open_close_element(value)}},
						  el("span",{className:"title_image"},
									 el("img",{src:wpda_youtube_gutenberg['other_data']['content_icon']})
						  ),
						  el("span",{className:"wpdevar_youtube_head_title"},"WpDevArt YouTube"

						  ),
						  el("span",{className:"open_or_closed"},

						  ),
					   );
			}
			
			function create_content(){
				var wpda_youtube_fields=new Array();
				
				var aditional_css_for_volume={};
				var aditional_css_for_popup={};
				
				var font_familis={"Arial,Helvetica Neue,Helvetica,sans-serif":"Arial *","Arial Black,Arial Bold,Arial,sans-serif":"Arial Black *","Arial Narrow,Arial,Helvetica Neue,Helvetica,sans-serif":"Arial Narrow *","Courier,Verdana,sans-serif":"Courier *","Georgia,Times New Roman,Times,serif":"Georgia *","Times New Roman,Times,Georgia,serif":"Times New Roman *","Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Arial,sans-serif":"Trebuchet MS *","Verdana,sans-serif":"Verdana *","American Typewriter,Georgia,serif":"American Typewriter","Andale Mono,Consolas,Monaco,Courier,Courier New,Verdana,sans-serif":"Andale Mono","Baskerville,Times New Roman,Times,serif":"Baskerville","Bookman Old Style,Georgia,Times New Roman,Times,serif":"Bookman Old Style","Calibri,Helvetica Neue,Helvetica,Arial,Verdana,sans-serif":"Calibri","Cambria,Georgia,Times New Roman,Times,serif":"Cambria","Candara,Verdana,sans-serif":"Candara","Century Gothic,Apple Gothic,Verdana,sans-serif":"Century Gothic","Century Schoolbook,Georgia,Times New Roman,Times,serif":"Century Schoolbook","Consolas,Andale Mono,Monaco,Courier,Courier New,Verdana,sans-serif":"Consolas","Constantia,Georgia,Times New Roman,Times,serif":"Constantia","Corbel,Lucida Grande,Lucida Sans Unicode,Arial,sans-serif":"Corbel","Franklin Gothic Medium,Arial,sans-serif":"Franklin Gothic Medium","Garamond,Hoefler Text,Times New Roman,Times,serif":"Garamond","Gill Sans MT,Gill Sans,Calibri,Trebuchet MS,sans-serif":"Gill Sans MT","Helvetica Neue,Helvetica,Arial,sans-serif":"Helvetica Neue","Hoefler Text,Garamond,Times New Roman,Times,sans-serif":"Hoefler Text","Lucida Bright,Cambria,Georgia,Times New Roman,Times,serif":"Lucida Bright","Lucida Grande,Lucida Sans,Lucida Sans Unicode,sans-serif":"Lucida Grande","monospace":"monospace","Palatino Linotype,Palatino,Georgia,Times New Roman,Times,serif":"Palatino Linotype","Tahoma,Geneva,Verdana,sans-serif":"Tahoma","Rockwell, Arial Black, Arial Bold, Arial, sans-serif":"Rockwell"};
				var animation_efects={"none":"none","random":"random","bounce":"bounce","flash":"flash","pulse":"pulse","rubberBand":"rubberBand","shake":"shake","swing":"swing","tada":"tada","wobble":"wobble","bounceIn":"bounceIn","bounceInDown":"bounceInDown","bounceInLeft":"bounceInLeft","bounceInRight":"bounceInRight","bounceInUp":"bounceInUp","fadeIn":"fadeIn","fadeInDown":"fadeInDown","fadeInDownBig":"fadeInDownBig","fadeInLeft":"fadeInLeft","fadeInLeftBig":"fadeInLeftBig","fadeInRight":"fadeInRight","fadeInRightBig":"fadeInRightBig","fadeInUp":"fadeInUp","fadeInUpBig":"fadeInUpBig","flip":"flip","flipInX":"flipInX","flipInY":"flipInY","lightSpeedIn":"lightSpeedIn","rotateIn":"rotateIn","rotateInDownLeft":"rotateInDownLeft","rotateInDownRight":"rotateInDownRight","rotateInUpLeft":"rotateInUpLeft","rotateInUpRight":"rotateInUpRight","rollIn":"rollIn","zoomIn":"zoomIn","zoomInDown":"zoomInDown","zoomInLeft":"zoomInLeft","zoomInRight":"zoomInRight","zoomInUp":"zoomInUp"};
				
				if(props.attributes.youtube_embed_show_popup=="0"){
					aditional_css_for_popup["display"]="none";
				}
				if(props.attributes.youtube_embed_set_initial_volume=="0"){
					aditional_css_for_volume["display"]="none";
				}
				
				wpda_youtube_fields.push(wpda_youtube_lb_simple_input("youtube_embed_video","Video Id:","Set YouTube video id."));
				wpda_youtube_fields.push(wpda_youtube_lb_simple_input("youtube_embed_playlist","Playlist Id:","Set YouTube playlist Id.",true));
				wpda_youtube_fields.push(wpda_youtube_lb_simple_input_with_small("youtube_embed_width","Width:","Set YouTube Player Width.",true,"(px)"));
				wpda_youtube_fields.push(wpda_youtube_lb_simple_input_with_small("youtube_embed_height","Height:","Set YouTube Player Height",true,"(px)"));
				wpda_youtube_fields.push(wpda_youtube_lb_simple_select("youtube_embed_align",{"left":"Left","center":"Center","right":"Right"},"Position:","Select the YouTube position",false));
				wpda_youtube_fields.push(wpda_youtube_lb_simple_input("youtube_embed_caption","Caption:","Set YouTube Caption:",false));
				wpda_youtube_fields.push(wpda_youtube_lb_simple_select("youtube_embed_autoplay",{"1":"Yes","0":"No"},"Autoplay:","Set this option if you want automatically start playing videos",true));
				wpda_youtube_fields.push(wpda_youtube_lb_simple_select("youtube_embed_theme",{"light":"Light","dark":"Dark"},"Player Theme:","Choose YouTube Player Theme",true));
				wpda_youtube_fields.push(wpda_youtube_lb_simple_select("youtube_embed_loop_video",{"1":"Yes","0":"No"},"Loop video:","Set this option for repeating YouTube videos",true));
				wpda_youtube_fields.push(wpda_youtube_lb_simple_select("youtube_embed_enable_fullscreen",{"1":"Show","0":"Hide"},"Show fullscreen button:","Set this option if you want to display fullscreen button",true));
				wpda_youtube_fields.push(wpda_youtube_lb_simple_select("youtube_embed_show_related",{"1":"Show","0":"Hide"},"Show/Hide related vidoes:","Set this option if you want to display Related Videos after the YouTube video ends.",true));
				wpda_youtube_fields.push(wpda_youtube_lb_select_open_hide_params("youtube_embed_show_popup",{"1":"Yes","0":"No"},['',"thumbnails"],"Show video in popup:","Set this option if you want to display YouTube videos in popup",true));
				wpda_youtube_fields.push(wpda_youtube_lb_simple_input_with_small("youtube_embed_width","Thumbnail width:","Set the YouTube video thumbnail width for opening videos in popup ",true,"(px)",aditional_css_for_popup,"wpda_youtube_thumbnails"));
				wpda_youtube_fields.push(wpda_youtube_lb_simple_input_with_small("youtube_embed_height","Thumbnail height:","Set the YouTube video thumbnail height for opening videos in popup ",true,"(px)",aditional_css_for_popup,"wpda_youtube_thumbnails"));
			
				wpda_youtube_fields.push(wpda_youtube_lb_simple_select("youtube_embed_show_youtube_icon",{"1":"Yes","0":"No"},"Show Youtube icon:","Set this option if you want to display Youtube icon",true));
				wpda_youtube_fields.push(wpda_youtube_lb_simple_select("youtube_embed_show_annotations",{"1":"Yes","0":"No"},"Show animations:","Set this option if you want to display animations in YouTube videos",true));
				wpda_youtube_fields.push(wpda_youtube_lb_simple_select("youtube_embed_show_progress_bar_color",{"red":"Red","white":"White"},"Progress bar color:","Choose YouTube player Progress bar color",true));
				wpda_youtube_fields.push(wpda_youtube_lb_simple_select("youtube_embed_autohide_parameters",{"1":"Yes","0":"No"},"Autohide Parameters:","Set this option if you want to Autohide Parameters",true));
				wpda_youtube_fields.push(wpda_youtube_lb_select_open_hide_params("youtube_embed_set_initial_volume",{"1":"Custom","0":"initial"},['',"volume"],"Volume","Select video volume",true));
				wpda_youtube_fields.push(wpda_youtube_lb_simple_input_with_small("youtube_embed_initial_volume","Custom Volume:","Set Custom Volume for YouTube videos",true,"(0-100)%",aditional_css_for_volume,"wpda_youtube_volume"));
				wpda_youtube_fields.push(wpda_youtube_lb_simple_select("youtube_embed_disable_keyboard",{"1":"Disable","0":"Enable"},"Disable keyboard:","Set this option if you want to Enable/Disable keyboard for YouTube videos",true));
				var table=el("tabel",{className:"wpdevart_youtube_content_block"},wpda_youtube_fields)
				return el("div",{className:"wpdevart_youtube_content_block"},table)
			}
			
			function open_close_element(colapsible_element){
				var target=colapsible_element.target;
				var head_element;
				if(target.parentNode.classList[0]=="wpdevart_youtube_main_collapsible_element"){
				   head_element=target.parentNode;
				}
				if(target.parentNode.parentNode.classList[0]=="wpdevart_youtube_main_collapsible_element"){
				   head_element=target.parentNode.parentNode;
				}
				if(target.parentNode.parentNode.parentNode.classList[0]=="wpdevart_youtube_main_collapsible_element"){
				   head_element=target.parentNode.parentNode.parentNode;
				}
				if(target.parentNode.parentNode.parentNode.parentNode.classList[0]=="wpdevart_youtube_main_collapsible_element"){
				   head_element=target.parentNode.parentNode.parentNode.parentNode;
				}
				if(typeof(head_element.classList[1])=="undefined"){
					props.setAttributes( { open_or_close:false } );
					head_element.classList.add("closed_params");
				}else{
					props.setAttributes( { open_or_close:true } );
					head_element.classList.remove("closed_params");
				}
			}
			
			function wpda_youtube_lb_simple_input(element_name,element_title,element_description,pro_feature=false,aditional_css={},aditional_classes=""){
				return el('tr',{className:"wpda_simple_input_tr "+"wpda_youtube_"+element_name+" "+aditional_classes,style:aditional_css},
						  wpda_youtube_title_and_description(element_title,element_description,pro_feature),
						  el('td',{className:"wpda_simple_input_td"},
							el('input',{type:"text",Value:props.attributes[element_name],onMouseDown:function(){if(pro_feature){alert(pro_feature_text); return false;}},className:'wpda_simple_input',onChange: function( value ) {var select=value.target; var params={}; params[element_name]=select.value;  if(!pro_feature){props.setAttributes(params)}}})
						  )
						
						);			 	
					 	 
			}
			
			function wpda_youtube_lb_simple_input_with_small(element_name,element_title,element_description,pro_feature=false,small_text,aditional_css={},aditional_classes=""){
				return el('tr',{adgsdfghs:"dfghdfhjsghsfdg",className:"wpda_simple_input_tr "+"wpda_youtube_"+element_name+" "+aditional_classes,style:aditional_css},
						  wpda_youtube_title_and_description(element_title,element_description,pro_feature),
						  el('td',{className:"wpda_simple_input_td"},
							el('input',{type:"text",Value:props.attributes[element_name],onMouseDown:function(){if(pro_feature){alert(pro_feature_text); return false;}},className:'wpda_simple_input',onChange: function( value ) {var select=value.target; var params={}; params[element_name]=select.value;  if(!pro_feature){props.setAttributes(params)}}}),
							el('small',{className:'wpda_youtube_small_text'},small_text)
						  )
						
						);			 	
					 	 
			}
			
			function wpda_youtube_lb_simple_textarea(element_name,element_title,element_description,pro_feature=false,aditional_css={},aditional_classes=""){
				return el('tr',{className:"wpda_simple_input_tr "+"wpda_youtube_"+element_name+" "+aditional_classes,style:aditional_css},
						  wpda_youtube_title_and_description(element_title,element_description,pro_feature),
						  el('td',{className:"wpda_simple_input_td"},
							el('textarea',{type:"text",className:'wpda_simple_input',onMouseDown:function(){if(pro_feature){alert(pro_feature_text); return false;}},onChange: function( value ) {var select=value.target; var params={}; params[element_name]=select.value; if(!pro_feature){props.setAttributes(params)}}},props.attributes[element_name])
						  )
						
						);			 	
					 	 
			}
			
			function wpda_youtube_lb_simple_select(element_name,options_list,element_title,element_description,pro_feature=false,aditional_css={},aditional_classes=""){
				var created_options=new Array();
				for(var key in options_list) {
					selected_option=false;
					if(props.attributes[element_name]==key){
						selected_option=true;
					}
					created_options.push(el('option',{value:''+key+'',selected:selected_option},options_list[key]))
				}
				return el('tr',{className:"wpda_simple_input_tr "+"wpda_youtube_"+element_name+" "+aditional_classes, style:aditional_css},
						  wpda_youtube_title_and_description(element_title,element_description,pro_feature),
						  el('td',{className:"wpda_simple_input_td"},
							el( 'select', { className: "wpda_youtube_select",onMouseDown:function(){if(pro_feature){alert(pro_feature_text); return false;}},onChange: function( value ) {var select=value.target; var params={};  params[element_name]=select.options[select.selectedIndex].value;  if(!pro_feature){props.setAttributes( params)}}},created_options),
						  )						
						);			 	
					 	 
			}
			
			function wpda_youtube_lb_select_open_hide_params(element_name,options_list,open_closed_ids,element_title,element_description,pro_feature=false,aditional_css={},aditional_classes=""){
				var created_options=new Array();
				
				for(var key in options_list) {
					selected_option=false;
					if(props.attributes[element_name]==key){
						selected_option=true;
					}
					created_options.push(el('option',{value:''+key+'',selected:selected_option},options_list[key]))
				}
				return el('tr',{className:"wpda_simple_input_tr "+"wpda_youtube_"+element_name},
						  wpda_youtube_title_and_description(element_title,element_description,pro_feature),
						  el('td',{className:"wpda_simple_input_td"},
							el( 'select', { className: "wpda_youtube_select",onMouseDown:function(){if(pro_feature){alert(pro_feature_text); return false;}},onChange: function( value ) {
									var select=value.target;
									var curent_element_parent_div=select.parentNode.parentNode.parentNode;
									var params={};
									params[element_name]=select.options[select.selectedIndex].value;
								
									for(var i=0;i<open_closed_ids.length;i++){
										for(var j=0;j<curent_element_parent_div.getElementsByClassName("wpda_youtube_"+open_closed_ids[i]).length;j++){
											curent_element_parent_div.getElementsByClassName("wpda_youtube_"+open_closed_ids[i])[j].style.display="none";
										}
										
									}
									for(i=0;i<curent_element_parent_div.getElementsByClassName("wpda_youtube_"+open_closed_ids[select.selectedIndex]).length;i++){
										curent_element_parent_div.getElementsByClassName("wpda_youtube_"+open_closed_ids[select.selectedIndex])[i].style.display="initial";
									}									
									if(!pro_feature){props.setAttributes( params )};
								}
							},created_options),
						  )						
						);			 	
					 	 
			}
			
			function wpda_youtube_lb_calendar_input(element_name,element_title,element_description,pro_feature=false,aditional_css={},aditional_classes=""){
				if(props.attributes[element_name]===""){
					var date=currentdate.getFullYear()+"-"+(currentdate.getMonth()+1)+"-"+currentdate.getDate() + "T"+((currentdate.getHours() < 10)?"0":"") + currentdate.getHours() +":"+ ((currentdate.getMinutes() < 10)?"0":"") + currentdate.getMinutes() +":"+ ((currentdate.getSeconds() < 10)?"0":"") + currentdate.getSeconds();
					var params={};
					params[element_name]=date;  
					props.setAttributes(params);
				}
				return el('tr',{className:"wpda_simple_input_tr "+"wpda_youtube_"+element_name+" "+aditional_classes, style:aditional_css},
						  wpda_youtube_title_and_description(element_title,element_description,pro_feature),
						  el('td',{className:"wpda_simple_input_td"},
							el(components.DateTimePicker,{type:"input",currentDate:props.attributes[element_name], onChange: function( value ) { var params={}; params[element_name]=value;  if(!pro_feature){props.setAttributes(params)}}})
						  )
						
						);			 	
					 	 
			}
			
			function wpda_youtube_lb_color_input(element_name,element_title,element_description,pro_feature=false,aditional_css={},aditional_classes=""){
				return el('tr',{className:"wpda_simple_input_tr "+"wpda_youtube_"+element_name+" "+aditional_classes,style:aditional_css},
						  wpda_youtube_title_and_description(element_title,element_description,pro_feature),
						  el('td',{className:"wpda_color_input_td"},
							el('input',{type:"color",Value:props.attributes[element_name],onMouseDown:function(){if(pro_feature){alert(pro_feature_text); return false;}},className:'wpda_simple_input',onChange: function( value ) {var select=value.target; var params={}; params[element_name]=select.value;  if(!pro_feature){props.setAttributes(params)}}})
						  )
						
						);			 	
					 	 
			}
			
			function wpda_youtube_title_and_description(element_title,element_description,pro_feature=false){
				if(pro_feature){
					var pro_element=el("span",{className:"pro_feature"}," (pro)");
				}else{
					var pro_element="";
				}
				return el('td',{className:"wpda_title_description_td"},
						   el('span',{className:"wpda_youtube_element_title"},element_title

						   ),  
						   
						   pro_element,
						  
						   el('span',{className:"wpda_youtube_element_description",title:element_description},"?"
						   )							
					  )
			}			
		},
		
		save: function( props ) {	
			var shortcode_atributes="";		
			var initial_volume_seted="false";
			if(props.attributes.youtube_embed_set_initial_volume=="1"){
				initial_volume_seted='true';
			}
			shortcode_atributes = shortcode_atributes + ' playlist="' + props.attributes.youtube_embed_playlist + '"';
			shortcode_atributes = shortcode_atributes + ' width="' + props.attributes.youtube_embed_width + '"';
			shortcode_atributes = shortcode_atributes + ' height="' + props.attributes.youtube_embed_height + '"';
			if(props.attributes.version=='1.0'){
				shortcode_atributes = shortcode_atributes + ' align="' + props.attributes.youtube_embed_align + '"';
				shortcode_atributes = shortcode_atributes + ' caption="' + props.attributes.youtube_embed_caption + '"';
			}			
			shortcode_atributes = shortcode_atributes + ' autoplay="' + props.attributes.youtube_embed_autoplay + '"';
			shortcode_atributes = shortcode_atributes + ' theme="' + props.attributes.youtube_embed_theme + '"';
			shortcode_atributes = shortcode_atributes + ' loop_video="' + props.youtube_embed_loop_video + '"';
			shortcode_atributes = shortcode_atributes + ' enable_fullscreen="' + props.attributes.youtube_embed_enable_fullscreen + '"';
			shortcode_atributes = shortcode_atributes + ' show_related="' + props.attributes.youtube_embed_show_related + '"';
			shortcode_atributes = shortcode_atributes + ' show_popup="' + props.attributes.youtube_embed_show_popup + '"';
			shortcode_atributes = shortcode_atributes + ' thumb_popup_width="' + props.attributes.youtube_embed_thumb_popup_width + '"';
			shortcode_atributes = shortcode_atributes + ' thumb_popup_height="' + props.attributes.youtube_embed_thumb_popup_height + '"';
			shortcode_atributes = shortcode_atributes + ' show_title="' + props.attributes.youtube_embed_show_title + '"';
			shortcode_atributes = shortcode_atributes + ' show_youtube_icon="' + props.attributes.youtube_embed_show_youtube_icon + '"';
			shortcode_atributes = shortcode_atributes + ' show_annotations="' + props.attributes.youtube_embed_show_annotations + '"';			
			shortcode_atributes = shortcode_atributes + ' show_progress_bar_color="' + props.attributes.youtube_embed_show_progress_bar_color + '"';			
			shortcode_atributes = shortcode_atributes + ' autohide_parameters="' + props.attributes.youtube_embed_autohide_parameters + '"';
			shortcode_atributes = shortcode_atributes + ' set_initial_volume="' + initial_volume_seted + '"';
			shortcode_atributes = shortcode_atributes + ' initial_volume="' + props.attributes.youtube_embed_initial_volume + '"';
			shortcode_atributes = shortcode_atributes + ' disable_keyboard="' + props.attributes.youtube_embed_disable_keyboard + '"';			
			return "[wpdevart_youtube " + shortcode_atributes + "]"+props.attributes.youtube_embed_video+"[/wpdevart_youtube]";
		}

	} )
} )(
	window.wp.blocks,
	window.wp.editor,
	window.wp.i18n,
	window.wp.element,
	window.wp.components,
	window._,
);

