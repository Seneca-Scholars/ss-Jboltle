"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArbBot = exports.SwapToken = void 0;
var web3_js_1 = require("@solana/web3.js");
var api_1 = require("@jup-ag/api");
var spl_token_1 = require("@solana/spl-token");
var fs = require("fs");
var path = require("path");
var axios_1 = require("axios");
var prompt = require("prompt-sync");
var getTokenInput = function () {
    // //this is a public method
    //  (like used in AP Comp Sci in HighSchool   
    //     that gets user input then returns that 
    //     value into a parameter for the bot in
    //      the infterface )
    var input = prompt();
    var token = input("✅Please enter a valid token✅");
    if (!token || token == null || token.length !== 44) {
        console.log(Error, "Invalid token ❌");
        throw new Error;
    }
    return token;
};
var tokenValue = getTokenInput(); // This gets the user input
var SwapToken;
(function (SwapToken) {
    SwapToken[SwapToken["SOL"] = 0] = "SOL";
    SwapToken[SwapToken["USDC"] = 1] = "USDC";
})(SwapToken || (exports.SwapToken = SwapToken = {}));
var ArbBot = /** @class */ (function () {
    function ArbBot(config) {
        var _this = this;
        this.inputMint = new web3_js_1.PublicKey(tokenValue);
        //takes in a string value that the token input provides. 
        // this the input mint that you want to use, so you can choose any crypto 
        // currency with respect to what is insiede the Jupiter
        //  Tokens json file that contains all valid tokens on  the Jupiter dex.
        this.solMint = new web3_js_1.PublicKey("So11111111111111111111111111111111111111112");
        this.solBalance = 0;
        this.usdcBalance = 0;
        this.checkInterval = 1000 * 10;
        this.lastCheck = 0;
        this.targetGainPercentage = 1;
        this.waitingForConfirmation = false;
        this.tokenLookup = function (inputToken) { return __awaiter(_this, void 0, void 0, function () {
            var tokensPath, tokenExists, data, tokens, tokenList, config, response, tokens_1, tokenList_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tokensPath = "./JupiterTokens.json";
                        tokenExists = false;
                        if (!fs.existsSync(tokensPath)) return [3 /*break*/, 6];
                        data = fs.readFileSync(tokensPath, 'utf8');
                        tokens = JSON.parse(data);
                        tokenList = new Set(tokens);
                        console.log(tokenList);
                        if (tokenList.has(inputToken)) {
                            console.log("Token found locally and approved ✅");
                            tokenExists = true;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!!tokenExists) return [3 /*break*/, 4];
                        config = {
                            method: 'get',
                            maxBodyLength: Infinity,
                            url: 'https://quote-api.jup.ag/v6/tokens',
                            headers: {
                                'Accept': 'application/json'
                            }
                        };
                        return [4 /*yield*/, axios_1.default.request(config)];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.data];
                    case 3:
                        tokens_1 = _a.sent();
                        // Cache the tokens locally if the file does not exist
                        if (!fs.existsSync(tokensPath)) {
                            fs.writeFileSync(tokensPath, JSON.stringify(tokens_1));
                        }
                        tokenList_1 = new Set(tokens_1.map(function (token) { return token.address; }));
                        if (tokenList_1.has(inputToken)) {
                            console.log("Token approved with Jupiter API ✅");
                        }
                        else {
                            throw new Error("Token does not exist on Jupiter DEX");
                        }
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        throw new Error("Failed to fetch tokens from API");
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        var solanaEndpoint = config.solanaEndpoint, metisEndpoint = config.metisEndpoint, secretKey = config.secretKey, targetGainPercentage = config.targetGainPercentage, checkInterval = config.checkInterval, initialInputToken = config.initialInputToken, initialInputAmount = config.initialInputAmount, firstTradePrice = config.firstTradePrice;
        this.usdcBalance;
        this.solanaConnection = new web3_js_1.Connection(solanaEndpoint);
        this.jupiterApi = (0, api_1.createJupiterApiClient)({ basePath: metisEndpoint });
        this.wallet = web3_js_1.Keypair.fromSecretKey(secretKey);
        this.usdcTokenAccount = (0, spl_token_1.getAssociatedTokenAddressSync)(this.inputMint, this.wallet.publicKey);
        if (targetGainPercentage) {
            this.targetGainPercentage = targetGainPercentage;
        }
        if (checkInterval) {
            this.checkInterval = checkInterval;
        }
        this.nextTrade = {
            inputMint: initialInputToken === SwapToken.SOL ? this.solMint.toBase58() : this.inputMint.toBase58(),
            outputMint: initialInputToken === SwapToken.SOL ? this.inputMint.toBase58() : this.solMint.toBase58(),
            amount: initialInputAmount,
            nextTradeThreshold: firstTradePrice,
        };
    }
    ArbBot.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("\uD83E\uDD16 Initiating arb bot for wallet: ".concat(this.wallet.publicKey.toBase58(), "."));
                        return [4 /*yield*/, this.refreshBalances()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.tokenLookup(tokenValue)];
                    case 2:
                        _a.sent();
                        console.log(this.solBalance);
                        if (this.solBalance === 0 || undefined) {
                            throw new Error("Cannot find Solana in given wallet");
                        }
                        console.log("\uD83C\uDFE6 Current balances:\nSOL: ".concat(this.solBalance / web3_js_1.LAMPORTS_PER_SOL, ",\nUSDC: ").concat(this.usdcBalance));
                        this.initiatePriceWatch();
                        return [2 /*return*/];
                }
            });
        });
    };
    ArbBot.prototype.refreshBalances = function () {
        return __awaiter(this, void 0, void 0, function () {
            var results, solBalanceResult, usdcBalanceResult, error_2;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Promise.allSettled([
                                this.solanaConnection.getBalance(this.wallet.publicKey),
                                this.solanaConnection.getTokenAccountBalance(this.usdcTokenAccount)
                            ])];
                    case 1:
                        results = _b.sent();
                        solBalanceResult = results[0];
                        usdcBalanceResult = results[1];
                        if (solBalanceResult.status === 'fulfilled') {
                            this.solBalance = solBalanceResult.value;
                        }
                        else {
                            console.error('Error fetching SOL balance:', solBalanceResult.reason);
                        }
                        if (usdcBalanceResult.status === 'fulfilled') {
                            this.usdcBalance = (_a = usdcBalanceResult.value.value.uiAmount) !== null && _a !== void 0 ? _a : 0;
                        }
                        else {
                            this.usdcBalance = 0;
                        }
                        if (this.solBalance < web3_js_1.LAMPORTS_PER_SOL / 100) {
                            this.terminateSession("Low SOL balance.");
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        console.error('Unexpected error during balance refresh:', error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ArbBot.prototype.initiatePriceWatch = function () {
        var _this = this;
        this.priceWatchIntervalId = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
            var currentTime, quote, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentTime = Date.now();
                        if (!(currentTime - this.lastCheck >= this.checkInterval)) return [3 /*break*/, 4];
                        this.lastCheck = currentTime;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (this.waitingForConfirmation) {
                            console.log('Waiting for previous transaction to confirm...');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.getQuote(this.nextTrade)];
                    case 2:
                        quote = _a.sent();
                        this.evaluateQuoteAndSwap(quote);
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.error('Error getting quote:', error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); }, this.checkInterval);
    };
    ArbBot.prototype.getQuote = function (quoteRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var quote, error_4, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 6]);
                        return [4 /*yield*/, this.jupiterApi.quoteGet(quoteRequest)];
                    case 1:
                        quote = _c.sent();
                        if (!quote) {
                            throw new Error('No quote found');
                        }
                        return [2 /*return*/, quote];
                    case 2:
                        error_4 = _c.sent();
                        if (!(error_4 instanceof api_1.ResponseError)) return [3 /*break*/, 4];
                        _b = (_a = console).log;
                        return [4 /*yield*/, error_4.response.json()];
                    case 3:
                        _b.apply(_a, [_c.sent()]);
                        return [3 /*break*/, 5];
                    case 4:
                        console.error(error_4);
                        _c.label = 5;
                    case 5: throw new Error('Unable to find quote');
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ArbBot.prototype.evaluateQuoteAndSwap = function (quote) {
        return __awaiter(this, void 0, void 0, function () {
            var difference, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        difference = (parseInt(quote.outAmount) - this.nextTrade.nextTradeThreshold) / this.nextTrade.nextTradeThreshold;
                        console.log("\uD83D\uDCC8 Current price of ".concat(this.inputMint, ": ").concat(quote.outAmount, " is ").concat(difference > 0 ? 'higher' : 'lower', " than the next trade threshold: ").concat(this.nextTrade.nextTradeThreshold, " by ").concat(Math.abs(difference * 100).toFixed(2), "%."));
                        if (!(parseInt(quote.outAmount) > this.nextTrade.nextTradeThreshold)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.waitingForConfirmation = true;
                        return [4 /*yield*/, this.executeSwap(quote)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        console.error('Error executing swap:', error_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ArbBot.prototype.confirmTransaction = function (connection_1, signature_1) {
        return __awaiter(this, arguments, void 0, function (connection, signature, desiredConfirmationStatus, timeout, pollInterval, searchTransactionHistory) {
            var start, statuses, status_1;
            if (desiredConfirmationStatus === void 0) { desiredConfirmationStatus = 'confirmed'; }
            if (timeout === void 0) { timeout = 30000; }
            if (pollInterval === void 0) { pollInterval = 1000; }
            if (searchTransactionHistory === void 0) { searchTransactionHistory = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        start = Date.now();
                        _a.label = 1;
                    case 1:
                        if (!(Date.now() - start < timeout)) return [3 /*break*/, 6];
                        return [4 /*yield*/, connection.getSignatureStatuses([signature], { searchTransactionHistory: searchTransactionHistory })];
                    case 2:
                        statuses = (_a.sent()).value;
                        if (!statuses || statuses.length === 0) {
                            throw new Error('Failed to get signature status');
                        }
                        status_1 = statuses[0];
                        if (!(status_1 === null)) return [3 /*break*/, 4];
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, pollInterval); })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 4:
                        if (status_1.err) {
                            throw new Error("Transaction failed: ".concat(JSON.stringify(status_1.err)));
                        }
                        if (status_1.confirmationStatus && status_1.confirmationStatus === desiredConfirmationStatus) {
                            return [2 /*return*/, status_1];
                        }
                        if (status_1.confirmationStatus === 'finalized') {
                            return [2 /*return*/, status_1];
                        }
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, pollInterval); })];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 6: throw new Error("Transaction confirmation timeout after ".concat(timeout, "ms"));
                }
            });
        });
    };
    ;
    ArbBot.prototype.executeSwap = function (route) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, computeBudgetInstructions, setupInstructions, swapInstruction, cleanupInstruction, addressLookupTableAddresses, instructions, addressLookupTableAccounts, _b, blockhash, lastValidBlockHeight, messageV0, transaction, rawTransaction, txid, confirmation, error_6, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 7, 11, 12]);
                        return [4 /*yield*/, this.jupiterApi.swapInstructionsPost({
                                swapRequest: {
                                    quoteResponse: route,
                                    userPublicKey: this.wallet.publicKey.toBase58(),
                                    prioritizationFeeLamports: 'auto'
                                },
                            })];
                    case 1:
                        _a = _e.sent(), computeBudgetInstructions = _a.computeBudgetInstructions, setupInstructions = _a.setupInstructions, swapInstruction = _a.swapInstruction, cleanupInstruction = _a.cleanupInstruction, addressLookupTableAddresses = _a.addressLookupTableAddresses;
                        instructions = __spreadArray(__spreadArray(__spreadArray([], computeBudgetInstructions.map(this.instructionDataToTransactionInstruction), true), setupInstructions.map(this.instructionDataToTransactionInstruction), true), [
                            this.instructionDataToTransactionInstruction(swapInstruction),
                            this.instructionDataToTransactionInstruction(cleanupInstruction),
                        ], false).filter(function (ix) { return ix !== null; });
                        return [4 /*yield*/, this.getAdressLookupTableAccounts(addressLookupTableAddresses, this.solanaConnection)];
                    case 2:
                        addressLookupTableAccounts = _e.sent();
                        return [4 /*yield*/, this.solanaConnection.getLatestBlockhash()];
                    case 3:
                        _b = _e.sent(), blockhash = _b.blockhash, lastValidBlockHeight = _b.lastValidBlockHeight;
                        messageV0 = new web3_js_1.TransactionMessage({
                            payerKey: this.wallet.publicKey,
                            recentBlockhash: blockhash,
                            instructions: instructions,
                        }).compileToV0Message(addressLookupTableAccounts);
                        transaction = new web3_js_1.VersionedTransaction(messageV0);
                        transaction.sign([this.wallet]);
                        rawTransaction = transaction.serialize();
                        return [4 /*yield*/, this.solanaConnection.sendRawTransaction(rawTransaction, {
                                skipPreflight: true,
                                maxRetries: 2
                            })];
                    case 4:
                        txid = _e.sent();
                        return [4 /*yield*/, this.confirmTransaction(this.solanaConnection, txid)];
                    case 5:
                        confirmation = _e.sent();
                        if (confirmation.err) {
                            throw new Error('Transaction failed');
                        }
                        return [4 /*yield*/, this.postTransactionProcessing(route, txid)];
                    case 6:
                        _e.sent();
                        return [3 /*break*/, 12];
                    case 7:
                        error_6 = _e.sent();
                        if (!(error_6 instanceof api_1.ResponseError)) return [3 /*break*/, 9];
                        _d = (_c = console).log;
                        return [4 /*yield*/, error_6.response.json()];
                    case 8:
                        _d.apply(_c, [_e.sent()]);
                        return [3 /*break*/, 10];
                    case 9:
                        console.error(error_6);
                        _e.label = 10;
                    case 10: throw new Error('Unable to execute swap');
                    case 11:
                        this.waitingForConfirmation = false;
                        return [7 /*endfinally*/];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    ArbBot.prototype.updateNextTrade = function (lastTrade) {
        return __awaiter(this, void 0, void 0, function () {
            var priceChange;
            return __generator(this, function (_a) {
                priceChange = this.targetGainPercentage / 100;
                this.nextTrade = {
                    inputMint: this.nextTrade.outputMint,
                    outputMint: this.nextTrade.inputMint,
                    amount: parseInt(lastTrade.outAmount),
                    nextTradeThreshold: parseInt(lastTrade.inAmount) * (1 + priceChange),
                };
                return [2 /*return*/];
            });
        });
    };
    ArbBot.prototype.logSwap = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var inputToken, inAmount, outputToken, outAmount, txId, timestamp, logEntry, filePath, data, trades;
            return __generator(this, function (_a) {
                inputToken = args.inputToken, inAmount = args.inAmount, outputToken = args.outputToken, outAmount = args.outAmount, txId = args.txId, timestamp = args.timestamp;
                logEntry = {
                    inputToken: inputToken,
                    inAmount: inAmount,
                    outputToken: outputToken,
                    outAmount: outAmount,
                    txId: txId,
                    timestamp: timestamp,
                };
                filePath = path.join(__dirname, 'trades.json');
                try {
                    if (!fs.existsSync(filePath)) {
                        fs.writeFileSync(filePath, JSON.stringify([logEntry], null, 2), 'utf-8');
                    }
                    else {
                        data = fs.readFileSync(filePath, { encoding: 'utf-8' });
                        trades = JSON.parse(data);
                        trades.push(logEntry);
                        fs.writeFileSync(filePath, JSON.stringify(trades, null, 2), 'utf-8');
                    }
                    console.log("\u2705 Logged swap: ".concat(inAmount, " ").concat(inputToken, " -> ").concat(outAmount, " ").concat(outputToken, ",\n  TX: ").concat(txId, "}"));
                }
                catch (error) {
                    console.error('Error logging swap:', error);
                }
                return [2 /*return*/];
            });
        });
    };
    ArbBot.prototype.terminateSession = function (reason) {
        console.warn("\u274C Terminating bot...".concat(reason));
        console.log("Current balances:\nSOL: ".concat(this.solBalance / web3_js_1.LAMPORTS_PER_SOL, ",\nUSDC: ").concat(this.usdcBalance));
        if (this.priceWatchIntervalId) {
            clearInterval(this.priceWatchIntervalId);
            this.priceWatchIntervalId = undefined; // Clear the reference to the interval
        }
        setTimeout(function () {
            console.log('Bot has been terminated.');
            process.exit(1);
        }, 1000);
    };
    ArbBot.prototype.instructionDataToTransactionInstruction = function (instruction) {
        if (instruction === null || instruction === undefined)
            return null;
        return new web3_js_1.TransactionInstruction({
            programId: new web3_js_1.PublicKey(instruction.programId),
            keys: instruction.accounts.map(function (key) { return ({
                pubkey: new web3_js_1.PublicKey(key.pubkey),
                isSigner: key.isSigner,
                isWritable: key.isWritable,
            }); }),
            data: Buffer.from(instruction.data, "base64"),
        });
    };
    ;
    ArbBot.prototype.getAdressLookupTableAccounts = function (keys, connection) {
        return __awaiter(this, void 0, void 0, function () {
            var addressLookupTableAccountInfos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection.getMultipleAccountsInfo(keys.map(function (key) { return new web3_js_1.PublicKey(key); }))];
                    case 1:
                        addressLookupTableAccountInfos = _a.sent();
                        return [2 /*return*/, addressLookupTableAccountInfos.reduce(function (acc, accountInfo, index) {
                                var addressLookupTableAddress = keys[index];
                                if (accountInfo) {
                                    var addressLookupTableAccount = new web3_js_1.AddressLookupTableAccount({
                                        key: new web3_js_1.PublicKey(addressLookupTableAddress),
                                        state: web3_js_1.AddressLookupTableAccount.deserialize(accountInfo.data),
                                    });
                                    acc.push(addressLookupTableAccount);
                                }
                                return acc;
                            }, new Array())];
                }
            });
        });
    };
    ;
    ArbBot.prototype.postTransactionProcessing = function (quote, txid) {
        return __awaiter(this, void 0, void 0, function () {
            var inputMint, inAmount, outputMint, outAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        inputMint = quote.inputMint, inAmount = quote.inAmount, outputMint = quote.outputMint, outAmount = quote.outAmount;
                        return [4 /*yield*/, this.updateNextTrade(quote)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.refreshBalances()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.logSwap({ inputToken: inputMint, inAmount: inAmount, outputToken: outputMint, outAmount: outAmount, txId: txid, timestamp: new Date().toISOString() })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ArbBot;
}());
exports.ArbBot = ArbBot;
