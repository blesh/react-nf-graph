import React, { Component, PropTypes } from 'react';
import getMousePoint from '../util/getMousePoint';
import nearestIndexTo from '../util/nearestIndexTo';

export default class NfTracker extends Component {
  static contextTypes = {
    scaleX: PropTypes.func.isRequired,
    scaleY: PropTypes.func.isRequired,
    graph: PropTypes.object.isRequired
  }

  static defaultProps = {
    behavior: 'hover',
    show: true
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      x: 0,
      y: 0
    };
  }

  'snap-last'() {
    const { data } = this.props;
    if(data) {
      this.snapToItem(data[data.length - 1]);
    }
  }

  'hover'() {
    this.setState({ x: 0, y: 0, visible: false });
  }

  'snap-first'() {
    const { data } = this.props;
    if(data) {
      this.snapToItem(data[0]);
    }
  }

  snapToItem(item) {
    const { scaleX, scaleY } = this.context;

    this.setState({ 
      visible: true,
      x: scaleX(item.x),  
      y: scaleY(item.y)
    });
  }

  componentDidMount() {
    const graph = this.context.graph;

    this._mouseMoveHandler = (e) => {
      const { data } = this.props;
      if(data) {
        const { x, y } = getMousePoint(e.currentTarget, e);
        const { scaleX, scaleY } = this.context;
        const i = nearestIndexTo(data, scaleX.invert(x), selectX);
        const item = data[i];

        this.setState({ 
          x: scaleX(item.x),  
          y: scaleY(item.y),
          visible: true
        });
      }
    };

    this._mouseOutHandler = () => {
      this[this.props.behavior]();
    };

    graph.on('contentMouseOut', this._mouseOutHandler);
    graph.on('contentMouseMove', this._mouseMoveHandler);
  }

  componentWillUnmount() {
    graph.off('contentMouseOut', this._mouseOutHandler);
    graph.off('contentMouseMove', this._mouseMoveHandler);
  }

  render() {
    const { 
      props: { show }, 
      state: { visible, x, y } 
    } = this;

    if(show && visible) {
      const translate = `translate(${x},${y})`;
      return (<g className="nf-tracker" transform={translate}><circle r="2" /></g>);
    }
    return <g className="nf-tracker-hidden"/>
  }
}

function selectX(p) {
  return p.x;
}


  /*
  The following was typed by a 7 month old:
  >>?
,.,l.mm;
;;;p÷;.plo9o-[l,lkkll
*/