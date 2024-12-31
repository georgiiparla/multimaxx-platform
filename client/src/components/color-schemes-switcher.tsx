'use client'

import { useMantineColorScheme, Button, Group } from '@mantine/core'
import { MoonIcon } from '@radix-ui/react-icons'
import { IconMoon } from '@tabler/icons-react'

export function ColorSchemesSwitcher() {
  const { toggleColorScheme } = useMantineColorScheme()

  return (
    <Group>
      <IconMoon
        size={25}
        className='cursor-pointer'
        onClick={toggleColorScheme}
      />
    </Group>
  )
}
