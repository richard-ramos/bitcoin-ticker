

declare module "rc-progress" {
		import * as React from 'react';
		
		export interface LineProps {
			percent: string | number;
			strokeWidth: string | number;
			strokeColor: string;
		}
	
	    export class Line extends React.Component<LineProps, any> {
			
		}
		
}