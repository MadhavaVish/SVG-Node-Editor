/**
 * Heavily simplified Abstract syntax tree representation. Rather than parsing using a grammar it is constructed dynamically when nodes are added and connected.
 * A major limiataion of this is that it can't be parsed to generate new code, but is rather just a functional wrapper to be executed.
 */
export default class ASTNode{
    public resolve: Function; //function to execute subtree associated with this node. TODO: create a version where if any child nodes have not changed its retun value is cached preventing recalculation.
    private inputs: ASTNode[]; //inputs each of which can be 'resolved' to be used by 'this' nodes resolve function.
    private errors: Boolean[];  //error flags to be used for unintended connection types, or errors that cannot be caught at a UI level e.g. cyclic connections. TODO: implement UI interaction for error states.
    constructor(inputs:ASTNode[],resolveFunc: Function){
        this.setInputs(inputs);
        this.resolve = resolveFunc;
        this.errors = [];
        for(let i = 0; i < this.inputs.length; i++){
            this.errors[i] = false;
        };
    }
    //set all inputs at once, generally used for initialization purposes only.
    private setInputs(inputs: ASTNode[]):void{
        if(inputs == null) throw new TypeError("Should Not be null");
        this.inputs = inputs;
    }
    //For the case where a node is dynamic and offers several types of functionality, e.g. a math node that lets users pick between add and subtract.
    setResolveFunction(resolveFunc: Function):void{
        this.resolve = resolveFunc;
    }
    setErrorFlag(index: number):void{
        this.errors[index] = true;
    }
    clearErrorFlag(index: number):void{
        this.errors[index] = false;
    }
    getInputs(): Array<ASTNode> {
        return this.inputs;
    }
    getErrors(): Array<Boolean> {
        return this.errors;
    }
}