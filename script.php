<script type="text/javascript" src="./js/h2v.js" charset="utf-8"></script>
<script type="text/javascript">
var params ={
'rotate_0' :{'fontsize':'14px','pagewidth':'800px','chars':25,'lineInterval':0.3,'auto':false,'recovery':true,'showcredit':false,'bar':false,},
'rotate_1' :{'fontsize':'14px','pagewidth':'800px','chars':25,'lineInterval':0.3,'auto':false,'recovery':true,'showcredit':false,'bar':false,},
'rotate_2' :{'fontsize':'14px','pagewidth':'800px','chars':25,'lineInterval':0.3,'auto':false,'recovery':true,'showcredit':false,'bar':false,},
'rotate_3' :{'fontsize':'14px','pagewidth':'800px','chars':25,'lineInterval':0.3,'auto':false,'recovery':true,'showcredit':false,'bar':false,},
'rotate_4' :{'fontsize':'14px','pagewidth':'800px','chars':25,'lineInterval':0.3,'auto':false,'recovery':true,'showcredit':false,'bar':false,},
'rotate_5' :{'fontsize':'14px','pagewidth':'800px','chars':25,'lineInterval':0.3,'auto':false,'recovery':true,'showcredit':false,'bar':false,},
'rotate_6' :{'fontsize':'14px','pagewidth':'800px','chars':25,'lineInterval':0.3,'auto':false,'recovery':true,'showcredit':false,'bar':false,},
'rotate_7' :{'fontsize':'14px','pagewidth':'800px','chars':25,'lineInterval':0.3,'auto':false,'recovery':true,'showcredit':false,'bar':false,},
'rotate_8' :{'fontsize':'14px','pagewidth':'800px','chars':25,'lineInterval':0.3,'auto':false,'recovery':true,'showcredit':false,'bar':false,},
'rotate_9' :{'fontsize':'14px','pagewidth':'800px','chars':25,'lineInterval':0.3,'auto':false,'recovery':true,'showcredit':false,'bar':false,},
'rotate_10':{'fontsize':'14px','pagewidth':'800px','chars':25,'lineInterval':0.3,'auto':false,'recovery':true,'showcredit':false,'bar':false,},
'rotate_11':{'fontsize':'14px','pagewidth':'800px','chars':25,'lineInterval':0.3,'auto':false,'recovery':true,'showcredit':false,'bar':false,},
'rotate_99':{'fontsize':'14px','pagewidth':'800px','chars':25,'lineInterval':0.3,'auto':true, 'recovery':true,'showcredit':false,'bar':false,},
}

h2vconvert.init(params);

function rotate(page){
if (page=="button") {
	if(document.getElementById("vertical").value==1){
		document.getElementById("vertical").value=0;
	}else{
		document.getElementById("vertical").value=1;
	}
}

if (page=="button") {
	hash = location.hash;
	hash = hash.replace("#", "");
}else{
	hash = page;
}

if(document.getElementById("vertical").value!=document.getElementById("state_"+hash).value){
	h2vconvert.switcher('rotate_'+document.getElementById("code_"+hash).value);
	document.getElementById("state_"+hash).value=document.getElementById("vertical").value;
}
}

<?php $list_j = join(",",$list); ?>
function current(val){
if (val=="top") {
	document.getElementById("link-top").className="current";
}else{
	document.getElementById("link-top").className="";
}

var list_j = "<?php echo $list_j; ?>";
var list = list_j.split(",");

for (var i in list){
	if (i == '_reduce') {break;}
	
	if (list[i]==val) {
		document.getElementById("link-"+list[i]).className="current";
	}else{
	  	document.getElementById("link-"+list[i]).className="";
	}
}
}
</script>

<?php if($device==='pc'){ ?>
<script type="text/javascript">
  window.___gcfg = {lang: 'ja'};

  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
</script>
<?php } ?>

<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-20423739-4']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>

<style>
div#rotate_99{margin-right:1em;}
</style>