let app = new Vue({
	el: "#app",

	data:{
		datas: [],
		name: "",
		tll: 0,
		raf: 0
	},

	components: {
		"box-input": box
	},

	mounted: function() {
    	$(this.$el).foundation();
  	},

	methods:{
		add: function(event){
			this.datas.push({
				'name':this.name,
				'tll': this.tll,
				'raf': this.raf
			})

			console.log(this.datas)
		}
	}
})