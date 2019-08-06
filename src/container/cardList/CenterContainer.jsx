import React from "react";
import {
  CardImg,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
} from "reactstrap";
import classnames from "classnames";

import 探検同盟 from "../../asset/img/探検同盟.png";
import CardList from "./CardList";

export default class CenterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      hero: [
        "ドルイド",
        "ハンター",
        "メイジ",
        "パラディン",
        "プリースト",
        "ローグ",
        "シャーマン",
        "ウォーロック",
        "ウォリアー",
        "中立"
      ]
    };

    this.toggle = this.toggle.bind(this);
  }

  /**
   * TabToggleのためのイベントハンドラ
   * @param {*} tab
   */

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const header_style = {
      backgroundColor: "#00075d"
    };

    return (
      <React.Fragment>
        <div className="bg-white border 2px shadow-sm">
          <h3 style={header_style} className="text-white py-2 pl-3 mb-0">
            Card List
          </h3>
          <CardImg top width="100%" src={探検同盟} alt="Card logo" />
          <Nav tabs className="pl-3 mt-3">
            {this.state.hero.map((hero, index) => {
              return (
                <NavItem key={index}>
                  <NavLink
                    key={index}
                    className={classnames({
                      active: this.state.activeTab === index
                    })}
                    onClick={() => {
                      this.toggle(index);
                    }}
                  >
                    {hero}
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            {this.state.hero.map((hero, index) => {
              return (
                <TabPane tabId={index} key={index}>
                  <Row className="mx-0" key={index}>
                    <CardList hero={hero} key={index} />
                  </Row>
                </TabPane>
              );
            })}
          </TabContent>
        </div>
      </React.Fragment>
    );
  }
}
