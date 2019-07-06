import * as React from "react";
import {createRef} from 'react';

import {d3Drag} from '../UIinteractions';
import {createInputs, createOutput} from './NodeParts/NodeHelpers';
import {initNodeState, EditorState} from '../EditorStates';


import Node from './NodeParts/Node';
import Title from './NodeParts/Title';
import NodeProps from './NodeParts/NodeProps';
import ASTNode from './NodeParts/ASTNode';

class AddNode extends React.Component<NodeProps> {
    uuid: string;
    title: string;
    dragTarget: HTMLDivElement;
    handle : React.Ref<HTMLDivElement>;
    inpRefs: React.Ref<HTMLDivElement>[];
    outRef : React.Ref<HTMLDivElement>;
    input  : JSX.Element[];
    output : JSX.Element;
    ASTNode: ASTNode;
    
    constructor(props){
        super(props);
        //initialize UI elements
        this.uuid = props.uuid;
        this.handle = createRef();
        let structure = {
            title: "Add",
            inputs: [
                'Number 1',
                'Number 2'
            ],
            output: 'Sum'
        };
        this.title = structure.title;
        createInputs.bind(this)(structure);
        createOutput.bind(this)(structure);
        //initialize AST elements
        let inputs:Array<ASTNode> = new Array<ASTNode>(2);
        inputs[0] = new ASTNode(null, ()=>0);
        inputs[1] = inputs[0];
        this.ASTNode = new ASTNode(inputs, function(){
            return inputs[0].resolve() + inputs[1].resolve();
        });
        EditorState.ASTRoot = this.ASTNode;
        console.log(this.ASTNode.resolve());
    }
    componentDidMount(){
        d3Drag.bind(this)();
        initNodeState.bind(this)();
        this.dragTarget.addEventListener('contextmenu',(e)=>{
            e.stopPropagation();
            e.preventDefault();
        });
        
    }
    render(){
        return (
            <Node width={170} ref={dragTarget => this.dragTarget = dragTarget} style={{ top: `${this.props.top}px`, left:  `${this.props.left}px` }}>
                <Title ref={this.handle} title={this.title}/>
                
                <div className="connections">
                    <div className="inputs">
                        {this.input}
                    </div>
                    <div className="vr"></div>
                    <div className="outputs">
                        {this.output}
                    </div>
                </div>
            </Node>
        );
    }
}

export default AddNode;