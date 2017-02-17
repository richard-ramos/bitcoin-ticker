import * as React from "react";

export interface BitcoinPriceProperties {
	value: number;
	difference: number;
}

export class BitcoinPrice extends React.Component<BitcoinPriceProperties, undefined> {
	render(){
		let symbol = '-';
		if (this.props.difference > 0){
			symbol = '+';
		}
		
		return 	<div>
					<b>${this.props.value.toFixed(2)}</b> 
					<span>({symbol}${Math.abs(this.props.difference).toFixed(2)})</span>
			    </div> 
		
	}
}