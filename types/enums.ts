export enum Change {
  New = 'new',
  NoChange = 'no-change',
  Increase = 'increase',
  Decrease = 'decrease'
}

export enum WalletConnectStatus {
  connecting = 'Connecting',
  disconnected = 'Disconnected',
  idle = 'Idle',
  connected = 'Connected'
}

export enum Icon {
  Arrow = 'arrow',
  Copy = 'copy',
  Globe = 'globe',
  Discord = 'discord',
  Dropdown = 'dropdown',
  Info = 'info',
  Locked = 'locked',
  Metamask = 'metamask',
  Ledger = 'ledger',
  Reddit = 'reddit',
  Search = 'search',
  Trash = 'trash',
  Star = 'star',
  Sync = 'sync',
  Telegram = 'telegram',
  Trending = 'trending',
  Twitter = 'twitter',
  Unlocked = 'unlocked',
  Wallet = 'wallet',
  CloseCircle = 'close-circle',
  ExternalLink = 'external-link',
  Sort = 'sort'
}

export enum Modal {
  Terms = 'terms',
  Bridge = 'bridge',
  Connect = 'connect',
  DevMode = 'dev-mode',
  SgtBanner = 'sgt-banner',
  MarketNew = 'market-new',
  BidConfirm = 'bid-confirm',
  MarketBeta = 'market-beta',
  ConvertUsdc = 'convert-usdc',
  SwapSuccess = 'swap-success',
  AssetDetails = 'asset-details',
  OrderConfirm = 'order-confirm',
  USDCDetected = 'usdc-detected',
  UserFeedback = 'user-feedback',
  GasFeeRebate = 'gas-fee-rebate',
  BridgeConfirm = 'bridge-confirm',
  SharePosition = 'share-position',
  MarketExpired = 'market-expired',
  TokenSelector = 'token-selector',
  PriceDeviation = 'price-deviation',
  SgtBalancedFees = 'sgtBalancedFees',
  BridgeCompleted = 'bridge-completed',
  NinjaPassWinner = 'ninja-pass-winner',
  TokenSelectorTo = 'token-selector-to',
  MarketDeprecated = 'market-deprecated',
  CreateSubaccount = 'create-subaccount',
  InstitutionalForm = 'institutionalForm',
  TokenSelectorFrom = 'token-selector-from',
  SubaccountTransfer = 'subaccount-transfer',
  CheckSpotGridAuth = 'check-spot-grid-auth',
  MobileTradeDetails = 'mobile-trade-details',
  DelegateToValidator = 'delegate-to-validator',
  MarketRewardFactors = 'market-reward-factors',
  AddMarginToPosition = 'add-margin-to-position',
  CreateSpotGridStrategy = 'create-spot-grid-strategy',

  FuturesMarketRestricted = 'futures-market-restricted'
}

export enum Breakpoint {
  Lg = 'lg',
  Md = 'md',
  Sm = 'sm',
  Xs = 'xs',
  Xxs = 'xxs'
}

export enum AppState {
  Busy = 'Busy',
  Loading = 'Loading',
  Idle = 'Idle',
  Error = 'Error',
  Success = 'Success'
}

export enum TransferSide {
  Bank = 'Bank',
  TradingAccount = 'TradingAccount'
}

export enum BridgeType {
  Deposit = 'Deposit',
  Withdraw = 'Withdraw',
  Transfer = 'Transfer'
}

export enum TradeTypes {
  Limit = 'limit',
  Market = 'market'
}

export enum TradeSelectorType {
  Type = 'type',
  TypeAllDerivatives = 'type-all-derivatives',
  TypeAllSpot = 'type-all-spot',
  Side = 'side',
  PositionSide = 'position-side',
  TransferType = 'transfer-type'
}

export enum MarketFilterType {
  All = 'all',
  Volume = 'volume',
  New = 'new',
  Upcoming = 'upcoming'
}

export enum MarketCategoryType {
  All = 'all',
  Cosmos = 'cosmos',
  Ethereum = 'ethereum',
  Experimental = 'experimental'
}

export enum MarketQuoteType {
  All = 'all',
  USDT = 'usdt',
  USDC = 'usdc',
  INJ = 'inj'
  // UST = 'ust'
}

export enum StreamType {
  SpotTrades = 'spot-trades',
  SpotOrders = 'spot-orders',
  OraclePrices = 'oracle-prices',
  DerivativesTrades = 'derivatives-trades',
  DerivativesOrders = 'derivatives-orders',
  BankBalance = 'bank-balance',
  SubaccountBalances = 'subaccount-balances',
  SpotOrderbookUpdate = 'spot-orderbook-update',
  DerivativesPositions = 'derivatives-positions',
  SpotSubaccountOrders = 'spot-subaccount-orders',
  SpotSubaccountTrades = 'spot-subaccount-trades',
  DerivativesOrderbookUpdate = 'derivatives-orderbook-update',
  SpotSubaccountOrderHistory = 'spot-subaccount-order-history',
  DerivativesSubaccountOrders = 'derivatives-subaccount-orders',
  DerivativesSubaccountTrades = 'derivatives-subaccount-trades',
  DerivativesSubaccountPositions = 'derivatives-positions-trades',
  DerivativesSubaccountOrderHistory = 'derivatives-subaccount-order-history'
}

export enum AveragePriceOptions {
  None = 0,
  BaseAmount = 1,
  QuoteAmount = 2,
  Percentage = 3
}

export enum AmplitudeEvent {
  Swap = 'Swap',
  Login = 'Login',
  Transfer = 'Transfer',
  SwapClicked = 'Swap Clicked',
  ConvertUSDCAttempt = 'Convert USDC Attempt',
  ConvertUSDCClicked = 'Convert USDC Clicked',
  SwapAttempt = 'Swap Attempt',
  TradeClicked = 'Trade Clicked',
  ConnectClicked = 'Connect Clicked',
  WalletSelected = 'Wallet Selected',
  SurveyAccepted = 'Survey - Accepted',
  SurveyRejected = 'Survey - Rejected',
  PlaceOrderAttempt = 'Place Order Attempt',
  PlaceOrderConfirm = 'Place Order Confirm',
  CreateStrategy = 'Create Strategy',
  RemoveStrategy = 'Remove Strategy'
}

export enum SurveyTitle {
  HelixUserSurveyFeb23 = 'helix-user-survey-feb-23'
}

export enum DefaultMarket {
  Perpetual = 'btc-usdt-perp',
  Spot = 'inj-usdt'
}

export enum TradeClickOrigin {
  Lander = 'LanderC2A',
  MarketsPage = 'Markets Page',
  TopMenu = 'Top Menu'
}

export enum OrderAttemptStatus {
  Success = 'Success',
  Error = 'Error'
}

export enum OrderbookLayout {
  Default = 'default',
  Buys = 'buys',
  Sells = 'sells'
}

export enum TradingLayout {
  Left = 'left',
  Right = 'right'
}

export enum BalanceHeaderType {
  None = 'none',
  Asset = 'asset',
  Total = 'total',
  Available = 'available',
  Value = 'value'
}

export enum BusEvents {
  AddMarginToPosition = 'add-margin-to-position',
  AssetDetailsModalPayload = 'asset-details-modal-payload',
  ConvertUsdc = 'convert-usdc',
  FundingRefresh = 'funding-refresh',
  NavLinkClicked = 'nav-link-clicked',
  OrderbookNotionalClick = 'orderbook-notional-click',
  OrderbookPriceClick = 'orderbook-price-click',
  OrderbookSizeClick = 'orderbook-size-click',
  PostOnlyToggled = 'post-only-toggled',
  ShowLedgerConnect = 'show-ledger-connect',
  TradeConfirmationModalPayload = 'trade-confirmation-modal-payload',
  WalletConnected = 'wallet-connected',
  ActivityFilterUpdate = 'activity-filter-update'
}

export enum ActivityField {
  Symbol = 'Symbol',
  Denom = 'Denom',
  Limit = 'Limit',
  Page = 'Page',
  Side = 'Side',
  Type = 'Type'
}

export enum BridgeField {
  Amount = 'Amount',
  BridgeType = 'BridgeType',
  BridgingNetwork = 'BridgingNetwork',
  Denom = 'Denom',
  Destination = 'Destination',
  Memo = 'Memo',
  Token = 'Token'
}

export enum SubaccountTransferField {
  Amount = 'Amount',
  SrcSubaccountId = 'SrcSubaccountId',
  DstSubaccountId = 'DstSubaccountId',
  Denom = 'Denom',
  Token = 'Token'
}

export enum TradeField {
  BaseAmount = 'Base amount',
  BaseDenom = 'Base denom',
  Leverage = 'Leverage',
  LimitPrice = 'Limit price',
  OrderSide = 'Order side',
  PostOnly = 'Post-Only',
  ProportionalPercentage = 'Proportional percentage',
  QuoteAmount = 'Quote amount',
  QuoteDenom = 'Quote denom',
  ReduceOnly = 'Reduce-Only',
  SlippageTolerance = 'Slippage tolerance',
  TradingType = 'Trading type',
  TriggerPrice = 'Trigger price'
}

export type BaseQuoteFields = Exclude<
  TradeField,
  | TradeField.LimitPrice
  | TradeField.TriggerPrice
  | TradeField.BaseDenom
  | TradeField.QuoteDenom
  | TradeField.ProportionalPercentage
>

export enum TradeExecutionType {
  Market = 'market',
  LimitFill = 'limitFill',
  LimitMatchRestingOrder = 'limitMatchRestingOrder',
  LimitMatchNewOrder = 'limitMatchNewOrder',
  StopLimit = 'stopLimit',
  StopMarket = 'stopMarket'
}

export enum WalletModalType {
  All = 'all',
  Ledger = 'ledger',
  Trezor = 'trezor'
}

export enum ActivityView {
  Positions = 'Positions/Index',
  FundingPayments = 'Positions/FundingPayments',
  SpotOrders = 'Spot/Index',
  SpotOrderHistory = 'Spot/OrderHistory',
  SpotTradeHistory = 'Spot/TradeHistory',
  DerivativeOrders = 'Derivatives/Index',
  DerivativeTriggers = 'Derivatives/Triggers',
  DerivativeOrderHistory = 'Derivatives/OrderHistory',
  DerivativeTradeHistory = 'Derivatives/TradeHistory',
  WalletTransfers = 'WalletHistory/Transfers',
  WalletDeposits = 'WalletHistory/Deposits',
  WalletWithdrawals = 'WalletHistory/Withdrawals'
}

export enum AggregatedBalanceType {
  Inj = 'inj',
  Aggregated = 'aggregated'
}

export enum NoticeBanner {
  sheduledUpgradeMarch = 'sheduled-upgrade-march'
}

export enum SubaccountBalanceStreamType {
  AvailableBalance = 'available_balances',
  TotalBalance = 'total_balances'
}

export enum PaginationState {
  InvalidQuery = 'invalid-query',
  QueryPageExist = 'query-page-exist',
  QueryMoreThanTotalPage = 'query-more-than-total-page'
}

export enum ActivityPage {
  OpenPositions = 'activity-positions',
  FundingPayments = 'activity-positions-funding-payments',
  DerivativeOpenOrders = 'activity-derivatives',
  DerivativeTriggers = 'activity-derivatives-triggers',
  DerivativeOrderHistory = 'activity-derivatives-order-history',
  DerivativeTradeHistory = 'activity-derivatives-trade-history',
  SpotOpenOrders = 'activity-spot',
  SpotOrderHistory = 'activity-spot-order-history',
  SpotTradeHistory = 'activity-spot-trade-history',
  SwapHistory = 'activity-spot-swap-history',
  WalletHistoryTransfers = 'activity-wallet-history',
  WalletHistoryDeposits = 'activity-wallet-history-deposits',
  WalletHistoryWithdrawals = 'activity-wallet-history-withdrawals'
}

export enum ActivityTab {
  Spot = 'activity-spot',
  Positions = 'activity-positions',
  Derivatives = 'activity-derivatives',
  WalletHistory = 'activity-wallet-history'
}

export enum AuctionTradingField {
  BidPrice = 'bidPrice',
  BaseAmount = 'baseAmount',
  QuoteAmount = 'quoteAmount'
}

export enum InstitutionalFormField {
  FirstName = 'firstName',
  LastName = 'lastName',
  Email = 'email',
  Company = 'company',
  Telegram = 'telegram'
}

export enum SpotGridTradingField {
  Grids = 'grids',
  LowerPrice = 'lowerPrice',
  UpperPrice = 'upperPrice',
  InvestmentAmount = 'investmentAmount',
  BaseInvestmentAmount = 'baseInvestmentAmount',
  InvestmentType = 'InvestmentType'
}

export enum SpotGridMessages {
  MsgCreateSpotLimitOrder = '/injective.exchange.v1beta1.MsgCreateSpotLimitOrder',
  MsgCreateSpotMarketOrder = '/injective.exchange.v1beta1.MsgCreateSpotMarketOrder',
  MsgWithdraw = '/injective.exchange.v1beta1.MsgWithdraw',
  MsgBatchUpdateOrders = '/injective.exchange.v1beta1.MsgBatchUpdateOrders'
}

export enum GridStrategyTabs {
  Running = 'running',
  History = 'history'
}

export enum InvestmentTypeGst {
  Quote = 'quote',
  BaseAndQuote = 'baseAndQuote'
}
