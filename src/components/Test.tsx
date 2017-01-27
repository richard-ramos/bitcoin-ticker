import * as React from "react";

export interface TestProps { attrib: string; }

export const Test = (props: TestProps) => <h1>Test: {props.attrib}</h1>;

