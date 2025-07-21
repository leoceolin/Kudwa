import { ChartSpline, Sheet } from 'lucide-react'
import Link from 'next/link'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'

const SIDEBAR_ITEMS = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: ChartSpline
  },
  {
    title: 'Reports',
    url: '/reports',
    icon: Sheet
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_ITEMS.map((sidebarItem) => (
                <SidebarMenuItem key={sidebarItem.title}>
                  <SidebarMenuButton asChild>
                    <Link href={sidebarItem.url}>
                      <sidebarItem.icon className="text-[var(--gray)]" />
                      <span className="text-[var(--gray)]">
                        {sidebarItem.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
