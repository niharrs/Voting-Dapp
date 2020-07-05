import DappLib from "@trycrypto/dappstarter-dapplib";
import DOM from "../../lib/components/shared/dom";
import "../../lib/components/shared/action-card.js";
import "../../lib/components/widgets/number-widget.js";
import "../../lib/components/widgets/text-widget.js";
import ActionButton from "../../lib/components/shared/action-button";
import kitty from "../assets/img/kitty.png";
import doggo from "../assets/img/doggo.png";
import { LitElement, html, customElement, property } from "lit-element";
@customElement("dapp-page")
export default class DappPage extends LitElement {
  @property()
  get;
  @property()
  post;
  @property()
  title;
  @property()
  category;
  @property()
  description;

  createRenderRoot() {
    return this;
  }
  constructor(args) {
    super(args);
    this.counter = 0;
    this.fetchAndDisplayCounter();
    this.getCandidates();  
    let result = DappLib.getCandidates();
    console.log(result);
  }

  handleClick = e => {
    DOM.el("top-navigation").handleClick(e);
  };

  buttonClick = async e => {
    let info = e.detail;
    if (info.type === DappLib.DAPP_RESULT_ERROR) {
      DOM.elid("result").innerHTML =
        '<span class="text-danger">' + info.result + "</span>";
    } else {
      setTimeout(() => this.fetchAndDisplayCounter(), 500);
    }
  };

  getCandidates = async e => {
    let result = await DappLib.getCandidates();
    let resultHtml = "";
    result.forEach((item, index) => {
      resultHtml += `
        <tr>
          <td class="border px-4 py-2">${index}</td>
          <td class="border px-4 py-2">${item.name}</td>
          <td class="border px-4 py-2">${item.voteCount}</td>
        </tr>
      `;
    });
    DOM.elid("candidate-lookup").innerHTML = resultHtml;
  };

  showResults = async e => {
    DOM.elid("get-candidates").click();
    DOM.elid("tally").classList.remove("hidden");
    let result = await DappLib.getCandidates();
    console.table(result);
  }

  render() {
    let content = html`
      <div class="container m-auto">
        <div class="row fadeIn mt-3 p-2 block">
          <div class="float-right">
            <!-- <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="100"
              height="110"
              class="ml-6"
            > -->
              <defs>
                <style>
                  .cls-1 {
                    fill: url(#linear-gradient);
                  }
                </style>
                <linearGradient
                  id="linear-gradient"
                  y1="51.36"
                  x2="92.72"
                  y2="51.36"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stop-color="#00c6f6" />
                  <stop offset="1" stop-color="#9be276" />
                </linearGradient>
              </defs>
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path
                    class="cls-1"
                    d="M47.19,102.72a11.06,11.06,0,0,0,4.71-1.42L87.18,81.13a11.08,11.08,0,0,0,5.54-9.58h0V31.23a11,11,0,0,0-1.37-5.3,1,1,0,0,0-.12-.45,1.12,1.12,0,0,0-.37-.35,11,11,0,0,0-3.68-3.49L51.9,1.48a11.13,11.13,0,0,0-11.08,0L5.54,21.64a11,11,0,0,0-3.67,3.49,1,1,0,0,0-.37.35.93.93,0,0,0-.13.45A11.12,11.12,0,0,0,0,31.23V71.55a11.13,11.13,0,0,0,5.54,9.59l35.28,20.15a10.94,10.94,0,0,0,4.72,1.43m-39-79.35L41.82,3.21a9.12,9.12,0,0,1,9.08,0L86.18,23.37a9,9,0,0,1,2.66,2.34L46.36,50.28,3.88,25.71A9.09,9.09,0,0,1,6.54,23.37Zm0,56A9.08,9.08,0,0,1,2,71.55V31.23a8.92,8.92,0,0,1,.86-3.8L45.36,52v48.7a9.05,9.05,0,0,1-3.54-1.15Zm84.18-7.85h0a9.09,9.09,0,0,1-4.53,7.85L50.9,99.56a8.89,8.89,0,0,1-3.54,1.15V52l42.5-24.58a8.92,8.92,0,0,1,.86,3.8Z"
                  />
                </g>
              </g>
            </svg>
          </div>
          <h2 class="text-4xl">🎉 Voting App!</h2>
        </div>

        <div class="flex flex-wrap mb-4">
          <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4">
            <div class="max-w-sm rounded overflow-hidden shadow-lg m-4 h-full">
              <img class="w-full" src="${kitty}" alt="Miss Kitty">
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">Miss Kitty </div>
                <p class="text-gray-700 text-base h-20">
                  Choose me as your next board member. Purr.
                </p>
              </div>
              <div class="px-6 py-4">
                <div id="kitty-form" class="text-center">
                  <input 
                    type="hidden"
                    data-field="candidateId"
                    value="0"
                  >
                  <action-button
                    source="#kitty-form"
                    action="vote"
                    method="post"
                    fields="candidateId"
                    text="Vote for Kitty"
                    class="mt-4"
                    .click=${this.showResults}
                  >
                  </action-button>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4">
            <div class="max-w-sm rounded overflow-hidden shadow-lg m-4 h-full">
              <img class="w-full" src="${doggo}" alt="Mr Doggo">
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">Mr Doggo </div>
                <p class="text-gray-700 text-base h-20">
                  If you choose me, we'll be ruff!
                </p>
              </div>
              <div class="px-6 py-4">
                <div id="doggo-form" class="text-center">
                  <input 
                    type="hidden"
                    data-field="candidateId"
                    value="1"
                  >
                  <action-button
                    source="#doggo-form"
                    action="vote"
                    method="post"
                    fields="candidateId"
                    text="Vote for Doggo"
                    class="mt-4"
                    .click=${this.showResults}
                  >
                  </action-button>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="tally" class="w-1/4 h-12 hidden">
          <action-button
            hidden="true"
            id="get-candidates"
            source="vote"
            title="Get Candidates"
            description="Fetch all candidates"
            action="getCandidates"
            method="get"
            fields=""
            text="View Tally"
            .click=${this.getCandidates}
          >
          </action-button>

          <div class="mt-4 rounded p-3">
            <table class="table-auto">
              <thead>
                <th class="px-4 py-2">Candidate ID</th>
                <th class="px-4 py-2">Candidate</th>
                <th class="px-4 py-2">Vote Count</th>
              </thead>
              <tbody id="candidate-lookup">
              </tbody>
            </table>
          </div>
        </div>
    `;
    return content;

    // Handle increment counter click
  }

  async fetchAndDisplayCounter() {
    let result = await DappLib["getStateCounter"].call();
    this.counter = result.callData;
    await this.requestUpdate();
    // DOM.elid("counter").innerHTML = result.callData;
  }
}
