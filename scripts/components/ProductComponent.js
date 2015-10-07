var React = require('react');
var ProductModel = require('../models/productModel.js');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			products: [],
			currentType: null
		};
	},
	componentWillMount: function() {
		var query = new Parse.Query(ProductModel);
		query
		.find().then(
			(products) => {
				this.setState({products: products})
			},
			(err) => {
				console.log(err);
			}
		)
	},
	render: function() {
		var productElements = this.state.products
		.filter((product) => {
			if(this.state.currentType === null) {
				return true;
			}
			return (product.get('type') == this.state.currentType)
		})
		.map(function(product) {
			return (<a href={'#product/details/'+product.id} className="productLink">{product.get('productName')}</a>);
		})
		return (
			<div className="container">
				<div className="row">
					<h1>Products</h1>
					<button onClick={this.showAll}>All</button>
					<button onClick={this.showBooks}>Books</button>
					<button onClick={this.showElectronics}>Electronics</button>
					<button onClick={this.showClothing}>Clothing</button>
					{productElements}
				</div>
			</div>
		);
	},
	showAll: function() {
		this.setState({
			currentType: null
		})
	},
	showBooks: function() {
		this.setState({
			currentType: 'Books'
		})
	},
	showElectronics: function() {
		this.setState({
			currentType: 'Electronics'
		})
	},
	showClothing: function() {
		this.setState({
			currentType: 'Clothing'
		})
	}
});