import { getAccessorType } from 'typed-vuex'
import * as account from '~/store/account'
import * as app from '~/store/app'
import * as auction from '~/store/auction'
import * as bank from '~/store/bank'
import * as derivatives from '~/store/derivatives'
import * as dmm from '~/store/dmm'
import * as exchange from '~/store/exchange'
import * as activities from '~/store/activities'
import * as gasRebate from '~/store/gasRebate'
import * as onboard from '~/store/onboard'
import * as modal from '~/store/modal'
import * as spot from '~/store/spot'
import * as token from '~/store/token'
import * as wallet from '~/store/wallet'

export const accessorType = getAccessorType({
  modules: {
    app,
    auction,
    account,
    bank,
    derivatives,
    dmm,
    onboard,
    exchange,
    gasRebate,
    modal,
    activities,
    spot,
    token,
    wallet
  }
})
