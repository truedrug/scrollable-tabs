import React, {Component, createRef} from 'react';
import './tab.css';
import DeleteIcon from '../../icons/delete.png';

export default class Tab extends Component {
  state = {
    showIcon: false,
  };

  tabRef = createRef();

  onDeleteButtonPress = (event) => {
    event.stopPropagation();
    this.props.onDelete();
  };

  showDeleteIcon = () => {
    if (!this.props.hideDeleteIcon) {
      this.setState({
        showIcon: true,
      });
    }
  };

  hideDeleteIcon = () => {
    this.setState({
      showIcon: false,
    });
  };

  render() {
    const deleteBtn = (
      <span className="delete-icon" onClick={this.onDeleteButtonPress}>
        <img src={DeleteIcon} alt="Delete" />
      </span>
    );

    return (
      <div
        className="tab"
        onClick={this.props.onSelect}
        onMouseEnter={this.showDeleteIcon}
        onMouseLeave={this.hideDeleteIcon}
        ref={this.tabRef}
        style={{
          borderBottom: this.props.highlightTab ? '3px solid #34ace0' : '',
          fontWeight: this.props.highlightTab ? 'bold' : 350,
        }}>
        Tab{this.props.num}
        {this.state.showIcon ? deleteBtn : null}
      </div>
    );
  }
}
