"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradingCard = TradingCard;
const React = __importStar(require("react"));
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const input_1 = require("@/components/ui/input");
const label_1 = require("@/components/ui/label");
function TradingCard() {
    const [isclicked, setClicked] = (0, react_1.useState)(false);
    return (<div className="cardcontainer">
    <card_1.Card className="w-[350px]">
      <card_1.CardHeader>
        <card_1.CardTitle>Trade Coins</card_1.CardTitle>
        <card_1.CardDescription>Enter your Wallet secret</card_1.CardDescription>
      </card_1.CardHeader>
      <card_1.CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <label_1.Label htmlFor="name">Secret Key</label_1.Label>
              <input_1.Input id="secret" placeholder="Enter Secret Key"/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <label_1.Label htmlFor="framework">Wallet Address</label_1.Label>
              <input_1.Input id="address" placeholder="Enter Wallet Address"/>

            </div>
          </div>
        </form>
      </card_1.CardContent>
      <card_1.CardFooter className="flex justify-between">
        <button_1.Button variant="outline">Cancel</button_1.Button>

        <button_1.Button>Submit</button_1.Button>


      </card_1.CardFooter>
    </card_1.Card>
    </div>);
}
