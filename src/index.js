import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import data from './mock';
console.log(data)
class TreeNodeContent extends React.Component {
  static defaultProps = {
    checkState: 'unchecked'
  }

  render() {
    const {data, count, checkState} = this.props;
    const checkbox = <span className={'iconfont icon-checkbox-' + checkState}></span>;
    return (
      <div
        className="tree-node__content"
        onClick={() => this.props.onClick(data.id)}>
        {checkbox}
        {data.label}
        {count}
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

  render() {
    const {data} = this.props;
    const {checkStates} = this.state;

    const clickHandler = (id) => {
      let {checkStates} = this.state;
      const node = getNodeById(id, data);
      const currentCheckState = checkStates[id] === 'checked' ? 'unchecked' : 'checked';
      checkStates[id] = currentCheckState;
      if (node.children) {
        node.children.forEach(child => {
          checkStates[child.id] = currentCheckState;
        })
      } else {
        const parentNode = findParentNode(id, data);
        const isAllChecked = parentNode.children.every(child => checkStates[child.id] === 'checked');
        const isSomeChecked = parentNode.children.some(child => checkStates[child.id] === 'checked');
        if (isAllChecked) {
          checkStates[parentNode.id] = 'checked';
        } else if (isSomeChecked) {
          checkStates[parentNode.id] = 'indeterminate';
        } else {
          checkStates[parentNode.id] = 'unchecked';
        }
      }
      this.setState({
        checkStates: checkStates
      })
    };

    const renderTreeNode = () => {
      return data.map(parent => {
        let count = 0;
        parent.children.forEach(child => {
          count += child.count;
        });
        return (
          <div className="tree-node" key={parent.id}>
            <TreeNodeContent
              data={parent}
              count={count}
              checkState={checkStates[parent.id]}
              onClick={clickHandler}/>
            <div className="tree-node__children">
              {parent.children.map(child => {
                return (
                  <TreeNodeContent
                    key={child.id}
                    data={child}
                    count={child.count}
                    checkState={checkStates[child.id]}
                    onClick={clickHandler}/>
                )
              })}
            </div>
          </div>
        );
      });
    };

    return (
      <div className="tree">
        {renderTreeNode()}
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Tree data={data}/>,
  document.getElementById('root')
);

function getNodeById(id, data) {
  for(let i = 0; i < data.length; i ++) {
    if (data[i].id === id) {
      return data[i];
    }
    const findChild = data[i].children.find(child => child.id === id);
    if (findChild) {
      return findChild;
    }
  }
}

function findParentNode(id, data) {
  for(let i = 0; i < data.length; i ++) {
    const foundChild = data[i].children.some(child => child.id === id);
    if (foundChild) {
      return data[i];
    }
  }
  return;
}