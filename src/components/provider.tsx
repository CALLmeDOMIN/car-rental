import { cookies } from 'next/headers'
import { ThemeSwitch } from './themeSwitch'

export const Provider = () => {
    const theme = cookies().get('theme')?.value

    return <ThemeSwitch theme={theme} />
}
