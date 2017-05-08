let box = {
	props: {
        title: String
    },
	template:
		`<div>
            <span> {{title}}  </span>
            <div class="input-group input-number-group">
                <div v-on:click="less()" class="input-group-button">
                   <span class="input-number-decrement">-</span>
                </div>
                <input v-model="counter" class="input-number" type="number">
                <div v-on:click="raf += 1" class="input-group-button">
                    <span class="input-number-increment">+</span>
                </div>
            </div>
        </div>`,
    data:function(){
        return {counter :0}
    },
    methods:{
        less: function(){
            console.log(this.raf)
            //if(this.counter > 0){this.counter -= 1}
        }
    }
}