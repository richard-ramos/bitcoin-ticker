import * as React from "react";

import { Line } from 'rc-progress';

import 'whatwg-fetch';

import { BitcoinPrice } from "./BitcoinPrice";

interface Props extends React.Props<App> { }
interface State {
	intervalId: any;
	progress: number;
	seconds: number;
}

const REFRESH_RATE : number = 900; // 15 minutes

export class App extends React.Component<Props, State> {
	
	private intervalId: any;
	
	private currentPrice: number;
	
	private difference: number;
	
	private getBitcoinPrice(){
		let thisScope = this;
		fetch('https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD')
			.then(function(response) {
				return response.json();
			}).then(function(json) {
				thisScope.currentPrice = json.last;
				thisScope.difference = json.changes.price.day;
			}).catch(function(ex){
				console.log("Error");
				console.log(ex);
			});
			thisScope.setState({progress: 100, seconds: REFRESH_RATE});
	}
	
	constructor(props: any){
        super(props);
		this.state = { 
			progress: 100,
			intervalId: 0,
			seconds: 0,
        };
		
		this.currentPrice = 0;
		this.difference = 0;
		
		this.timer = this.timer.bind(this);
    }
	
	public componentDidMount() {
		let intervalId = setInterval(this.timer, 1000);
		this.setState({intervalId: intervalId});
		this.getBitcoinPrice();
	}

	public componentWillUnmount() {
		clearInterval(this.state.intervalId);
	}

	public timer() : void {
		if(this.state.progress == 0){
			this.getBitcoinPrice();
		} else {
			this.setState({progress: Math.round((this.state.seconds / REFRESH_RATE) * 100), seconds: this.state.seconds - 1 });
		}
	}
		
	public render(){
		return (
			<div className="centered widget">
				<span className="title">Bitcoin Price</span>
				<BitcoinPrice value={this.currentPrice} difference={this.difference} />
				<Line percent={this.state.progress} strokeWidth="4" strokeColor="#ccc" />
			</div>
		);
	}
}