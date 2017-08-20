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
          this.props.renderTreeNode(d)
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
          {this.props.data.id}
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
  constructor() {
    super();
    this.state = {
      checkStates: {}
    };
  }
  // componentWillMount() {
  //   console.log('~~~~~~~~~~', this.props);
  //   let {checkStates} = this.state;
  //   this.props.data.forEach(d => {
  //     Object.assign(checkStates, {
  //       [d.id]: 'unchecked'
  //     })
  //   })
  //   this.setState({
  //     checkStates: checkStates
  //   })
  // }
  renderTreeNode(data) {
    let me = this;
    console.log(me.state)
    // const checkState = checkStates[data.id];
    return <TreeNode key={data.id}
                     data={data}
                     // checkState={checkState}
                     renderTreeNode={this.renderTreeNode}/>
  }
  render() {
    const treeNodes = this.props.data.map(d =>
      this.renderTreeNode(d)
    );
    return (
      <div className="tree">
        {treeNodes}
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Tree data={data}/>,
  document.getElementById('root')
);
