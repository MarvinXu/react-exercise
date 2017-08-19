import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import data from './mock';
console.log(data)
class TreeNode extends React.Component {
  render() {
    const childNode = this.props.hasChild ?
      <div className="tree-node__children">
        {this.props.data.children.map(d =>
          <TreeNode key={d.id} data={d} />
        )}
      </div> :
      null;
    return (
      <div className="tree-node">
        <div className="tree-node__content">{this.props.data.label}</div>
        {childNode}
      </div>
    );
  }
}

class Tree extends React.Component {

  render() {
    const nodes = this.props.data.map(d =>
      <TreeNode key={d.id} data={d} hasChild={!!d.children.length}/>
    );
    return (
      <div className="tree">
        {nodes}
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Tree data={data}/>,
  document.getElementById('root')
);
