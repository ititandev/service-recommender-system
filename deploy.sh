#params: admin, homepage, provider
declare -A args
args=(["admin"]=1 ["homepage"]=1 ["provider"]=1)
name="all"
function deploy(){
	rm -rf "server/public/${name}/"
	mkdir "server/public/${name}/"
	cd "$name" && yarn build
	mv build/* ../server/public/"$name"
	cd ..
}
param="$1"
echo $param
if [[ "$param" == "all" ]]; 
then
	echo "deploy for all"
	for key in "{!args[@]}"
	do
		name=$key
		deploy
	done
elif [[ ${args[$param]} -eq 1 ]]; 
then
	name=$param
	deploy
else
	echo "using command: ./deploy.sh admin|provider|homepage|all"
fi


