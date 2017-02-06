import * as React from "react";

import { Line } from 'rc-progress';

import 'whatwg-fetch';

import { BitcoinPrice } from "./BitcoinPrice";

interface Props extends React.Props<App> { }
interface State {
	intervalId: any;
	currentCount: number;
}

export class App extends React.Component<Props, State> {
	
	private intervalId: any;
	private currentPrice: number;
	
	private getBitcoinPrice(){
		let thisScope = this;
		fetch('https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD')
			.then(function(response) {
				return response.json();
			}).then(function(json) {
				thisScope.currentPrice = json.last;
				thisScope.setState({currentCount: 100});
			}).catch(function(ex){
				console.log("Error");
				console.log(ex);
			});
		
	}
	
	constructor(props: any){
        super(props);
		this.state = { 
			currentCount: 100,
			intervalId: 0
        };
		
		this.timer = this.timer.bind(this);
    }
	
	public componentDidMount() {
		var intervalId = setInterval(this.timer, 1000);
		this.setState({intervalId: intervalId});
		this.getBitcoinPrice();
	}

	public componentWillUnmount() {
		clearInterval(this.state.intervalId);
	}

	public timer() : void {
		if(this.state.currentCount == 0){
			this.getBitcoinPrice();
		} else {
			this.setState({currentCount: this.state.currentCount - 1});
		}
	}
		
	public render(){
		return (
			<div>
				<BitcoinPrice value={this.currentPrice} />
				<Line percent={this.state.currentCount} strokeWidth="1" strokeColor="#f00" />
			</div>
		);
	}
}