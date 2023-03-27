import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { HeaderAction } from '@/components/common'
import { useGetCart } from '@/hooks'
import { cartGetters } from '@/lib/getters'
import type { IconProps } from '@/lib/types'

const CartIcon = ({ size, isElementVisible }: IconProps) => {
  const { t } = useTranslation('common')

  const { data: cart } = useGetCart()
  const itemCount = cartGetters.getCartItemCount(cart)

  const router = useRouter()

  const gotoCart = () => {
    router.push('/cart')
  }

  return (
    <HeaderAction
      subtitle={t('cart')}
      icon={ShoppingCartIcon}
      badgeContent={itemCount}
      iconFontSize={size}
      onClick={gotoCart}
      isElementVisible={isElementVisible}
    />
  )
}

export default CartIcon
