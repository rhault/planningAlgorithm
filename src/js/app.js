let app = new Vue({
	el: "#app",

	data:{
		datas: [],
		name: "",
		tll: 0,
		raf: 0,
		pri: 0,
		qt: 0,
		wrap_p: true,
		wrap_s: false
	},

	components: {
		"box-input": box
	},

	mounted: function() {
    	$(this.$el).foundation();
  	},

	methods:{
		change: function(){
			this.datas = []
			this.name = "",
			this.tll = 0,
			this.raf = 0,
			this.pri = 0,
			this.qt = 0
		},
		add: function(event){
			this.datas.push({
				'name':this.name,
				'tll': this.tll,
				'raf': this.raf,
				'pri': this.pri,
				'qt': this.qt
			})
		},
		back: function(){
			this.wrap_p = true
			this.wrap_s = false
			this.change()
		},
		calcular: function(){
			this.wrap_p = false
			this.wrap_s = true
			this.datas = cal(this.datas,2)
		}
	}
})