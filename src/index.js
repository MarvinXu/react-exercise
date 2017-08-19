import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import data from './mock';
console.log(data)
class TreeNode extends React.Component {
  renderChildren() {
    const {data} = this.props;
    const hasChildren = data.children && data.children.length > 0
    const childNode = hasChildren ?
      <div className="tree-node__children">
        {data.children.map(d =>
          <TreeNode key={d.id} data={d} />
        )}
      </div> :
      null;
    return childNode;
  }
  render() {

    return (
      <div className="tree-node">
        <div className="tree-node__content">{this.props.data.label}</div>
        {this.renderChildren()}
      </div>
    );
  }
}

class Tree extends React.Component {

  render() {
    const nodes = this.props.data.map(d =>
      <TreeNode key={d.id} data={d}/>
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
