function cal(entry, type,qt){

	let rx = Rx
	let memory  = []
	let temp = []
	//let type = 3
	//let qt = 2
	let t = []
	
	function sorting(json, key) {
	    function sortByKey(a,b) {
	        let x = a[key]
	        let y = b[key]
	        return ((x<y) ? -1 : ((x>y) ? 1 : 0));
	    }
	    json.sort(sortByKey);
	}

	function newJson(arr) {
		return {"name":arr.name, "tll":arr.tll, "raf":arr.raf, "newRaf":arr.newRaf,
			"orgRaf":arr.orgRaf}
	}

	/*let entry = [
		{'name': "a", 'tll':5, 'raf': 4},
		{'name': "b", 'tll':5, 'raf': 3},
		{'name': "c", 'tll':5, 'raf': 6},
		{'name': "d", 'tll':5, 'raf': 7},
		{'name': "e", 'tll':5, 'raf': 8}

		
	]*/

	let data = rx.Observable.from(entry)
		data.subscribe(proces,err,finish)

	function proces(x){	
		if(type == 0){
			//FiFo
			memory.push({'name':x.name, 'tll':x.tll, 'raf':x.raf})
			sorting(memory, "tll")
		}else if(type == 1){
			//Prioridad
			memory.push({'name':x.name, 'tll':x.pri, 'raf':x.raf})
			sorting(memory, "tll")
		}else if(type == 2){
			//Sjf
			if(x.tll == 0){
				memory.push({'name':x.name, 'tll':x.tll, 'raf':x.raf})
				sorting(memory, "raf")
			}else{
				temp.push({'name':x.name, 'tll':x.tll, 'raf':x.raf})
				sorting(temp, "raf")
			}
		}else if(type == 3){
			//Round Robi
			memory.push({'name':x.name, 'tll':x.tll, 'raf':x.raf, "orgRaf": x.raf})

		}
	}

	function err(err){
		console.log(err)
	}

	function finish(){
		if(type == 2){
			for(let i=0; i<=temp.length-1; i++){
				memory.push(temp[i])		
			}

			temp = []
			memory.filter(function(a,b,c){
				for(let x=1; x<=c.length; x++){

					if(c[x-1]["raf"] == a.raf){
						temp.push(c.splice(x-1,1)[0])
						x=0
					}
				} t = c	
			})

			sorting(temp, "tll")
			for (let i = 0; i < t.length; i++) {
				temp.push(t[i])
			}
			sorting(temp, "raf")
			memory = temp
		}

		if(type == 3){
			let length = memory.length

			for(let i=0; i<=memory.length-1; i++){
				memory[i].newRaf = Math.ceil(memory[i].raf/qt)
			}
			while(length > 0){
				let i; let j;
				for (i = 0; i <= memory.length-1; i++) {
					for (j = 1; j <= memory.length; j++) {
						j = j + i
						if(memory[j-1].raf > qt){
							memory[j-1].raf = memory[j-1].raf - qt
							memory[j-1].newRaf =  qt
							temp.push(newJson(memory[j-1]))
							j = 10
						}else if(memory[j-1].raf == qt){
							memory[j-1].newRaf =  qt
							temp.push(newJson(memory[j-1]))
							memory.splice(j-1,1)
							j = 0
						}else if(memory[j-1].raf < qt){
							memory[j-1].raf = qt - memory[j-1].raf
							memory[j-1].newRaf =  qt - memory[j-1].raf
							temp.push(newJson(memory[j-1]))
							memory.splice(j-1,1)
							j = 0			
						}
					}
				}length = memory.length
			}
			memory = temp
		}
	}


	//Graficar
	(function(){
		memory[0].ant = memory[0].tll //Constante
		memory[0].fin = memory[0].ant + memory[0].raf

		for(let i=0; i<memory.length-1; i++){
			memory[i+1].ant = memory[i].ant + memory[i].raf
			memory[i+1].fin = memory[i+1].ant + memory[i+1].raf
		}
	})();

	//Calcular
	(function(){
		for(let i=0; i<=memory.length-1; i++){
			memory[i].esp = memory[i].ant - memory[i].tll
			memory[i].res = memory[i].ant + memory[i].raf
		}
	})();
	
	console.log("memory:",memory)
	return memory
}