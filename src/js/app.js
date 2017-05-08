

$('.input-number-increment').click(function() {
  var $input = $(this).parents('.input-number-group').find('.input-number');
  var val = parseInt($input.val(), 10);
  $input.val(val + 1);
});

$('.input-number-decrement').click(function() {
  var $input = $(this).parents('.input-number-group').find('.input-number');
  var val = parseInt($input.val(), 10);
  $input.val(val - 1);
})

Vue.component("tip", {

	template: 		`
		<div><span>admdkmv</span>
        <div class="input-group input-number-group">
        
            <div class="input-group-button">
            	<span class="input-number-decrement">-</span>
            </div>
        	<input class="input-number" type="number" value="1" min="0" max="1000">
            <div class="input-group-button">
                <span class="input-number-increment">+</span>
            </div>
        </div>
        </div>
`
})

 new Vue({
	el: "#app",
	mounted: function() {
    	$(this.$el).foundation();
  	},
  	components: {
  		'box-input': box
  	},

	data:{
		datas: [],
		name: "",
		tll: 0,
		raf: 0
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