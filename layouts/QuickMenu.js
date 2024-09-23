
import { Fragment } from 'react';
import { useMediaQuery } from 'react-responsive';
import 'simplebar/dist/simplebar.min.css';

import useMounted from 'hooks/useMounted';
import DesktopMenu from 'sub-components/QuickMenu/DesktopMenu';
import MobileMenu from 'sub-components/QuickMenu/MobileMenu';

const QuickMenu = () => {
    const hasMounted = useMounted();
    const isDesktop = useMediaQuery({
        query: '(min-width: 1224px)'
    })


    const QuickMenuDesktop = () => {
        return <DesktopMenu />
    }


    const QuickMenuMobile = () => {
        return (
            <MobileMenu />
        )
    }

    return (
        <Fragment>
            {hasMounted && isDesktop ? <QuickMenuDesktop /> : <QuickMenuMobile />}
        </Fragment>
    )
}

export default QuickMenu;