/* h2v.js version 1.3.4
    last modified at Aug 08 2011
    (c)tyz@freefielder.jp 
    For detail , please visit http://freefielder.jp/tate/h2v/
    ** Don't remove this copyright message **
*/

var h2vconvert = {
	version : '1.3.4' ,
	target : new Object(),

	/* default value */
	defaultval : { 'auto' : true ,'chars' : 25 , 'fontsize' : '16px' , 'lineInterval' : 0.4  , 'rotate' : true ,'bar' : true , 'showcredit' : true } ,
	defaultFontFamily : "'ヒラギノ角ゴ Pro W3','Hiragino Kaku Gothic Pro','Hiragino Kaku Gothic Pro W3' ,'メイリオ' , 'Meiryo' , 'ＭＳ ゴシック','MS Gothic' ,'TakaoGothic' , 'Takaoゴシック' , monospace" , 

	/* global variables */
	lineInterval : 0,
	lineSpace : 0 ,
	mL : 0,
	mR : 0,
	defaultFS : 0 ,
	currentH : 0 ,

	tmpdiv : '' ,

	/* browser flags */
	isOpera : false ,
	isOld : false ,
	isIE :false ,
	isIE8 : false ,
	isWKold : false ,

	/* tags */
	blocks : new Array( 'DIV' ,'UL' , 'OL' , 'DL' , 'P' , 'BLOCKQUOTE' , 'H1' , 'H2' , 'H3' , 'H4' , 'H5' , 'H6' , 'CENTER' ) ,
	lists : new Array( 'LI' , 'DT' , 'DD' ) ,
	inlines : new Array( 'FONT' , 'STRONG' , 'BIG' , 'SMALL' , 'I' , 'B' , 'EM' , 'SUB' , 'SUP' , 'A' , 'RUBY' , 'RT' , 'RB') ,
	thrus : new Array( 'PRE' , 'IFRAME' , 'TABLE' , 'TEXTAREA' ) , 

	/* functions */
	init : function( params ){ 
		var ua = navigator.userAgent.toLowerCase();
		var version =  window.opera ? (opera.version().replace(/\d$/, "") - 0) 
                      : parseFloat((/(?:ie |fox\/|ome\/|ion\/)(\d+\.\d)/.
                                   exec( ua ) || [,0])[1]);
   
		if( /opera/.test( ua ) ) h2vconvert.isOpera = true;

		this.isOld = false;
		if( ( /opera/.test( ua ) && version < 10.5 ) ||
				( /firefox/.test( ua ) && version < 3.5 ) || 
				( ( !/chrome/.test( ua ) && /safari/.test( ua ) && !/mobile/.test(ua) ) && version < 3 ) ||
				( /msie/.test( ua ) && version < 8 )  ) this.isOld = true;
				
		if( /msie/.test(ua) ) h2vconvert.isOpera = true;
		if( /safari/.test(ua) && version < 5 ) h2vconvert.isWKold = true;
		
		if(document.addEventListener ){
			if( !/safari/.test(ua)){ 
				document.addEventListener("DOMContentLoaded", 
															function(){ h2vconvert.startConvert( params )} , 
																false);
			}else{
				window.addEventListener( 'load' , 
															function(){ h2vconvert.startConvert( params ) } ,
															false );
			}
		}else if(/msie/.test(ua)){
			try{
				document.documentElement.doScroll("left");
			}catch(error){
				setTimeout(function(){ h2vconvert.init( params )}, 0);
				return;
			}
			h2vconvert.startConvert( params );
		}else{ 
			window.onload = function(){ h2vconvert.startConvert( params ); };
		}
	},
	
	startConvert : function( params ){
		var ua = navigator.userAgent.toLowerCase();
		if( /mobile/.test(ua) && /safari/.test(ua) )document.body.style.webkitTextSizeAdjust = 'none';

		for( var id in params ){
			this.target[id] = new this.h2v( params , id );
		}

		for( var id in this.target ){
			var tgt = this.target[id];
			var dest = tyz.getById( id );
			if( tgt.auto && !tyz.getByClass( dest , 'h2v' ).length ){
				try{
					this.convert( id );
				}catch( err ){
					dest.style.fontSize = tgt.originalFontSize;
					dest.style.fontFamily = tgt.originalFontFamily;
					dest.innerHTML = tgt.original; 
					var rec = tyz.newEle( 'DIV' , { 'class' : 'h2v_bar' } , { 'width' : tgt.pagewidth } );
					rec.innerHTML = '<a href="http://freefielder.jp/tate/h2v/" target="_blank">縦書き変換</a>に失敗しました。'
					tyz.getById(id).insertBefore( rec ,tyz.getById(id).firstChild );
				}
				dest.style.visibility = 'visible';
			}else{ 
				dest.style.fontFamily = tgt.originalFontFamily;
				dest.style.fontSize = tgt.originalFontSize;
			}
		}
	} ,

	convert : function( id ){
		var tgt = this.target[id];
		var dest = tyz.getById( id );
		if( this.isOld ){
			if( tyz.getByClass( id , 'h2v_bar' ).length == 0 ){
				var cbar = tyz.newEle( 'DIV' , { 'class' : 'h2v_bar' } );
				cbar.innerHTML = '!! <a href="http://freefielder.jp/tate/h2v/" target="_blank">最新のブラウザでは、縦書きでも閲覧できます。</a>' ;
				dest.insertBefore(  cbar  , dest.firstChild);
			}
			return false;
		}
		dest.style.fontFamily = this.defaultFontFamily ;
		dest.style.fontSize = tgt.fontsize
		this.defaultFS =  tyz.PX( tgt.fontsize );
		this.lineInterval = this.defaultFS * tgt.lineInterval ;
		this.lineSpace =  this.lineInterval / 2 ;
		
		this.mL = 0;
		this.mR = 0;
		this.currentH = 0;
		
		dest.innerHTML = dest.innerHTML.replace( /[\n\r\t]/g , '' ) ;
		
		this.rotateProperties( dest ) ;

		dest.normalize();

		var node = this.extractNodeContents( dest );
		this.addVTags( node );
		dest.appendChild( node );

		dest.style.whiteSpace = 'nowrap';
		this.setHWStyle( id , 'h2v_alpha' );
		this.setHWStyle( id , 'h2v_sp' );
		dest.style.whiteSpace = 'normal';
		
		tgt.html = this.extractNodeContents( dest );

		var basenode = tgt.html;
		this.lineW = this.defaultFS ;
		var lineH = this.target[id].chars * this.defaultFS ;

		this.tmpdiv = this.createTmpdiv( id );
		var lines = this.separateLines( id , basenode , this.defaultFS , lineH );

		var tate_area = tyz.newEle( 'div' , { 'class' : 'h2v' } , { 'position' : 'absolute' , 'left' : '0px'}  );
		for( var l = 0 ; l < lines.length ; l++ ){
			tate_area.appendChild( lines[l] );
		}

		tgt.converted = tate_area.cloneNode( true );   // backup

		var pages = this.separatePages( id , tate_area );

		var tateDiv = tyz.newEle( 'DIV' , { 'class' : 'h2v' } , { 'fontSize' : tgt.fontsize });
		if( tgt.bar ){
			 var rec = tyz.newEle( 'DIV' , { 'class' : 'h2v_bar' });
			 rec.innerHTML = '<a href="#" onclick="h2vconvert.switcher( \'' + id + '\');">縦→横切替</span>'
			tateDiv.appendChild( rec );
		}
		
		for( var i = 0 ; i < pages.length ; i++ ){
			var height = lineH*1 + this.defaultFS*1 ;
			var pageDiv = tyz.newEle( 'DIV' , { 'class' : 'h2v_page' }, { 'clear' : 'both' , 'minHeight' : height+'px'} );
			var sep = tyz.newEle( 'DIV' , { 'class' : 'h2v_separator' } , { 'width' : tgt.pagewidth } ) ;
			pageDiv.appendChild( pages[i] );
			tateDiv.appendChild( pageDiv );
			tateDiv.appendChild( sep );
		}
		
		tateDiv.removeChild( tateDiv.lastChild );
		
		if( tgt.showcredit ){
			 var rec = tyz.newEle( 'DIV' , { 'class' : 'h2v_bar' } , { 'width' : tgt.pagewidth , 'marginTop' : '10px' } );
			 rec.innerHTML = '<a href="http://freefielder.jp/tate/h2v/" target="_blank">h2v.js ver'+ this.version +'</a>'
			tateDiv.appendChild( rec );
		}
		
		tgt.pages = tateDiv.cloneNode( true );  //backup
		
		dest.appendChild( tateDiv );
		dest.appendChild( tyz.newEle( 'DIV' , { 'class' : 'clearfix' } ) ) ;

		this.removeTmpdiv('h2v_tmp_div' );
	},

	setHWStyle : function( id , cname ){
		var ele = tyz.getByClass( id , cname );
		for( var i = 0 ; i < ele.length ; i++ ){
			if( this.isIE8 )tyz.setStyles( ele[i] , { 'filter' : 'progid:DXImageTransform.Microsoft.BasicImage(rotation=1)' , 'fontFamily' : "'ＭＳ ゴシック','MS Gothic' , monospace" } ) ;
			var width = ele[i].offsetWidth;
			var fs = tyz.getStyle( ele[i] ).fontSize;
			var mb = width - tyz.PX( fs );
			if( mb < 0 )mb = cname=='h2v_alpha' ? mb : width;
			tyz.setStyles( ele[i] , { 'width' : width+'px' , 'marginBottom' : mb+'px' } );
		}
	} ,

	separateLines : function( id , basenode , baseFont , maxHeight ){
		var lines = new Array();
		var df; 
		var tate_line; 
		while( df = this.seekNodes( id , basenode , baseFont , maxHeight ) ){
			if( ( this.isBlock( df ) || this.isList( df ) ) && tyz.PX( df.style.width )==0  ){
				lines[lines.length] = this.extractRange( basenode , df );
			}else{
				this.mL = this.mL*1 + this.lineSpace*1 ;
				this.mR = this.mR*1 + this.lineSpace*1 ;
				tate_line = tyz.newEle( 'DIV' , { 'class' : 'h2v_e' } ,
															 { 'marginLeft' : tyz.round( this.mL , 2 ) + 'px' , 'marginRight' : tyz.round( this.mR , 2 )+'px' });
				tate_line.appendChild(  this.extractRange( basenode, df ) );
				lines[lines.length] = tate_line;
			}
			this.mL = 0;
			this.mR = 0;
			this.lineW = this.defaultFS;
			this.currentH = 0;
		}

		this.mL = this.mL*1 + this.lineSpace*1 ;
		this.mR = this.mR*1 + this.lineSpace*1 ;
		tate_line = tyz.newEle( 'DIV' , { 'class' : 'h2v_e' } ,
															 { 'marginLeft' : tyz.round( this.mL , 2 ) + 'px' , 'marginRight' : tyz.round( this.mR , 2 )+'px' });

		if( basenode.hasChildNodes() ){
			tate_line.appendChild( this.extractNodeContents( basenode ) );
			lines[lines.length] = tate_line;
		}
		return lines;
	} ,
	
	seekNodes : function( id , node , baseFont , maxHeight){
		var cn; var cs ; var nodename; 
		var currentH;
		var tgt = this.target[id].html; 
		var div = this.tmpdiv;
		if( !this.isIE8 )node.normalize();
		for( var i = 0 ; i < node.childNodes.length ; i++ ){
			cn = node.childNodes[i];
			cs = cn.style;
			nodename = cn.nodeName;

			if( nodename == '#text' &&  !cn.nodeValue.match( /[!-;=-~]+\s?/g )){ 
				currentH = this.currentH;
				var nodeheight =  baseFont * cn.length;
				var extraheight = maxHeight - currentH ; 
				if( extraheight*1 <= 0 ){extraheight = 0;}
				if( tyz.ceil( extraheight , 2 ) <= tyz.floor( nodeheight , 2 ) ){ 
					var el = tyz.floor( extraheight / baseFont  , 0) ;
					if( el == 0 ){ 
						var retnode =  cn.previousSibling || cn.parentNode.previousSibling || cn.parentNode;
					}else if( el < cn.length ){
						var ns = cn.splitText( el );
						var retnode = cn;
					}else{
						var retnode = cn;
					}
					if( retnode.nextSibling ){
						var ns = retnode.nextSibling ;
						if( ns.nodeName == 'SPAN' && ( tyz.getAttr( ns , 'class' )=='h2v_kuto' ) )return ns;
					}
					return retnode;
				}
				this.currentH = this.currentH *1 + nodeheight*1 ;
				
			}else if( nodename ==  'SPAN' && ( tyz.getAttr( cn , 'class' )=='h2v_alpha' ||tyz.getAttr( cn , 'class' )=='h2v_sp' ) ){ 
				var nodeheight =  (tyz.PX( cs.marginBottom )*1 + baseFont*1 );
				var nodeheight =  tyz.PX( cs.width );
				
				currentH = this.currentH;

				var extraheight = maxHeight - currentH; 
				if( extraheight < tyz.PX( cs.width)*1 ){
					if(maxHeight < tyz.PX( cs.width)*1 ){
						return cn ;
					}else{ 
						if( cn.previousSibling ){
							return cn.previousSibling;
						}else{
							return cn.parentNode;
						}
					}
				}
				this.currentH = this.currentH *1 + nodeheight*1 ;

			}else if( this.isInline( cn ) || (nodename == 'SPAN' &&  !tyz.getAttr( cn , 'class' ).match( /h2v_/g )) ){
				var fs = tyz.PX( cs.fontSize );
				var xm =  ( tyz.PX( cs.marginTop )*1 + tyz.PX( cs.marginBottom )*1 + tyz.PX( cs.paddingTop )*1 + tyz.PX( cs.paddingBottom )*1 + tyz.PX( cs.borderTopWidth )*1 + tyz.PX( cs.borderBottomWidth )*1 ); 
				var mh = maxHeight - xm ;
				if( mh <= 0 ) mh = fs ;

				this.setLineMargin( fs );

				this.currentH = this.currentH*1 + xm*1;
				var df = this.seekNodes( id , cn , fs , mh ) ;
				if( df ) return df;
				
			}else if( this.isBlock( cn ) || this.isList( cn )  ){
				var fs = tyz.PX( cs.fontSize ) ;
				var xm =  ( tyz.PX( cs.marginTop )*1 + tyz.PX( cs.marginBottom )*1 + tyz.PX( cs.paddingTop )*1 + tyz.PX( cs.paddingBottom )*1 + tyz.PX( cs.borderTopWidth )*1 + tyz.PX( cs.borderBottomWidth )*1 ); 
				
				var ds = this.getDisplayedStyle( cn , { 'width' : '' , 'height' : '' , 'marginLeft' : '' , 'marginRight' : '' , 'paddingLeft' : '' , 'paddingRight' : '' , 'borderLeftWidth' : '' , 'borderRightWidth' : '' },false );
				var ow = tyz.PX( ds.width );
				var oh = tyz.PX( ds.height );
				if( ow != 0 && oh != 0 ){
					cn.style.height = ow+'px';
					maxHeight = ow;
					xm=0;
					cn.style.width = oh*1 < tyz.PX( this.target[id].pagewidth ) ? oh+'px' : 'auto' ;
				}else if( ow != 0 ){ 
					cn.style.height = ow+'px';
					maxHeight = ow;
					xm=0;
					cn.style.width = 'auto' ;
				}else if( oh != 0 ){
					cn.style.width = oh*1 < tyz.PX( this.target[id].pagewidth ) ? oh+'px' : 'auto' ;
					cn.style.height = 'auto';
				}
				var mh = maxHeight - xm ;
				if( mh <= 0 ) mh = fs;

				this.setLineMargin( fs );

				var lines = this.separateLines( id , cn , fs , mh );
				for( var u=0 ; u< lines.length ; u++ ){
					cn.appendChild( lines[u] );
				}
				if( nodename == 'LI' ){
					var mark = tyz.newEle('SPAN' , {'class' : 'h2v_mark'} );
					mark.appendChild( document.createTextNode( '・' ) ) ;
					cn.firstChild.insertBefore( mark , cn.firstChild.firstChild );
				}
				
				if( tyz.PX( cn.style.width ) != 0 ){
					var left = tyz.PX( cn.style.width ) - this.defaultFS + tyz.PX( ds.paddingLeft )*1 + tyz.PX( ds.paddingRight )*1 + tyz.PX( ds.borderLeftWidth )*1+ tyz.PX( ds.borderRightWidth )*1+tyz.PX( ds.marginLeft )*1 ;
					cn.style.position = 'relative';
					cn.style.left = left + 'px';
					this.mR = left + tyz.PX( ds.marginRight)*1-tyz.PX( ds.marginLeft )*1;
					this.mL = tyz.PX( ds.marginLeft )*1 + tyz.PX( ds.paddingLeft )*1;
				}
				
				return cn ;

			}else if( this.isThru( cn ) ){
				var ds = this.getDisplayedStyle( cn , {  'width' : '' , 'marginLeft' : '' , 'marginRight' : '' , 'paddingLeft' : '' , 'paddingRight' : '' , 'borderLeftWidth' : '' , 'borderRightWidth' : '' } , true ) ;
				this.tmpdiv.appendChild( cn.cloneNode( true ) );
				var sw = this.tmpdiv.lastChild.offsetWidth +'px';
				this.tmpdiv.removeChild( this.tmpdiv.lastChild );
				var left = tyz.PX( sw ) - this.defaultFS +tyz.PX( ds.paddingLeft )*1+tyz.PX( ds.paddingRight )*1+tyz.PX( ds.borderLeftWidth )*1+tyz.PX( ds.borderRightWidth )*1 ;
				cs.left = tyz.floor( left , 2 ) + 'px';
				this.mR = left + tyz.PX( ds.marginRight )*1;
				this.mL = tyz.PX( ds.marginLeft )*1 + tyz.PX( ds.paddingLeft )*1;
				cs.width = sw;
				return cn ;

			}else if( nodename== 'IMG' ){
				var ds = this.getDisplayedStyle( cn , { 'width' : '' , 'height' : '' , 'marginLeft' : '' , 'marginRight' : '' , 'paddingLeft' : '' , 'paddingRight' : '' , 'paddingTop' : '' , 'paddingBottom' : '' , 'borderLeftWidth' : '' , 'borderRightWidth' : '' },false );
				if( this.isIE8 ){
					this.tmpdiv.appendChild( cn.cloneNode( true ) );
					ds.width = this.tmpdiv.lastChild.offsetWidth +'px';
					ds.height = this.tmpdiv.lastChild.offsetHeight +'px';
					this.tmpdiv.removeChild( this.tmpdiv.lastChild );
				}
				var left = tyz.PX( ds.width ) - this.defaultFS + tyz.PX( ds.paddingLeft )*1 + tyz.PX( ds.paddingRight )*1 + tyz.PX( ds.borderLeftWidth )*1+ tyz.PX( ds.borderRightWidth )*1 ;	
				if( left != 0 ){
					left =( left*1 + tyz.PX( ds.width )*1) /2  ;
					this.mR = this.mR*1 > left*1 ? this.mR : tyz.floor( left , 2 );
				}
				this.currentH = this.currentH *1 +  tyz.PX( ds.height ) *1 + tyz.PX( ds.paddingTop )*1 + tyz.PX( ds.paddingBottom )*1;
				
			}else if( nodename == 'BR' || nodename=='HR'){
				return cn;

			}else{
				var df = this.seekNodes( id , cn , baseFont , maxHeight ) ;
				if( df ) return df;
			}
			
			if(cn.nextSibling ){
				var ns = cn.nextSibling; 
				if( this.isBlock( ns ) || this.isThru( ns ))return cn;
			}
		}
		return false;
	} ,
	
	setLineMargin : function( fs ){
		if( this.lineW*1 < fs*1 ) {
			var ml = ( fs - this.lineW )/2;
			if( this.mL*1 < ml*1 ) this.mL = ml;
			var mr = ( fs - this.lineW ) /2;
			if( this.mR*1 < mr*1 ) this.mR = mr;
		}
	} ,

	separatePages : function( id , node ){
		this.tmpdiv.appendChild( node );
		node.style.positon = 'absolute' ;
		var page = new Array();
		while(1){
			var es = tyz.getByClass( node , 'h2v_e' );
			var divWidth = node.offsetWidth;
			if( !es ) break;
			var elength = es.length;
			for( var i = 0 ; i < elength ; i++ ){ 
				var anc = false;
				var offsetRight = divWidth - es[i].offsetLeft + tyz.PX( es[i].style.marginLeft )*1 ; 
				var parent = es[i].parentNode;

				if( offsetRight*1  > tyz.PX(this.target[id].pagewidth)*1 ){ 
					if( tyz.getAttr( es[i].parentNode , 'class' ) == 'h2v' ){ 
						if( !es[i].previousSibling ){
							var cutAt = es[i];
						}else{
							var cutAt = es[i].previousSibling;
						}
					}else{ 
						if( i != 0 ){
							var cutAt = es[i-1];
							anc = this.findSameAncestor( es[i] , es[i-1] );
							var tmpanc = anc;
							while( tmpanc ){
								if( tyz.getAttr( tmpanc , 'class' ) == 'h2v' )break;
								if( tyz.PX( tmpanc.style.height ) == 0 ){
									if( this.isIE8 ){ 
										tmpanc.style.height = tmpanc.offsetHeight - tyz.PX( tmpanc.style.paddingTop ) - tyz.PX( tmpanc.style.paddingBottom )-tyz.PX( tmpanc.style.borderTopWidth ) -tyz.PX( tmpanc.style.borderBottomWidth ) + 'px' ;
									}else{
										tmpanc.style.height = tyz.getStyle(tmpanc ).height ;
									}
								}
								tmpanc = tmpanc.parentNode;
							}
						}else{ 
							var cutAt = es[i];
						}
					}

					page[page.length] = this.extractRange( node , cutAt  );
					var lc = page[page.length-1];
					while( lc.lastChild ){
						lc = lc.lastChild ;
						if( ( this.isBlock( lc ) || this.isList(lc ) ) && tyz.getAttr( lc , 'class' )!='h2v_e' ){
							lc.style.marginLeft = '0px' ;
							lc.style.paddingLeft = '0px' ;
							lc.style.borderLeftWidth = '0px' ;
						}
						if( tyz.getAttr( lc , 'class' )=='h2v_e')break;
					}

					while( anc ){
						if( tyz.getAttr( anc , 'class' ) == 'h2v' )break;
						if( anc.style ){
							anc.style.marginRight = '0px';
							anc.style.paddingRightt = '0px' ;
							anc.style.borderRightWidth = '0px' ;
							anc = anc.parentNode ;
						}
					}
					break;
				} 
			}

			if( i == elength && node.hasChildNodes){
				page[page.length] = this.extractNodeContents( node );
				break;
			}
		}
		return page;
	},

	isBlock : function( node ){	
		for( var i = 0 ; i < this.blocks.length ; i++ ){
			if( node.nodeName== this.blocks[i] )return true;
		}
		return false;
	},
	
	isList : function( node ){
		for( var i = 0 ; i < this.lists.length ; i++ ){
			if( node.nodeName== this.lists[i] )return true;
		}
		return false;
	},

	isInline : function( node ){
		for( var i = 0 ; i < this.inlines.length ; i++ ){
			if( node.nodeName== this.inlines[i]  )return true;
		}
		return false;
	},
	
	isThru : function( node ){ 
		for( var i = 0 ; i < this.thrus.length ; i++ ){ 
			if( node.nodeName== this.thrus[i]  )return true;
		}
		return false;
	},
	
	rotateProperties : function( node ){ 
		var cn; var nodename;
		for(var i = 0 ; i < node.childNodes.length ; i++ ){
			cn = node.childNodes[i] ;
			nodename = cn.nodeName;
			if( this.isBlock( cn ) || this.isList( cn ) || this.isInline( cn ) || ( nodename=='SPAN' && !/h2v/g.test(tyz.getAttr( cn , 'class' ) ))|| nodename=='DIV' || this.isThru( cn) ){
				if( this.isWKold ){
						var wkd = cn.style.display;
						cn.style.display = 'inline-block';
				}
				var s = tyz.getStyles( cn , { 'fontSize' : '' ,
														'marginTop' : '' ,
														'marginRight' : '' ,
														'marginBottom' : '' ,
														'marginLeft' : '' ,
														'paddingTop' : '' ,
														'paddingRight' : '' ,
														'paddingBottom' : '',
														'paddingLeft' : '' ,
														'borderTopStyle' : '' ,
														'borderRightStyle' : '' ,
														'borderBottomStyle' : '' ,
														'borderLeftStyle' : '' } ) ;
			if( this.isWKold)cn.style.display = wkd;

			var newMargin = tyz.floor( tyz.PX( s.marginLeft ) , 0 ) + 'px ' + tyz.floor( tyz.PX( s.marginTop ) , 0 ) + 'px ' + tyz.floor( tyz.PX( s.marginRight ) , 0 ) + 'px ' +  tyz.floor( tyz.PX( s.marginBottom ) , 0 ) + 'px' ;
			var newPadding = tyz.floor( tyz.PX( s.paddingLeft ) , 0 ) + 'px ' + tyz.floor( tyz.PX( s.paddingTop ) , 0 ) + 'px ' + tyz.floor( tyz.PX( s.paddingRight ) , 0 ) + 'px ' +  tyz.floor( tyz.PX( s.paddingBottom ) , 0 ) + 'px' ;
			var newBorder = this.rotateBorder( { 'Top' : s.borderTopStyle ,
															'Right' : s.borderRightStyle,
															'Bottom' : s.borderBottomStyle,
															'Left' : s.borderLeftStyle } , cn ) ;
			var newProp = { 'fontSize' : tyz.floor( tyz.PX( s.fontSize ) , 1 )+'px' , 'margin' : newMargin , 'padding' : newPadding };
			for( var bkey in newBorder ){
				newProp[bkey] = newBorder[bkey] ;
			}
			tyz.setStyles( cn , newProp );

			this.rotateProperties( cn );

			}
		}
	} ,

	rotateBorder : function( bdr , node ){
		var newBdr = {} ;
		for( var pos in bdr ){
			if( bdr[pos] && bdr[pos] != 'none' ){
				newBdr['border'+r(pos)+'Style'] = bdr[pos] ;
				var wcp = {} ;
				wcp['border'+pos+'Width'] = '';
				wcp['border'+pos+'Color'] = '' ;
				var wc = tyz.getStyles( node , wcp );
				newBdr['border'+r(pos)+'Width'] = wc['border'+pos+'Width'];
				newBdr['border'+r(pos)+'Color'] = wc['border'+pos+'Color'];
			}else{
				newBdr['border'+r(pos)+'Style'] = 'none' ;
				newBdr['border'+r(pos)+'Width'] = '0';
			}
		}
	
		return newBdr ;
		
		function r( pos ){
			var newKey = { 'Top' : 'Right' , 'Right' : 'Bottom' , 'Bottom' : 'Left' , 'Left' : 'Top' } ;
			return newKey[pos];
		}
	},
	
	getDisplayedStyle : function( source , prop , flag){
		var df = source.cloneNode(flag);
		var pn = source.parentNode;
		var depth = 0;
		while( pn &&   pn.nodeName != '#document-fragment' ){ 
			var td = pn.cloneNode( false );
			td.appendChild(df);
			df = td;
			depth++;
			pn = pn.parentNode;
		}
		this.tmpdiv.appendChild( df.cloneNode( true ) );
		var myself = this.tmpdiv.lastChild ;
		for( d = 0 ; d < depth ; d++ ){
			myself = myself.lastChild;
		}
		
		var p = prop ;
		for( var key in p ){
			p[key] = tyz.getStyle( myself )[key];
		}
		this.tmpdiv.removeChild( this.tmpdiv.lastChild );

		return p ;
	} ,

	createTmpdiv : function( id ){
		if( !tyz.getById( 'h2v_tmp_div' ) ){
			var width =  this.target[id].originalHeight *1.5 * tyz.PX( this.target[id].fontsize ) / tyz.PX( this.target[id].originalFontSize ) ;
			width = width*1 + tyz.getById( id ).offsetWidth*1.5;
			width = tyz.round( width , 0 );
			var tmpdiv = tyz.newEle( 'DIV' , { 'id' : 'h2v_tmp_div' , 'class' : 'h2v' } , 
															{ 'position' : 'absolute' ,'top' : '0px' , 'left' : '0px' , 'width' : width+'px' ,  'visibility' : 'hidden'  } );
			tyz.getById( id ).appendChild( tmpdiv );
			return tmpdiv;
		}else{
			return tyz.getById( 'h2v_tmp_div' );
		}
	} ,
	
	removeTmpdiv : function( id ){
		if( tyz.getById( 'h2v_tmp_div' ) ){
			tyz.getById( 'h2v_tmp_div' ).parentNode.removeChild( tyz.getById( 'h2v_tmp_div' ) );
		}
	},
	
	h2v : function( params , id ){ 
		this.id = id;
		var p = params[id];
		var hc = h2vconvert;
		this.auto = setVal( 'auto' );
		this.bar = setVal( 'bar' );
		this.showcredit = setVal( 'showcredit' );
		this.chars = setVal( 'chars' );
		this.fontsize = setVal( 'fontsize' );
		this.lineInterval = setVal( 'lineInterval' );
		this.pagewidth = setVal( 'pagewidth' );
		if( p.bar === undefined && p.recovery !== undefined )this.bar = p.recovery; 
		if( hc.isIE8 ) this.fontsize = hc.ieFontValue( this.fontsize );
		var parentWidth = tyz.getById( id ).offsetWidth - tyz.getPxStyle( id , 'paddingLeft' ) - tyz.getPxStyle( id , 'paddingRight' ) - tyz.getPxStyle( id , 'borderLeftWidth' ) - tyz.getPxStyle( id , 'borderRightWidth' ) ;
		this.pagewidth = p.pagewidth !== undefined ? p.pagewidth : ( parentWidth+'px' );
		if( tyz.PX( this.pagewidth ) > parentWidth ){
			this.pagewidth = parentWidth+'px';
		}

		/* backup original html and properties */
		this.original = tyz.getById( this.id ).innerHTML;
		this.originalFontFamily = tyz.getStyle( id ).fontFamily;
		this.originalFontSize = tyz.getStyle( id).fontSize ;
			if( hc.isIE8 ) this.originalFontSize = hc.ieFontValue( this.originalFontSize );
		this.originalHeight= tyz.getById(id).offsetHeight;
		/* change style properties in target for caliculate EXACT value */
		tyz.getById( id ).style.fontFamily = hc.defaultFontFamily ;
		tyz.getById( id ).style.fontSize = this.fontsize;

		this.html = tyz.getById( this.id ).innerHTML ;
		this.converted = '';
		
		function setVal( vname ){
			return p[vname] !== undefined ? p[vname] : hc.defaultval[vname];
		}
	},

	addVTags : function( node ){
		var cn;
		var nodename;
		for( var i = node.childNodes.length-1 ; i >= 0 ; i-- ){
			cn = node.childNodes[i] ;
			nodename = cn.nodeName;
			if( nodename == "#text" ){
				var text = cn.nodeValue;
				var matchpattern = RegExp(  '([' + this.komojis + '])|([' + this.chos + '])|([' + this.kutos + '])|(\\s)|([!-~]+\\s?)|([' + this.kakkos + '])' , 'g' );
				var result = new Array();
				var cname = new Array();
				var place = new Array();
				var plength = new Array();
				while( result = matchpattern.exec( text ) ){ 
					if( result[1] ){
						cname[ cname.length] = 'h2v_komoji' ;
					}else if( result[2] ){
						cname[cname.length] = 'h2v_cho' ;
					}else if( result[3] ){
						cname[cname.length] = 'h2v_kuto' ;
					}else if( result[4]){ 
						cname[cname.length] = 'h2v_sp' ;
					}else if( result[5]){ 
						cname[cname.length] = 'h2v_alpha' ;
					}else if( result[6] ){
						cname[cname.length] = 'h2v_kakko' ;
					}
					plength[plength.length] = result[0].length;
					place[place.length] = matchpattern.lastIndex-result[0].length;
				}

				var newspan ;
				for( var j = cname.length -1 ; j >= 0 ; j -- ){
					var endtext = cn.splitText( place[j]+plength[j] );
					var sur = cn.splitText( place[j] );
					var newspan = tyz.newEle( 'SPAN' , { 'class' : cname[j] } );
					if( this.isIE8 ){
						if( cname[j] == 'h2v_cho' ) tyz.setStyles( newspan , { 'filter' : 'progid:DXImageTransform.Microsoft.BasicImage(rotation=1, mirror=1)' , 'fontFamily' : "'ＭＳ ゴシック','MS Gothic' , monospace" } );
						if( cname[j]=='h2v_kakko') tyz.setStyles( newspan , { 'filter' : 'progid:DXImageTransform.Microsoft.BasicImage(rotation=1)' ,'fontFamily' : "'ＭＳ ゴシック','MS Gothic' , monospace"} );
					}
					var nt = sur.nodeValue ;
					var newtext = document.createTextNode( nt );
					newspan.appendChild(newtext );
					cn.parentNode.replaceChild( newspan , sur );
				}
			}else if( this.isBlock( cn ) || this.isList( cn ) || this.isInline( cn ) || cn.nodeName == 'SPAN' ){
				this.addVTags( cn );
			}
		}
	} ,

	findSameAncestor : function( nodeA , nodeB ){
		var p = nodeA ;
		var foundFlag = false;
		while( p.parentNode ){
			p = p.parentNode ; 
			if( tyz.getAttr( p , 'class' ) == 'h2v' )break;
			if( this.isIE8 ){ 
				foundFlag = p.contains( nodeB );
				if( foundFlag )break;
			}else{
				var pos = p.compareDocumentPosition( nodeB );
				foundFlag = pos & p.DOCUMENT_POSITION_CONTAINED_BY;
				if( foundFlag )break;
			}
		}
		if( foundFlag ) return p;
		return false;
	},

	extractRange : function( basenode , endAfter ){
		var rng = document.createDocumentFragment();
		while(1){
			var fs = basenode.firstChild ;
			if( !fs )break;
			if( fs === endAfter ){ 
				rng.appendChild( basenode.removeChild(fs) );
				break;
			}

			var flag = false;
			if( this.isIE8  ){
				if( fs.nodeName != '#text' ){   
					 var ea = endAfter;
					 if( ea.nodeName == '#text' ){
						 ea = ea.parentNode;
						 if( ea.nodeName == '#document-fragment' ){
						 	flag = false;
						}else{
							flag = fs.contains(ea);
						}
					}else{
						flag =  fs.contains( ea ) ;
					}
				}
			}else{
				var pos = fs.compareDocumentPosition( endAfter );
				flag = pos & fs.DOCUMENT_POSITION_CONTAINED_BY ;
			}
			if( flag ){
				rng.appendChild( fs.cloneNode( false ) );
				var lastElements = this.extractRange( fs , endAfter );
				rng.lastChild.appendChild( lastElements );
				if( fs.childNodes.length == 0 )basenode.removeChild(fs);
				break;
			}else{
				rng.appendChild( basenode.removeChild( fs ) );
			}
		}
		return rng;
	},
	
	extractNodeContents : function( node ){
		var rng = document.createDocumentFragment();
		while(1){
			var fs = node.firstChild;
			if( !fs )break;
			rng.appendChild( node.removeChild( fs ) );
		}
		return rng;
	},
	
	switcher : function( id ){
		var tgt = this.target[id] ;
		var dest = tyz.getById( id );
		if( tyz.getByClass( dest , 'h2v' ).length ){
			dest.style.fontSize = tgt.originalFontSize;
			dest.style.fontFamily = tgt.originalFontFamily;
			dest.innerHTML = tgt.original;
		}else{
			if( !tgt.pages ){ 
				this.convert(id);
			}else{
				dest.style.fontFamily = this.defaultFontFamily;
				dest.style.fontSize = tgt.fontsize;
				this.extractNodeContents( dest );
				dest.appendChild( tgt.pages.cloneNode( true )  );
				dest.appendChild( tyz.newEle( 'DIV' , { 'class' : 'clearfix' } ) ) ;
			}
		}
	},
	
	ieFontValue : function( fsize ){ 
		switch( fsize ){
			case 'xx-small' : 
				return '9px';
			case 'x-small' : 
				return '10px';
			case 'small' : 
				return '13px' ;
			case 'medium' :
				return '16px';
			case 'large' : 
				return '18px' ;
			case 'x-large' :
				return '24px' ;
			case 'xx-large' : 
				return '32px' ;
			default :
				return fsize;
		}
	},

	komojis : Array(
			'ぁ',
			'ぃ',
			'ぅ',
			'ぇ',
			'ぉ',
			'っ',
			'ゃ',
			'ゅ',
			'ょ',
			'ゎ',
			'ァ',
			'ィ',
			'ゥ',
			'ェ',
			'ォ',
			'ッ',
			'ャ',
			'ュ',
			'ョ',
			'ヮ'
			).join( '' ),
	
	kakkos : Array(
			'「' , '」' ,
			'『' , '』' ,
			'（' , '）' ,
			'［' , '］' ,
			'｛' , '｝' ,
			'〈' , '〉' ,
			'《' , '》' ,
			'〔' , '〕' ,
			'【' , '】' ,
			'＜' , '＞' ,
				'↑' ,
				'↓' 
			).join( '' ),
	
	chos : Array(
				'ー',
				'縲鰀',   /* 301c ( mac ) */
				'～',   /* ff5e ( win ) */
				'…',
				'竏鈀' ,
				'窶鐀',
				'＝',
				'→' ,
				'←' ,
				'：' ,
				'；' 
		).join( '' ),
	
	kutos : Array(
				'。',
				'、',
				'，'
			).join( '' )
};

var tyz = {
	examType : function( target ){
		return typeof( target ) == 'object' ? target : this.getById( target );
	},
	
	getByClass : function( target , cName ){
		var ele = this.examType( target );
		if( ele.getElementsByClassName ){
			return ele.getElementsByClassName( cName );
		}else{
			var obj = tyz.getByTag( ele ,  '*' );
			var ret = new Array();
			for( var i = 0 ; i < obj.length ; i++ ){
				if( tyz.getAttr( obj[i] , 'class' ) == cName ){
					ret[ret.length] = obj[i] ;
				}
			}
			return ret;
		}
	} ,

	getById : function( id ){
		return document.getElementById( id );
	} ,

	getByTag : function( target , tag ){
		var ele = this.examType( target );
		return ele.getElementsByTagName( tag );
	} ,

	getStyle : function( target ){ 
		var ele = this.examType( target );
		if( h2vconvert.isIE8 )return ele.currentStyle ;
		return document.defaultView.getComputedStyle( ele , null );
	},

	getStyles : function( target , prop ){
		var ele = this.examType( target );
		var s = ele.currentStyle || document.defaultView.getComputedStyle( ele , null );
		if( h2vconvert.isOpera ) s =  document.defaultView.getComputedStyle( ele , null );
		for( var key in prop ){
			prop[key] = s[key];
		}
		return prop;
	},

	getAttr : function( target , attr ){
		var ele = this.examType( target );
		if( attr == 'class' && h2vconvert.isIE8 ) return ele.className || '' ;
		return ele.getAttribute( attr ) || '' ;
	} ,

	PX : function( source ){
		if( source.match( "px" ) ) return source.replace( 'px' , '' );
		if( source.match( "pt" ) ) return source.replace( 'pt' , '' ) * 4 / 3 ;
		if( source.match( "em") ) return source.replace( 'em' , '' ) * h2vconvert.defaultFS;
		if( source.match( /[^0-9\.]/g ) )return 0;
		return this.ceil( source , 2 ) ;
	} ,

	getPxStyle : function( target , prop ){
		var ele = this.examType( target );
		var style = ele.currentStyle || document.defaultView.getComputedStyle( ele , null );
		if( h2vconvert.isOpera ) style = document.defaultView.getComputedStyle( ele , null );
		var val = style[prop] ;
		return this.PX( val );
	},

	setStyles : function( target , styles ){
		var ele = this.examType( target );
		for( var s in styles ){
			ele.style[s] = styles[s];
		}
		return ele;
	} ,

	newEle : function( tagName , attributes , styles ){
		var ele = document.createElement( tagName );
		for( var a in attributes ){
			if( h2vconvert.isIE8 && a == 'class' ){ 
				ele.className = attributes[a];
			}else{
				ele.setAttribute( a , attributes[a] );
			}
		}
		for( var s in styles ){
			var ss = s;
			if( ss == 'float' )ss= h2vconvert.isIE8 ? 'styleFloat' : 'cssFloat' ;
			ele.style[ ss ] = styles[s];
		}
		return ele;
	} ,

	ceil : function( val , sig ){
		return Math.ceil( val * Math.pow( 10 , sig ) ) / Math.pow( 10 , sig ) ;
	} , 
	
	floor : function( val ,sig ){
		return Math.floor( val * Math.pow( 10 , sig ) ) / Math.pow( 10 , sig ) ;
	},
	
	round : function( val ,sig ){
		return Math.round( val * Math.pow( 10 , sig ) ) / Math.pow( 10 , sig ) ;
	}
};

