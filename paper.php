<div id="paper" class="shadow">

<div id="header">
<p class="x-small">
<span class="bold"><?php if($page=='top'){echo '1';}else{echo $key+2;} ?></span>　　
平成<?php echo (date("Y")-1988); ?>年（<?php echo date("Y年");?>）<?php echo date("n月j日"); ?>　<?php echo $day[date("w")]; ?>曜日
　　　　　　　　　は　　　て　　　ぶ　　　新　　　聞　　（速報版）
</p>
</div>

<div id="box">

<?php if($page=="top"){ ?>
<div id="right">
<h1><img src="./image/logo.gif" alt="はてぶ新聞 速報版"></h1>
<br />
<img src="./image/ex.png" alt="速報版">
<br /><br />
<?php if(isset($date)){ ?><a href="<?php echo $wiki; ?>" target="_blank"><?php } ?>
<p>平成<?php echo (date("Y")-1988); ?>年（<?php echo date("Y年");?>）</p>
<p class="bold"><span class="xx-large"><?php echo date("n"); ?></span><span class="large">月</span> <span class="xx-large"><?php echo date("j"); ?></span><span class="large">日</span></p>
<p class="large bold"><?php echo $day[date("w")]; ?>曜日</p>
<p><?php if(isset($date)){ ?><?php echo $date; ?><?php } ?></p>
<?php if(isset($date)){ ?></a><?php } ?>
<br />

<?php if($device==='pc'){ ?>
<script type="text/javascript" charset="utf-8" src="http://tenki.jp/blog/script/parts/forecast/?type=top&color=0&size=small"></script>
<br />
<?php } ?>
<br />

<!-- admax -->
<script type="text/javascript" src="http://adm.shinobi.jp/s/9815a70083ab78d91bf58b23756650fe"></script>
<!-- admax -->
<br />
<!--
<SCRIPT charset="utf-8" type="text/javascript" src="http://ws.amazon.co.jp/widgets/q?ServiceVersion=20070822&MarketPlace=JP&ID=V20070822/JP/tiger4th-22/8006/3d3ced38-8d14-4282-88d1-5e6834674e25"> </SCRIPT> <NOSCRIPT><A HREF="http://ws.amazon.co.jp/widgets/q?ServiceVersion=20070822&MarketPlace=JP&ID=V20070822%2FJP%2Ftiger4th-22%2F8006%2F3d3ced38-8d14-4282-88d1-5e6834674e25&Operation=NoScript">Amazon.co.jp ウィジェット</A></NOSCRIPT>
-->
</div>

<div id="left">
<div id="rotate_99">
<h2>速報</h2>
<?php $i = 0; ?>
<?php foreach ($text["topics"] as $value) { ?>
<p class='article'>
<b class="large"><a href="<?php echo $value["link"]; ?>" target="_blank"><?php echo $value["title"]; ?></a></b>
 <a href="<?php echo "http://b.hatena.ne.jp/entry/".$value["link"]; ?>" target="_blank"><span class='num'><?php echo $value["bookmarkcount"]; ?></span></a><br />
<?php echo $value["description"]; ?>
<span class="x-small"> <?php echo $value["date"]; ?></span>
</p>
<?php $i++; if ($i >= 3) {break;} ?>
<?php } ?>

<h2>一般</h2>
<?php $i = 0; ?>
<?php foreach ($text["general"] as $value) { ?>
<p class='article'>
<b class="large"><a href="<?php echo $value["link"]; ?>" target="_blank"><?php echo $value["title"]; ?></a></b>
 <a href="<?php echo "http://b.hatena.ne.jp/entry/".$value["link"]; ?>" target="_blank"><span class='num'><?php echo $value["bookmarkcount"]; ?></span></a><br />
<?php echo $value["description"]; ?>
<span class="x-small"> <?php echo $value["date"]; ?></span>
</p>
<?php $i++; if ($i >= 3) {break;} ?>
<?php } ?>

<h2>政治・経済</h2>
<?php $i = 0; ?>
<?php foreach ($text["economics"] as $value) { ?>
<p class='article'>
<b class="large"><a href="<?php echo $value["link"]; ?>" target="_blank"><?php echo $value["title"]; ?></a></b>
 <a href="<?php echo "http://b.hatena.ne.jp/entry/".$value["link"]; ?>" target="_blank"><span class='num'><?php echo $value["bookmarkcount"]; ?></span></a><br />
<?php echo $value["description"]; ?>
<span class="x-small"> <?php echo $value["date"]; ?></span>
</p>
<?php $i++; if ($i >= 3) {break;} ?>
<?php } ?>

<h2>スポーツ・芸能・音楽</h2>
<?php $i = 0; ?>
<?php foreach ($text["entertainment"] as $value) { ?>
<p class='article'>
<b class="large"><a href="<?php echo $value["link"]; ?>" target="_blank"><?php echo $value["title"]; ?></a></b>
 <a href="<?php echo "http://b.hatena.ne.jp/entry/".$value["link"]; ?>" target="_blank"><span class='num'><?php echo $value["bookmarkcount"]; ?></span></a><br />
<?php echo $value["description"]; ?>
<span class="x-small"> <?php echo $value["date"]; ?></span>
</p>
<?php $i++; if ($i >= 3) {break;} ?>
<?php } ?>
</div>
</div>

<input type="hidden" id="state_top" value="1">
<input type="hidden" id="code_top" value="99">

<?php }elseif($page=="amazon"){ ?>
<div id="center">
<div id="rotate_<?php echo array_search($page, $list); ?>">
<h2><?php echo $long_name[array_search($page, $list)]; ?></h2>
<br />
<?php foreach ($text[$page] as $value) { ?>
<p class='article'>
<b class="large"><a href="<?php echo $value["link"]; ?>" target="_blank"><?php echo $value["title"]; ?></a></b>
 <a href="<?php echo "http://b.hatena.ne.jp/entry/".$value["link"]; ?>" target="_blank"><span class='num'><?php echo $value["bookmarkcount"]; ?></span></a><br />
<span class="x-small"> <?php echo $value["date"]; ?></span>
<br/><br/>
</p>
<?php } ?>
<br />
<iframe src="http://rcm-jp.amazon.co.jp/e/cm?t=tiger4th-22&o=9&p=16&l=bn1&mode=books-jp&browse=202188011&fc1=000000&lt1=_blank&lc1=3366FF&bg1=EEEEEE&f=ifr" marginwidth="0" marginheight="0" width="468" height="336" border="0" frameborder="0" style="border:none;" scrolling="no"></iframe>
</div>
</div>

<input type="hidden" id="state_<?php echo $page; ?>" value="0">
<input type="hidden" id="code_<?php echo $page; ?>" value="<?php echo $key; ?>">



<?php }else{ ?>
<div id="center">
<div id="rotate_<?php echo array_search($page, $list); ?>">
<h2><?php echo $long_name[array_search($page, $list)]; ?></h2>
<br />
<?php foreach ($text[$page] as $value) { ?>
<p class='article'>
<b class="large"><a href="<?php echo $value["link"]; ?>" target="_blank"><?php echo $value["title"]; ?></a></b>
 <a href="<?php echo "http://b.hatena.ne.jp/entry/".$value["link"]; ?>" target="_blank"><span class='num'><?php echo $value["bookmarkcount"]; ?></span></a><br />
<?php echo $value["description"]; ?>
<span class="x-small"> <?php echo $value["date"]; ?></span>
</p>
<?php } ?>
</div>
</div>

<input type="hidden" id="state_<?php echo $page; ?>" value="0">
<input type="hidden" id="code_<?php echo $page; ?>" value="<?php echo $key; ?>">
<?php } ?>

<div id="footer">
<p class="hidden">&copy;tiger4th.com</p>
</div>
</div>

</div>
