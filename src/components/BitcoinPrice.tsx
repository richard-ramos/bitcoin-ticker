import * as React from "react";

export interface BitcoinPriceProperties {
	value: number;
}

export class BitcoinPrice extends React.Component<BitcoinPriceProperties, undefined> {
	render(){
		return <b>{this.props.value}</b>;
	}
}