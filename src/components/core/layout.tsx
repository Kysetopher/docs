import { Link, Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
        <Outlet />
    </div>
  )
}
