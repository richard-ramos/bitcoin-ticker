import * as React from "react";


import 'whatwg-fetch';

import { BitcoinPrice } from "./BitcoinPrice";

interface Props extends React.Props<App> { }

export class App extends React.Component<Props, {}> {
	
	private testJson(){
		fetch('http://api.coindesk.com/v1/bpi/currentprice.json')
			.then(function(response) {
				return response.json();
			}).then(function(json) {
				console.log(json);
			}).catch(function(ex){
				console.log("Error");
			});
		
	}
	
	public render(){
		this.testJson();
		
		return (
			<div>
				<BitcoinPrice value={123} />
			</div>
		);
	}
}