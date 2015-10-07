var React = require('react');
var ProductModel = require('../models/productModel.js');

module.exports = React.createClass({
	getInitialState: function() {
		return { error: null };
	},
	render: function() {
		var errorElement = null;
		if(this.state.error) {
			errorElement = (
				<p className="red">{this.state.error}</p>
			);
		}
		return (
			<div className="container">
				<div className="row">
					<form className="col s12" onSubmit={this.onAddProduct}>
						<h1>Add Product</h1>
						{errorElement}
						<div className="row">
							<div className="input-field col s12">
								<input type="text" ref="productName" className="validate" />
								<label>Product Name</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<textarea id="textarea1" ref="description" className="materialize-textarea"></textarea>
								<label>Description</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s6">
								<input type="number" ref="price" className="validate" />
								<label>Price</label>
							</div>
							<div className="input-field col s6">
								<select ref="type" className="browser-default">
									<option Value="" disabled selected>Category</option>
									<option Value="books">Books</option>
									<option Value="electronics">Electronics</option>
									<option Value="clothing">Clothing</option>
								</select>
							</div>
						</div>
						<div className="row">
							<button className="waves-effect waves-light btn">Add Product</button>
						</div>
					</form>
				</div>
			</div>
		);
	},
	onAddProduct: function(e) {
		e.preventDefault();
		// console.log(this.refs.type.getDOMNode().value);
		var newProduct = new ProductModel({
			productName: this.refs.productName.getDOMNode().value,
			description: this.refs.description.getDOMNode().value,
			price: this.refs.price.getDOMNode().value,
			type: this.refs.type.getDOMNode().value
		});

		newProduct.save();
		if(this.refs.type.getDOMNode().value == 'Books') {
			console.log('You have submitted a new Book Item');
		}
		else if(this.refs.type.getDOMNode().value == 'Electronics') {
			console.log('You have submitted a new Electronics Item');
		}
		else if(this.refs.type.getDOMNode().value == 'Clothing') {
			console.log('You have submitted a new Clothing Item');
		}

		this.refs.productName.getDOMNode().value = null;
		this.refs.description.getDOMNode().value = null;
		this.refs.price.getDOMNode().value = null;
		this.refs.type.getDOMNode().value = null;
	}
});