<?php require("./logic.php"); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>はてぶ新聞 速報版</title>
<meta name="description" content="はてなブックマークの新着エントリーを新聞のように読むことができます。" />
<meta name="keywords" content="はてな,はてなブックマーク,はてブ,はてぶ,新聞,ニュース,速報" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<link rel="shortcut icon" href="./image/favicon.ico">
<link rel="stylesheet" type="text/css" href="./css/h2v.css">
<link rel="stylesheet" type="text/css" href="./css/style.css">
<link rel="apple-touch-icon-precomposed" href="./image/apple-touch-icon.gif" />
<?php if($device==='sp'){ ?><link rel="stylesheet" type="text/css" href="./css/style_sp.css"><?php } ?>
<?php if($device==='tb'){ ?><link rel="stylesheet" type="text/css" href="./css/style_tb.css"><?php } ?>
<?php require("./script.php"); ?>
<?php require("./js/addthis.js"); ?>
</head>

<body onLoad="location.href='#top';">
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/ja_JP/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<!--[if lt IE 9]>
<div id='warning'><br /><br />
<div style='border: 1px solid #F7941D; background: #FEEFDA; text-align: center; clear: both; height: 68px; width: 800px; position: relative; margin:0 auto 0 auto;'>
<div style='position: absolute; right: 3px; top: 3px; font-family: courier new; font-weight: bold;'>
<a href='javascript:void(0);' onclick="document.getElementById('warning').style.display='none';"><img src='./image/close.gif' style='border: none;' alt='Close this notice'/></a>
</div>
<div style='width: 640px; margin: 0 auto; text-align: left; padding: 0; overflow: hidden; color: black;'>
<div style='width: 75px; float: left;'><img src='./image/warning.gif' alt='Warning!' height='64' /></div>
<div style='width: 275px; float: left; font-family: Arial, sans-serif;'>
<div style='font-size: 14px; font-weight: bold; margin-top: 12px;'>あなたは旧式ブラウザをご利用中です</div>
<div style='font-size: 12px; margin-top: 6px; line-height: 12px;'>このウェブサイトを快適に閲覧するにはブラウザをアップグレードしてください。</div>
</div>
<div style='width: 71px; float: left;'><a href='http://windows.microsoft.com/ja-JP/internet-explorer/downloads/ie' target='_blank'><img src='./image/ie.png' style='border: none;' alt='Get Internet Explorer'/></a></div>
<div style='width: 71px; float: left;'><a href='http://www.mozilla.jp/firefox/' target='_blank'><img src='./image/firefox.png' style='border: none;' alt='Get Firefox'/></a></div>
<div style='width: 71px; float: left;'><a href='http://jp.opera.com/browser/' target='_blank'><img src='./image/opera.png' style='border: none;' alt='Get Opera'/></a></div>
<div style='width: 71px; float: left;'><a href='http://www.apple.com/jp/safari/' target='_blank'><img src='./image/safari.png' style='border: none;' alt='Get Safari'/></a></div>
</div>
</div>
</div>
<![endif]-->

<noscript>
<br /><br />
<div style='border: 1px solid #F7941D; background: #FEEFDA; text-align: center; clear: both; height: 68px; width: 800px; position: relative; margin:0 auto 0 auto;'>
<div style='width: 640px; margin: 0 auto; text-align: left; padding: 0; overflow: hidden; color: black;'>
<div style='width: 75px; float: left;'><img src='./image/warning.gif' alt='Warning!' height='64' /></div>
<div style='width: 375px; float: left; font-family: Arial, sans-serif;'>
<div style='font-size: 14px; font-weight: bold; margin-top: 12px;'>JavaScriptが無効になっています</div>
<div style='font-size: 12px; margin-top: 6px; line-height: 12px;'>このウェブサイトを快適に閲覧するにはJavaScriptを有効にしてください。</div>
</div>
</div>
</div>
</noscript>

<!-- top bar -->
<div class="<?php if($device==='sp'){ ?>sp-<?php } ?>top-bar">
<nav id="nav-button">
<a id="link-top" class="current" href="#top" onclick="current('top');rotate('top');">トップ</a>
<?php foreach ($list as $key => $val) { ?>
<a id="link-<?php echo $val; ?>" href="#<?php echo $val; ?>" onclick="current('<?php echo $val; ?>');rotate('<?php echo $val; ?>');"><?php echo $name[$key]; ?></a>
<?php } ?>
</nav>

<?php if($device!=='sp'){ ?>
<span class="right">
<a href="http://tiger4th.com/hatebu/">通常版</a><a href="http://tiger4th.com/" target="_blank">リンク</a>
</span>
<?php } ?>
</div>
<!-- /top bar -->

<?php if($device==='sp'){ ?>
<!-- sp bottom bar -->
<div class="sp-bottom-bar">
<input type="hidden" id="vertical" value="1">
<table>
<tr>
<td><a href="javascript:void(0);" onclick="rotate('button');return false;"><img src="./image/lotate.gif"></a></td>
<td><a href="http://b.hatena.ne.jp/entry/http://tiger4th.com/hatebu_ex/" class="hatena-bookmark-button" data-hatena-bookmark-title="hatebu" data-hatena-bookmark-layout="standard" title="このエントリーをはてなブックマークに追加"><img src="http://b.st-hatena.com/images/entry-button/button-only.gif" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style="border: none;" /></a><script type="text/javascript" src="http://b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async"></script></td>
<td>&nbsp;</td>
<td><a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-lang="ja">ツイート</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></td>
<td><div class="fb-like" data-href="http://tiger4th.com/hatebu_ex/" data-send="false" data-layout="button_count" data-width="120" data-show-faces="false"></div></td>
<td><div data-plugins-type="mixi-favorite" data-service-key="72a9b1b5e88fb2e78799a709d16c2f3284261892" data-size="medium" data-href="http://tiger4th.com/hatebu_ex/" data-show-faces="false" data-show-count="true" data-show-comment="true" data-width="120"></div><script type="text/javascript">(function(d) {var s = d.createElement('script'); s.type = 'text/javascript'; s.async = true;s.src = '//static.mixi.jp/js/plugins.js#lang=ja';d.getElementsByTagName('head')[0].appendChild(s);})(document);</script></td>
<td><a href="http://tiger4th.com/hatebu/">通常版</a></td>
<td><a href="http://tiger4th.com/" target="_blank">リンク</a></td>
</tr>
</table>
</div>
<!-- /sp bottom bar -->
<?php } ?>

<!-- top -->
<div id="top" class="panel">
<?php $page="top"; ?>
<?php require("./paper.php"); ?>
</div>
<!-- /top -->

<!-- page -->
<?php foreach ($list as $key => $val) { ?>
<div id="<?php echo $val; ?>" class="panel">
<?php $page=$val; ?>
<?php require("./paper.php"); ?>
</div>
<?php } ?>
<!-- /page -->

<?php if($device!=='sp'){ ?>
<!-- ad -->
<div id="ad">
<div><input id="ad_close" type="button" onclick="document.getElementById('ad').style.display='none'" value="close"/></div>
<!-- admax -->
<script type="text/javascript" src="http://adm.shinobi.jp/s/67d310fb25423b540510ab53f498cd67"></script>
<!-- admax -->
</div>
<!-- /ad -->

<!-- bottom bar -->
<div class="bottom-bar">
<input type="hidden" id="vertical" value="1">
<table>
<tr>
<td><a href="javascript:void(0);" onclick="rotate('button');return false;"><img src="./image/lotate.gif"></a></td>
<td><a href="http://b.hatena.ne.jp/entry/http://tiger4th.com/hatebu_ex/" class="hatena-bookmark-button" data-hatena-bookmark-title="hatebu" data-hatena-bookmark-layout="standard" title="このエントリーをはてなブックマークに追加"><img src="http://b.st-hatena.com/images/entry-button/button-only.gif" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style="border: none;" /></a><script type="text/javascript" src="http://b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async"></script></td>
<td>&nbsp;</td>
<td><a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-lang="ja">ツイート</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></td>
<td><div class="fb-like" data-href="http://tiger4th.com/hatebu_ex/" data-send="false" data-layout="button_count" data-width="120" data-show-faces="false"></div></td>
<td><div data-plugins-type="mixi-favorite" data-service-key="72a9b1b5e88fb2e78799a709d16c2f3284261892" data-size="medium" data-href="http://tiger4th.com/hatebu_ex/" data-show-faces="false" data-show-count="true" data-show-comment="true" data-width="120"></div><script type="text/javascript">(function(d) {var s = d.createElement('script'); s.type = 'text/javascript'; s.async = true;s.src = '//static.mixi.jp/js/plugins.js#lang=ja';d.getElementsByTagName('head')[0].appendChild(s);})(document);</script></td>
<?php if($device==='pc'){ ?><td><g:plusone size="medium"></g:plusone></td><?php } ?>
<td><!-- AddThis Button BEGIN -->
<a class="addthis_button" href="http://www.addthis.com/bookmark.php?v=250&amp;pubid=ra-4e3ab77310f2fc55"><img src="http://s7.addthis.com/static/btn/v2/lg-share-en.gif" width="125" height="16" alt="Bookmark and Share" style="border:0"/></a>
<script type="text/javascript" src="http://s7.addthis.com/js/250/addthis_widget.js#pubid=ra-4e3ab77310f2fc55"></script>
<!-- AddThis Button END --></td>
</tr>
</table>
</div>
<!-- /bottom bar -->
<?php } ?>

</body>
</html>