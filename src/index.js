import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import data from './mock';
console.log(data)
class TreeNode extends React.Component {
  static defaultProps = {
    checkState: 'unchecked'
  }
  hasChildren () {
    const {data} = this.props;
    return data.children && data.children.length > 0
  }
  renderChildren() {
    const childNode = this.hasChildren() ?
      <div className="tree-node__children">
        {this.props.data.children.map(d =>
          <TreeNode key={d.id} data={d} />
        )}
      </div> :
      null;
    return childNode;
  }
  renderCheckbox() {
    return <span className={'iconfont icon-checkbox-' + this.props.checkState}></span>
  }
  getCount() {
    if (this.hasChildren()) {
      let count = 0;
      this.props.data.children.forEach(d => {
        count += d.count
      });
      return count;
    }
    return this.props.data.count;
  }
  render() {
    return (
      <div className="tree-node">
        <div className="tree-node__content">
          {this.renderCheckbox()}
          {this.props.data.label}
          {this.getCount()}
        </div>
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
