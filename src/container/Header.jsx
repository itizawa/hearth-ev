import React from "react";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.onLoginHandler = this.onLoginHandler.bind(this);
  }

  /**
   * モーダル開閉のためのイベントハンドラ
   */

  toggle() {
    this.setState((prevState) => ({
      modal: !prevState.modal
    }));
  }

  /**
   * ログインイベントハンドラ
   */

  onLoginHandler() {
    console.log("login");
    this.toggle();
  }

  render() {
    const navbar_style = {
      backgroundColor: "#00075d"
    };

    const text_style = {
      color: "white"
    };

    const scrol_style = {
      height: "200px"
    };

    return (
      <div>
        <Navbar className="fixed-top" style={navbar_style} expand="md">
          <NavbarBrand href="/" style={text_style}>
            Hearth EV
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Button
                onClick={this.toggle}
                className="bg-primary border border-white rounded-pill py-1 px-5"
                style={text_style}
              >
                Login
              </Button>
            </NavItem>
          </Nav>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>Twitterログイン</ModalHeader>
            <ModalBody>
              下記の利用規約に同意したものとみなします
              <div className="overflow-auto mt-2" style={scrol_style}>
                <h2 className="my-3 ml-3">利用規約</h2>
                <div className="w-75 mx-auto">
                  <h3>第1条(はじめに)</h3>
                  <ol>
                    <li>
                      HearthEV
                      運営チーム(以下「運営チーム」といいます。)が提供する「事前評価専門SNS
                      Hearth EV」は、Hearth
                      Stoneプレイヤーが気持ちよく心から喜んでいただけるサービスを目指しています。以下の通り利用規約を定めますので、利用の際は「サービス利用規約」(以下「本規約」といいます。)にご同意されたものとみなします。
                    </li>
                    <li>
                      本規約は、運営チームが提供する「事前評価専門SNS Hearth
                      EV」(以下「本サービス」といいます。)の利用に関する条件を、本サービスを利用するお客様(以下「ユーザー」といいます。)と運営チームとの間で定めるものです。
                    </li>
                    <li>
                      利用者は本規約に同意の上、本サービスを利用するものとします。運営チームは本規約を、ユーザーへの予告なしに改定できるものとします。本規約の変更については、過去の規約に優先して適用されるものとし、本サービスに掲載をもって発効するものとします。
                    </li>
                  </ol>
                  <h3>第2条(プライバシーポリシー)</h3>
                  <p className="text-justify">
                    運営チームのプライバシーポリシーは、本サービスをご使用いただく際に運営チームに提供された情報が、どのように取り扱われるかについて説明しています。ユーザーは、本サービスを利用することによって、運営チームおよびその関係者がこれら情報を保管、処理、使用するために、これら情報の収集および使用（プライバシーポリシーの定めに従って）に同意することを理解しているものとします。
                  </p>
                  <ol>
                    <li>
                      公開されたHearth
                      EVの投票情報の閲覧は、アカウントを作成することなく利用できます。ユーザーがアカウントを作成する場合には、本サービスがユーザーにサービスを提供できるように、一定の個人情報を提供する必要があります。それらの個人情報には、HearthEV
                      のユーザー名、メールアドレスまたは電話番号が含まれます。ユーザー名は常に公開されますが、実名または仮名のいずれも使用することができます。ユーザーは、例えば、異なる自分を表現するために、複数のHearthEVアカウントを管理することもできます。{" "}
                    </li>
                    <li>
                      本サービスは、ユーザーのメールアドレスや電話番号などの連絡先情報を、ユーザーのアカウントを認証し、ユーザーのアカウントと本サービスを安全に保護し、スパム、詐欺行為および不正使用を防ぐために使用します。
                    </li>
                  </ol>
                  <h3>第3条(本サービス上のコンテンツ)</h3>
                  <p>
                    　ユーザーは、適用される法令や規則への遵守を含め、本サービスの利用および自身が提供するコンテンツに対して責任を負います。提供されるコンテンツは、他の人たちと共有して差し支えのないものに限定してください。
                  </p>
                  <ol>
                    <li>
                      本サービスを介して投稿されたまたは本サービスを通じて取得したコンテンツやマテリアルの使用またはこれらへの依拠は、ユーザーの自己責任において行ってください。当社は、本サービスを介して投稿されたいかなるコンテンツや通信内容についても、その完全性、真実性、正確性、もしくは信頼性を是認、支持、表明もしくは保証せず、また本サービスを介して表示されるいかなる意見についても、それらを是認するものではありません。利用者は、本サービスの利用により、不快、有害、不正確あるいは不適切なコンテンツ、または場合によっては、不当表示されている投稿またはその他欺瞞的な投稿に接する可能性があることを、理解しているものとします。すべてのコンテンツは、そのコンテンツの作成者が単独で責任を負うものとします。運営チームは、本サービスを介して投稿されるコンテンツを監視または管理することはできず、また、そのようなコンテンツについて責任を負うこともできません。
                    </li>
                    <li>
                      運営チームは、ユーザー利用規約違反しているコンテンツ（著作権もしくは商標の侵害、なりすまし、不法行為または嫌がらせ等）を削除する権利を留保します。
                    </li>
                  </ol>
                  <h3>第4条(本サービスの利用)</h3>
                  <p>
                    　本サービスは、運営チーム独自の判断により適宜変更されることがあります。運営チームは、本サービスまたは本サービス内の機能をユーザーまたは利用者全般に提供することを（永久的または一時的に）中止することがあります。運営チームはまた、いつでも、独自判断により、使用と保存に制限を設ける権利を留保します。運営チームはまた、ユーザーに責任を負うことなく、本サービス上のコンテンツの削除または配信の拒否、利用者の資格停止または終了、および利用者名の返還を要求することができるものとします。
                  </p>
                  <h3>第5条(本規約の終了)</h3>
                  <p>
                    ユーザーは、いつでもアカウントを削除し本サービスの利用を中止することにより、運営チームとの利用規約を終了することができます。
                    　運営チームは、(i)ユーザーが本規約に違反している、(ii)ユーザーが運営チームにリスクまたは法的責任の可能性をもたらす、(iii)不法行為によりユーザーのアカウントの削除が必要となった、(iv)ユーザーの長期的不活動によりアカウントの削除が必要となった、または(v)運営チームによるユーザーへの本サービスの提供が商業的に困難となった（ただし、これらに限定されません）と、運営チームが合理的に確信した場合、理由の如何を問わず、または理由なく、いつでもユーザーのアカウントを一時停止もしくは削除するか、本サービスの全部または一部の提供を終了することができます。
                  </p>
                  <h3>第6条(一般条件)</h3>
                  <p>
                    　本規約は、随時改定される場合があります。改定は溯って適用されることはありません。また、ユーザーと当社の関係を定めた本規約の最新版は常に
                    https://card-ev.firebaseapp.com/Terms
                    でご覧になることができます。ユーザーは、本規約への改定が有効となって以降に本サービスへのアクセスまたは本サービスの利用を継続することによって、改定後の本規約に拘束されることに同意したものとみなされます。
                  </p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={this.onLoginHandler}
              >
                ログインする
              </Button>{" "}
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </Navbar>
      </div>
    );
  }
}
