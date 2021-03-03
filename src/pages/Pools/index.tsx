import React, { useCallback } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { Box, Flex } from 'rebass'
import { useTranslation } from 'react-i18next'

import { ButtonOutlined } from 'components/Button'
import PoolsCurrencyInputPanel from 'components/PoolsCurrencyInputPanel'
import Panel from 'components/Panel'
import PoolList from 'components/PoolList'
import { useCurrency } from 'hooks/Tokens'
import { useDerivedPairInfo, usePairActionHandlers, usePairState } from 'state/pair/hooks'
import { Field } from 'state/pair/actions'
import { Currency } from 'libs/sdk/src'

const PageWrapper = styled.div`
  padding: 0 10em;
  width: 100%;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 0 4em;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0;
  `};
`

const ToolbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`

const CurrencyWrapper = styled(Flex)`
  width: 100%;
  align-items: center;
`

const SelectPairInstructionWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 24px;
`

const Pools = ({ match: {} }: RouteComponentProps<{ currencyIdA?: string; currencyIdB?: string }>) => {
  const { t } = useTranslation()

  // Pool selection
  const { onCurrencySelection } = usePairActionHandlers()
  const {
    [Field.CURRENCY_A]: { currencyId: currencyIdA },
    [Field.CURRENCY_B]: { currencyId: currencyIdB }
  } = usePairState()

  const currencyA = useCurrency(currencyIdA)
  const currencyB = useCurrency(currencyIdB)
  const { currencies, pairs } = useDerivedPairInfo(currencyA ?? undefined, currencyB ?? undefined)

  const handleCurrencyASelect = useCallback(
    (currencyA: Currency) => {
      onCurrencySelection(Field.CURRENCY_A, currencyA)
    },
    [onCurrencySelection]
  )
  const handleCurrencyBSelect = useCallback(
    (currencyB: Currency) => {
      onCurrencySelection(Field.CURRENCY_B, currencyB)
    },
    [onCurrencySelection]
  )

  const poolList = pairs.map(([pairState, pair]) => pair)

  return (
    <>
      <PageWrapper>
        <div style={{ marginBottom: '16px' }}>{t('selectPair')}</div>
        <ToolbarWrapper>
          <CurrencyWrapper>
            <PoolsCurrencyInputPanel
              onCurrencySelect={handleCurrencyASelect}
              currency={currencies[Field.CURRENCY_A]}
              id="input-tokena"
            />
            <span style={{ margin: '0 8px' }}>/</span>
            <PoolsCurrencyInputPanel
              onCurrencySelect={handleCurrencyBSelect}
              currency={currencies[Field.CURRENCY_B]}
              id="input-tokenb"
            />
          </CurrencyWrapper>
          <div style={{ width: '100%' }}>
            <ButtonOutlined
              width="148px"
              padding="12px 18px"
              as={Link}
              to={`/create/${currencyIdA == '' ? undefined : currencyIdA}/${
                currencyIdB == '' ? undefined : currencyIdB
              }`}
              style={{ float: 'right' }}
            >
              {t('createNewPool')}
            </ButtonOutlined>
          </div>
        </ToolbarWrapper>

        <Panel>
          {poolList.length > 0 ? (
            <PoolList pairs={poolList} maxItems={50} />
          ) : (
            <SelectPairInstructionWrapper>{t('thereAreNoPools')}</SelectPairInstructionWrapper>
          )}
        </Panel>
      </PageWrapper>
    </>
  )
}

export default Pools