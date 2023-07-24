import * as React from 'react'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Checked = DropdownMenuCheckboxItemProps['checked']

export function DropdownCheckboxes(
  items: { label: string; checked: Checked; onCheckedChange: (checked: Checked) => void }[]
) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="mr-4">
          Genres
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* ! TECHDEBT */}

        {
          // @ts-ignore
          items.items.map((item) => (
            <DropdownMenuCheckboxItem key={item.label} checked={item.checked} onCheckedChange={item.onCheckedChange}>
              {item.label}
            </DropdownMenuCheckboxItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
