var count =0
setInterval(function(){
count = count +1;
process.stdout.write("*******" + "\n");
if(count > 10){
	process.exit();
}
}, 10)