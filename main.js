let rx = require('rxjs/Rx')
let memory  = []
let temp = []
let type = 0

function sorting(json, key) {
    function sortByKey(a,b) {
        let x = a[key]
        let y = b[key]
        return ((x<y) ? -1 : ((x>y) ? 1 : 0));
    }
    json.sort(sortByKey);
}

//***************************************************//
let entry = [
	{'name': "a", 'tll':1, 'raf': 2},
	{'name': "b", 'tll':0, 'raf': 4},
	{'name': "c", 'tll':0, 'raf': 3}
]

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
	}else{
		//Round Robi
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
	}
}

//Graficar
(function(){
	memory[0].ant = memory[0].tll //Constante

	for(let i=0; i<memory.length-1; i++){
		memory[i+1].ant = memory[i].ant + memory[i].raf
	}
})();

//Calcular
(function(){
	for(let i=0; i<=memory.length-1; i++){
		memory[i].esp = memory[i].ant - memory[i].tll
		memory[i].res = memory[i].ant + memory[i].raf
	}
})();

console.log(memory)