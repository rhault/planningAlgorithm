let box = {
	props: {
        title: String
    },
	template:
		`<div>
            <label> {{title}}  </label>
            <div class="input-group input-number-group">
                <div v-on:click="less()" class="input-group-button">
                   <span class="input-number-decrement">-</span>
                </div>
                <input ref=input v-model="counter" 
                    v-on:input=valor($event.target.value) class="input-number" type="number">
                <div v-on:click="more()" class="input-group-button">
                    <span class="input-number-increment">+</span>
                </div>
            </div>
        </div>`,
    data:function(){
        return {counter :0}
    },
    methods:{
        more: function(){
            this.counter += 1
            this.$emit("input", this.counter)
        },
        less: function(){           
            if(this.counter > 0){
                this.counter -= 1
                this.$emit("input", this.counter)
            }
        },
        valor(e){
            this.$emit("input", this.counter)
        },
    }
}