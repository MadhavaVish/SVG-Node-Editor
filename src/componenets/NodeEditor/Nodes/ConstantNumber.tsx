import * as React from "react";
import {createRef} from 'react';
import * as uuidv4 from 'uuid/v4';

import {d3Drag} from '../UIinteractions';
import {createOutputWithRange} from './NodeParts/NodeHelpers';
import {initNodeState} from '../EditorStates';


import Node from './NodeParts/Node';
import Title from './NodeParts/Title';
import NodeProps from './NodeParts/NodeProps';
import ASTNode from './NodeParts/ASTNode';

class ConstantNumber extends React.Component<NodeProps> {
    uuid: string;
    title: string;
    dragTarget: HTMLDivElement;
    handle : React.Ref<HTMLDivElement>;
    outRef : React.Ref<HTMLDivElement>;
    output : JSX.Element;
    ASTNode: ASTNode;
    constructor(props){
        super(props);
        this.uuid = props.uuid;
        this.handle = createRef();
        let structure = {
            title: "Number",
            output: 'Number'
        };
        this.title = structure.title;
        let inputs:Array<ASTNode> = new Array<ASTNode>(3);
        this.ASTNode = new ASTNode(inputs, function(){
            console.log("yayeet");
        });
        createOutputWithRange.bind(this)(structure);
    }
    shouldComponentUpdate(){return false};
    componentDidMount(){
        d3Drag.bind(this)();
        initNodeState.bind(this)();
        
        this.dragTarget.addEventListener('contextmenu',(e)=>{
            e.stopPropagation();
        })
    }
    render(){
        return (
            <Node width={200} singular ref={dragTarget => this.dragTarget = dragTarget} style={{ top: `${this.props.top}px`, left:  `${this.props.left}px` }}>
                <Title ref={this.handle} title={this.title}/>
                
                <div className="connections">
                    <div className="outputs">
                        {this.output}
                    </div>
                </div>
            </Node>
        );
    }
}

export default ConstantNumber;