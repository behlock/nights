import * as React from 'react'
import type { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Checked = DropdownMenuCheckboxItemProps['checked']

export interface DropdownCheckboxesItem {
  label: string
  checked: Checked
  onCheckedChange: (checked: Checked) => void
}

interface DropdownCheckboxesProps {
  triggerLabel: string
  items: DropdownCheckboxesItem[]
}

export function DropdownCheckboxes({ triggerLabel, items }: DropdownCheckboxesProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="mr-4">
          {triggerLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {items.map((item, index) => (
          <React.Fragment key={item.label}>
            <DropdownMenuCheckboxItem checked={item.checked} onCheckedChange={item.onCheckedChange}>
              {item.label}
            </DropdownMenuCheckboxItem>
            {index === 1 && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
